from fastapi import FastAPI
from src.routes import router as assessment_router

# The root_path parameter configures FastAPI to look for openapi.json inside the proxy prefix
app = FastAPI(
    title="ManoSetu Assessment Domain", 
    version="1.0.0",
    root_path="/api/v1/assess"
)

@app.get("/")
def read_root():
    return {"message": "Assessment Service Module Active"}

@app.get("/check")
def registration_stub():
    return {"status": "healthy", "domain": "assessment"}

app.include_router(assessment_router)

@app.get("/health")
def integration_health_check():
    return {"status": "healthy", "domain": "assessment_monolith_logic"}