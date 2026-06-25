from pydantic import BaseModel, Field, validator
from typing import Dict
from datetime import datetime

class AnonymousAuthRequest(BaseModel):
    device_id_raw: str = Field(..., min_length=8, description="Raw hardware machine identifier token")
    org_code: str = Field(..., min_length=4, description="Unique institutional license identification code")

class ScreeningSubmitRequest(BaseModel):
    user_id: str = Field(..., description="The cryptographically secured anonymous user UUID")
    instrument_type: str = Field(..., description="Type of screening scale: 'PHQ2' or 'PHQ9'")
    responses: Dict[str, int] = Field(..., description="Key-value object matching question codes to scores (0-3)")

    @validator('responses')
    def validate_item_scores(cls, value):
        for q_id, score in value.items():
            if score < 0 or score > 3:
                raise ValueError(f"Invalid clinical response score for {q_id}. Values must be between 0 and 3.")
        return value

class ChatRequest(BaseModel):
    user_id: str = Field(..., description="The user's database UUID mapping proxy")
    message: str = Field(..., min_length=1, max_length=1000, description="User chat content input string")

class CommunityPostRequest(BaseModel):
    user_id: str = Field(..., description="The anonymous user exact account profile UUID")
    anon_handle: str = Field(..., min_length=2, max_length=100, description="Anonymous pseudonym user tag name")
    content: str = Field(..., min_length=5, max_length=2000, description="The community content message payload text")

class BookingRequest(BaseModel):
    user_id: str = Field(..., description="UUID of the user")
    therapist_id: str = Field(..., description="UUID of the therapist")
    slot_dt: datetime = Field(..., description="ISO 8601 timestamp of the slot")
    mode: str = Field(..., description="Session mode: 'audio' or 'video'")