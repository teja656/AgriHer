from __future__ import annotations

from typing import List



# Default demo schemes used to auto-seed MongoDB on first call
SCHEMES = [
    {
        "name": "PMFME",
        "for": ["food_processing", "value_addition"],
        "women_only": False,
        "states": ["KA", "TN", "AP", "TS"],
        "documents": ["Aadhaar", "Business Plan"],
        "support": "35% credit-linked subsidy",
    },
    {
        "name": "Mahila Kisan Sashaktikaran",
        "for": ["collectives", "fpos"],
        "women_only": True,
        "states": ["ALL"],
        "documents": ["Self Help Group letters"],
        "support": "Seed capital + skill training",
    },
    {
        "name": "RKVY Innovation",
        "for": ["agritech", "climate"],
        "women_only": False,
        "states": ["KA", "MH", "GJ"],
        "documents": ["Pitch Deck", "Prototype Evidence"],
        "support": "Grant up to ₹25L for pilots",
    },
]


def _norm_state(value: str | None) -> str | None:
    if not value:
        return None
    value = value.strip().upper()
    # If user passes "Karnataka", "Tamil Nadu" etc, use first two letters
    if len(value) > 2:
        value = value[:2]
    return value


def _norm_interest(value: str | None) -> str | None:
    if not value:
        return None
    return value.strip().lower().replace(" ", "_")


def _to_api(doc: dict) -> dict:
    """Convert Mongo doc to JSON-safe API shape without failing on ObjectId."""
    data = dict(doc)  # shallow copy
    if "_id" in data:
        data["_id"] = str(data["_id"])
    return data


def _ensure_seeded(collection):
    """If the collection is empty, seed it with default schemes."""
    if collection.count_documents({}) == 0:
        collection.insert_many(SCHEMES)


def find_schemes(
    db,
    state: str | None,
    interest: str | None,
    women_only: bool | None,
) -> List[dict]:
    """
    Fetch schemes from MongoDB with forgiving filters.

    - Primary source is the `schemes` collection (live/editable).
    - On first use, auto-seeds with a small demo set if collection is empty.
    - If filters yield no results, falls back to returning all schemes.
    """
    collection = db["schemes"]
    _ensure_seeded(collection)

    norm_state = _norm_state(state)
    norm_interest = _norm_interest(interest)

    query: dict = {}

    if norm_state:
        # match either explicit state or "ALL"
        query["states"] = {"$in": [norm_state, "ALL"]}

    if norm_interest:
        query["for"] = _norm_interest(norm_interest)

    if women_only is True:
        query["women_only"] = True

    docs = list(collection.find(query))

    # friendly fallback: if nothing matched, return all schemes
    if not docs:
        docs = list(collection.find({}))

    return [_to_api(doc) for doc in docs]

