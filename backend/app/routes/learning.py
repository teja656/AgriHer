from fastapi import APIRouter, Depends

from app.database import get_db
from app.models.schemas import LearningJourney

router = APIRouter()


@router.post("/")
def create_learning_plan(journey: LearningJourney, db=Depends(get_db)):
    db["learning_paths"].insert_one(journey.model_dump())
    return journey


@router.get("/{user_id}")
def get_learning_plan(user_id: str, db=Depends(get_db)):
    doc = db["learning_paths"].find_one({"user_id": user_id})
    if not doc:
        return {
            "user_id": user_id,
            "modules": [
                "Climate-smart agronomy basics",
                "Digital bookkeeping (FPO stack)",
                "Pitch prep for women-focused schemes",
            ],
            "progress": 0.1,
        }
    doc["_id"] = str(doc["_id"])
    return doc


