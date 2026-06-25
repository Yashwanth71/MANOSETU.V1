import os
import hashlib
from fastapi import APIRouter, HTTPException, status
from src.database import supabase_client
from src.models import (
    AnonymousAuthRequest, 
    ScreeningSubmitRequest, 
    ChatRequest, 
    CommunityPostRequest,
    BookingRequest
)
from src.manas_ai import safety_interceptor, generate_manas_response

router = APIRouter()
SALT = os.getenv("MANOSETU_SECRET_SALT", "fallback-local-dev-salt-string")

# -------------------------------------------------------------------
# SECURITY & UTILITIES
# -------------------------------------------------------------------

def generate_secure_hash(raw_id: str) -> str:
    """Transforms hardware tokens into non-reversible salted hashes."""
    salted_input = f"{raw_id}{SALT}"
    return hashlib.sha256(salted_input.encode()).hexdigest()

# -------------------------------------------------------------------
# DOMAIN: AUTHENTICATION
# -------------------------------------------------------------------

@router.post("/auth/anonymous", status_code=status.HTTP_201_CREATED)
async def process_anonymous_onboarding(payload: AnonymousAuthRequest):
    secure_device_hash = generate_secure_hash(payload.device_id_raw)
    try:
        existing_user = supabase_client.table("users")\
            .select("id")\
            .eq("hashed_device_id", secure_device_hash)\
            .execute()
        
        if existing_user.data:
            return {"status": "success", "user_id": existing_user.data[0]["id"]}
        
        # Create new user
        new_user = supabase_client.table("users")\
            .insert({"hashed_device_id": secure_device_hash, "org_code": payload.org_code})\
            .execute()
        return {"status": "success", "user_id": new_user.data[0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------------------------------------------------
# DOMAIN: SCREENING
# -------------------------------------------------------------------

@router.post("/screen/submit", status_code=status.HTTP_201_CREATED)
async def submit_screening(payload: ScreeningSubmitRequest):
    try:
        response = supabase_client.table("phq_sessions")\
            .insert(payload.dict())\
            .execute()
        return {"status": "success", "data": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------------------------------------------------
# DOMAIN: MANAS AI COMPANION
# -------------------------------------------------------------------

@router.post("/chat/message", status_code=status.HTTP_200_OK)
async def process_manas_chat(payload: ChatRequest):
    is_safe = safety_interceptor(payload.message)
    if not is_safe:
        return {
            "status": "escalation_required",
            "manas_response": "I hear how much pain you are in. You are not alone. Please reach out to the Vandrevala Foundation at 9999 666 555.",
            "alert_triggered": True
        }
    ai_reply = await generate_manas_response(payload.message)
    return {"status": "success", "manas_response": ai_reply, "alert_triggered": False}

# -------------------------------------------------------------------
# DOMAIN: COMMUNITY PEER-SUPPORT
# -------------------------------------------------------------------

VALID_MVP_ROOMS = ["academic_stress", "corporate_burnout", "general_anxiety"]

@router.get("/community/rooms", status_code=status.HTTP_200_OK)
async def get_community_rooms():
    return {"status": "success", "data": VALID_MVP_ROOMS}

@router.post("/community/rooms/{room_id}/posts", status_code=status.HTTP_201_CREATED)
async def create_community_post(room_id: str, payload: CommunityPostRequest):
    sanitized_room = room_id.strip().strip('"').strip("'")
    if sanitized_room not in VALID_MVP_ROOMS:
        raise HTTPException(status_code=400, detail="Invalid room category.")
    
    if not safety_interceptor(payload.content):
        raise HTTPException(status_code=403, detail="Post blocked by safety filters.")
        
    try:
        insert_data = {
            "user_id": payload.user_id,
            "anon_handle": payload.anon_handle,
            "room_id": sanitized_room,
            "content": payload.content,
            "relate_count": 0
        }
        response = supabase_client.table("community_posts").insert(insert_data).execute()
        return {"status": "success", "record": response.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# -------------------------------------------------------------------
# DOMAIN: THERAPY BOOKINGS & COUNSELOR MANAGEMENT
# -------------------------------------------------------------------

@router.get("/therapy/therapists", status_code=status.HTTP_200_OK)
async def list_therapists():
    """
    Fetches the registry of available counselors.
    NOTE: Ensure your 'therapists' table is populated in Supabase.
    """
    try:
        # Assuming you will create the 'therapists' table next
        response = supabase_client.table("therapists").select("*").execute()
        return {"status": "success", "data": response.data}
    except Exception as e:
        # Fallback if table doesn't exist yet
        return {
            "status": "info", 
            "message": "Therapist registry empty or table missing.", 
            "data": []
        }

@router.post("/therapy/book", status_code=status.HTTP_201_CREATED)
async def book_session(payload: BookingRequest):
    """
    Creates a new therapy booking in 'therapy_bookings'.
    Aligned with DB constraints: mode IN ('video', 'voice', 'in-person') 
    and status IN ('pending', 'confirmed', 'completed', 'cancelled')
    """
    try:
        # 1. Map API fields to database schema
        # Enforcing 'pending' as the default status since 'scheduled' is not allowed
        insert_data = {
            "user_id": str(payload.user_id),
            "therapist_id": str(payload.therapist_id),
            "slot_dt": payload.slot_dt.isoformat(),
            "mode": payload.mode, # Frontend must send 'video', 'voice', or 'in-person'
            "status": "pending"   # Changed from 'scheduled' to 'pending' to match DB constraint
        }
        
        # 2. Insert into confirmed table: therapy_bookings
        response = supabase_client.table("therapy_bookings").insert(insert_data).execute()
        
        return {
            "status": "success",
            "message": "Session request submitted successfully.",
            "data": response.data[0]
        }
    except Exception as e:
        print(f"!!! DATABASE CONSTRAINT VIOLATION: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Constraint Violation: Check your 'mode' (must be video, voice, or in-person). Original Error: {str(e)}"
        )
    
# -------------------------------------------------------------------
# DOMAIN: PROFILE & DATA GOVERNANCE
# -------------------------------------------------------------------

@router.get("/profile/analytics/{user_id}")
async def get_user_analytics(user_id: str):
    """
    Retrieves clinical progress markers for the user's dashboard.
    """
    try:
        # Aggregating PHQ/GAD trends
        stats = supabase_client.table("phq_sessions")\
            .select("instrument_type, responses, created_at")\
            .eq("user_id", user_id)\
            .execute()
        return {"status": "success", "history": stats.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/profile/delete/{user_id}")
async def delete_user_account(user_id: str):
    """
    Hard delete of all user-associated data (Data Sovereignty).
    """
    try:
        # Cascading delete will handle related table rows if configured in Supabase
        supabase_client.table("users").delete().eq("id", user_id).execute()
        return {"status": "success", "message": "All user data erased."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/profile/data-summary/{user_id}", status_code=status.HTTP_200_OK)
async def get_user_data_summary(user_id: str):
    """
    Returns a unified summary of user's clinical sessions and bookings.
    This acts as the 'Data Dashboard' for the user's profile.
    """
    try:
        # Fetch data from all relevant tables using the same user_id
        sessions = supabase_client.table("phq_sessions").select("*").eq("user_id", user_id).execute()
        bookings = supabase_client.table("therapy_bookings").select("*").eq("user_id", user_id).execute()
        posts = supabase_client.table("community_posts").select("*").eq("user_id", user_id).execute()
        
        return {
            "status": "success",
            "summary": {
                "total_clinical_sessions": len(sessions.data),
                "total_bookings": len(bookings.data),
                "community_contributions": len(posts.data)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))