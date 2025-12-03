from __future__ import annotations

import joblib
import os
from pathlib import Path
from typing import Dict, List

from app.models.schemas import CareerProfile, CareerRecommendation


MODELS_DIR = Path(__file__).resolve().parents[2] / "models"
CAREER_MODEL_PATH = Path(os.getenv("CAREER_MODEL", MODELS_DIR / "career_model.joblib"))


class CareerRecommender:
    def __init__(self) -> None:
        self.pipeline = None
        if CAREER_MODEL_PATH.exists():
            try:
                data = joblib.load(CAREER_MODEL_PATH)
                self.pipeline = data
            except Exception as exc:
                print("Could not load career model:", exc)

    def recommend(self, profile: CareerProfile) -> CareerRecommendation:
        if self.pipeline:
            model = self.pipeline.get("model")
            cols = self.pipeline.get("cols", [])
            feature_vec = self._vectorize(profile, cols)
            prediction = model.predict([feature_vec])[0]
            return CareerRecommendation(
                career=str(prediction),
                reason="Predicted via trained model",
                roadmap=self._default_roadmap(str(prediction)),
                source="model",
            )
        return self._rule_based(profile)

    @staticmethod
    def _vectorize(profile: CareerProfile, cols: List[str]) -> List[int]:
        features: Dict[str, int] = {col: 0 for col in cols}
        features[f"education_{profile.education_level}"] = 1
        features[f"interest_{profile.interest_area}"] = 1
        features["land_True"] = 1 if profile.land_available else 0
        features["experience"] = profile.experience_years
        return [features[col] for col in cols]

    def _rule_based(self, profile: CareerProfile) -> CareerRecommendation:
        if profile.interest_area == "technology":
            role = "AgriTech Consultant"
            reason = "Strong tech inclination"
            roadmap = [
                "Complete basic agri data analysis course",
                "Prototype farm analytics dashboard",
                "Pilot with 1-2 local farms",
            ]
        elif profile.land_available:
            role = "Organic Farmer & Community Supplier"
            reason = "Own land – leverage for premium organic produce"
            roadmap = [
                "Map soil health & climate risks",
                "Adopt 2 climate-smart crops",
                "Launch CSA subscription with nearby apartments",
            ]
        else:
            role = "Food Processing Entrepreneur"
            reason = "No farm assets needed – focus on value addition"
            roadmap = [
                "Pick high-demand SKU (millets, pickles, ready mixes)",
                "Get FSSAI registration & lightweight branding",
                "Run D2C trials via ONDC / WhatsApp",
            ]
        return CareerRecommendation(
            career=role,
            reason=reason,
            roadmap=roadmap,
            source="rules",
        )

    @staticmethod
    def _default_roadmap(career: str) -> List[str]:
        return [
            f"Upskill with a micro-course tailored to {career}",
            "Build a pilot/research project and capture learnings",
            "Publish traction metrics & pitch to schemes/mentors",
        ]


recommender = CareerRecommender()


