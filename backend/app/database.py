from fastapi import Depends  # noqa: F401
from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db_name = os.getenv("MONGO_DB", "agriher")


def get_db():
    db = client[db_name]
    try:
        yield db
    finally:
        pass

