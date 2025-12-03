from fastapi import APIRouter, Depends

from app.database import get_db
from app.models.schemas import SchemeFilter
from app.services.schemes import find_schemes, SCHEMES

router = APIRouter()


@router.post("/match")
def match_schemes(filters: SchemeFilter, db=Depends(get_db)):
    db["scheme_queries"].insert_one(filters.model_dump())
    results = find_schemes(
        db,
        filters.state,
        filters.interest_area,
        filters.women_only,
    )
    return {"count": len(results), "schemes": results}


@router.post("/seed")
def seed_schemes(db=Depends(get_db)):
    """
    One-time convenience endpoint to insert demo schemes into MongoDB.
    Can be called from Swagger or curl.
    """
    collection = db["schemes"]
    existing = collection.count_documents({})
    if existing:
        return {"message": "Schemes already seeded", "count": existing}

    result = collection.insert_many(SCHEMES)
    return {"message": "Seeded schemes", "count": len(result.inserted_ids)}


