from fastapi import APIRouter, Depends

from app.database import get_db
from app.models.schemas import MentorRequest

router = APIRouter()


@router.get("/")
def list_mentors(db=Depends(get_db)):
    mentors = []
    for doc in db["mentors"].find({}).limit(25):
        doc["_id"] = str(doc["_id"])
        mentors.append(doc)
    return mentors


@router.post("/seed")
def seed_demo(db=Depends(get_db)):
    count = db["mentors"].count_documents({})
    if count:
        return {"message": "Mentors already seeded"}
    mentors = [
        {
            "name": "Dr. Kavya",
            "expertise": ["crop science", "value addition"],
            "state": "KA",
            "contact": "mentor1@agriher.demo",
        },
        {
            "name": "Soumya",
            "expertise": ["marketing", "D2C"],
            "state": "TN",
            "contact": "mentor2@agriher.demo",
        },
    ]
    db["mentors"].insert_many(mentors)
    return {"message": "Seeded mentors", "count": len(mentors)}


@router.post("/request")
def request_mentor(req: MentorRequest, db=Depends(get_db)):
    db["mentor_requests"].insert_one(req.model_dump())
    return {"status": "requested"}


