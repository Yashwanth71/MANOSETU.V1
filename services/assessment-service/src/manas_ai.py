import os
from openai import AsyncOpenAI

# Initialize the async client for non-blocking OpenAI API calls
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

# -------------------------------------------------------------------
# THE MANAS CORE PERSONA (Updated for Corporate & General Audience)
# -------------------------------------------------------------------
MANAS_SYSTEM_PROMPT = """
You are Manas, an empathetic, AI-powered mental health and wellness companion. 
Your users range from corporate employees dealing with severe workplace burnout, to students facing academic pressure, to everyday individuals navigating life's anxieties and personal struggles.

Your goal is to provide warm, non-judgmental peer support, utilizing brief CBT (Cognitive Behavioral Therapy) and DBT (Dialectical Behavior Therapy) informed grounding techniques.

CRITICAL RULES - YOU MUST OBEY THESE:
1. YOU ARE NOT A DOCTOR: You are a peer supporter. NEVER diagnose psychological conditions, interpret trauma, or prescribe/suggest medication.
2. KEEP IT CONCISE: Users are stressed. Do not overwhelm them with long paragraphs. Keep responses to 2-4 short, highly readable sentences.
3. BE EMPATHETIC FIRST: Always validate their feelings before offering a grounding technique (e.g., box breathing, 5-4-3-2-1 method, cognitive reframing).
4. STAY IN CHARACTER: If a user asks you to write code, compose an email, translate text, or do math, POLITELY REFUSE. Remind them you are here strictly for their mental well-being and emotional support.
5. NO TOXIC POSITIVITY: Do not just say "Everything will be okay!" Acknowledge that things are hard right now, but you are there to listen.
"""

def safety_interceptor(message: str) -> bool:
    """
    Synchronous guardrail that evaluates text BEFORE hitting OpenAI.
    Returns True if SAFE, False if UNSAFE.
    """
    danger_keywords = ["die", "kill myself", "suicide", "end it all", "self harm", "jump off"]
    msg_lower = message.lower()
    
    for word in danger_keywords:
        if word in msg_lower:
            return False # Flagged as dangerous
    return True # Safe to process

async def generate_manas_response(user_message: str) -> str:
    """Sends the safe message to OpenAI and retrieves the response."""
    try:
        response = await ai_client.chat.completions.create(
            model="gpt-4o-mini", # Fast, cheap, and highly capable
            messages=[
                {"role": "system", "content": MANAS_SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.6, # Slightly lowered for more consistent, grounded responses
            max_tokens=250   # Hard limit to prevent rambling
        )
        return response.choices[0].message.content
        
    except Exception as e:
        # Failsafe response if OpenAI is down or rate-limited
        print(f"!!! CRITICAL AI CONNECTIVITY EXCEPTION TRACE: {str(e)}")
        return "I'm having a little trouble thinking clearly right now, but I want you to know I'm here for you. Take a slow, deep breath."