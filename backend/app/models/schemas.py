from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class CareerProfile(BaseModel):
    education_level: str = Field(..., examples=["BSc Agriculture"])
    experience_years: int = 0
    land_available: bool = False
    interest_area: str = Field("general", examples=["technology", "processing"])
    skills: List[str] = []
    location: Optional[str] = None
    capital: Optional[float] = None


class CareerRecommendation(BaseModel):
    career: str
    reason: str
    roadmap: List[str] = Field(default_factory=list)
    source: str = "rules"


class BusinessPlanRequest(BaseModel):
    name: str
    idea: str
    capital: Optional[float] = None
    location: Optional[str] = None
    sustainability_focus: bool = False
    timeline_weeks: int = 12


class BusinessPlan(BaseModel):
    title: str
    overview: str
    investment_estimate: str
    revenue_estimate: str
    steps: List[str]
    risks: List[str]
    resilience_plan: List[str]


class SOSPayload(BaseModel):
    type: str = "sos"
    user_id: str
    lat: float
    lng: float
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class MentorRequest(BaseModel):
    user_id: str
    mentor_id: Optional[str] = None
    needs: List[str] = []
    preferred_language: Optional[str] = None


class SchemeFilter(BaseModel):
    state: Optional[str] = None
    interest_area: Optional[str] = None
    women_only: Optional[bool] = None


class LearningJourney(BaseModel):
    user_id: str
    modules: List[str]
    progress: float = 0.0


