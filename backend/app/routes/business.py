from fastapi import APIRouter, Depends

from app.database import get_db
from app.models.schemas import BusinessPlanRequest
from app.services.business_builder import generate_business_plan

router = APIRouter()


@router.post("/generate")
def generate(payload: BusinessPlanRequest, db=Depends(get_db)):
    plan = generate_business_plan(payload)
    db["business_plans"].insert_one({"user": payload.name, "plan": plan.model_dump()})
    return plan


