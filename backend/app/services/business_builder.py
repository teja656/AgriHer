from __future__ import annotations

from datetime import datetime, timedelta
from random import randint
from typing import List

from app.models.schemas import BusinessPlan, BusinessPlanRequest


def generate_business_plan(payload: BusinessPlanRequest) -> BusinessPlan:
    base_investment = payload.capital or 150000
    rev_projection = base_investment * 0.3
    steps: List[str] = [
        "Customer discovery with 10+ women farmers",
        "Prototype product/service & gather feedback",
        "Register entity + basic compliance (FSSAI/MSME)",
        "Launch pilot via WhatsApp/ONDC",
    ]
    if payload.sustainability_focus:
        steps.append("Publish sustainability report + carbon savings badge")
    risks = [
        "Climate variability → diversify crop/inputs",
        "Working capital crunch → micro-credit & advance payments",
        "Talent gap → partner with agri universities",
    ]
    resilience = [
        "Adopt parametric insurance or crop cover",
        "Maintaining digital ledger for lenders",
        "Emergency mentorship circle with alumni",
    ]
    return BusinessPlan(
        title=f"{payload.name}'s {payload.idea}",
        overview="Community-first agri venture with tech-enabled support.",
        investment_estimate=f"₹{base_investment:,.0f}",
        revenue_estimate=f"₹{rev_projection:,.0f} / month after 6 months",
        steps=steps,
        risks=risks,
        resilience_plan=resilience,
    )


