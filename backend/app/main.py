import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from a .env file (e.g. TWILIO_*, MONGO_*)
load_dotenv()

from app.routes import business, career, learning, mentorship, ml, safety, schemes


app = FastAPI(title="AgriHer API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ml.router, prefix="/ml", tags=["ml"])
app.include_router(career.router, prefix="/career", tags=["career"])
app.include_router(mentorship.router, prefix="/mentors", tags=["mentors"])
app.include_router(schemes.router, prefix="/schemes", tags=["schemes"])
app.include_router(business.router, prefix="/business", tags=["business"])
app.include_router(learning.router, prefix="/learning", tags=["learning"])
app.include_router(safety.router, prefix="/safety", tags=["safety"])


@app.get("/health")
def health():
    return {"status": "ok"}


