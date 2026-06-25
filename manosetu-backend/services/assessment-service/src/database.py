import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ensure local configurations are loaded
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("CRITICAL ERROR: Supabase credentials are missing from the environment configuration.")

# Instantiating a single global reusable client pool instance
supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)