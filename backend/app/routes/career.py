from fastapi import APIRouter, Depends

from app.database import get_db
from app.models.schemas import CareerProfile
from app.services.recommender import recommender

router = APIRouter()


@router.post("/recommend")
def recommend_career(profile: CareerProfile, db=Depends(get_db)):
    rec = recommender.recommend(profile)
    db["career_logs"].insert_one(profile.model_dump())
    return rec


