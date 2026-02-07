# app/models/tutor_profile_model.py
from bson import ObjectId
from app.extensions import mongo

def tutor_profiles():
    return mongo.db.tutor_profiles

def upsert_tutor_profile(user_id, data):
    col = tutor_profiles()
    col.update_one(
        {"user_id": user_id},
        {"$set": data},
        upsert=True,
    )

def get_tutor_profile(user_id):
    return tutor_profiles().find_one({"user_id": user_id})

def search_tutors(filters):
    query = {"is_active": True}
    if "city" in filters:
        query["city"] = filters["city"]
    if "zip" in filters:
        query["zip"] = filters["zip"]
    if "subject" in filters:
        query["subjects"] = filters["subject"]
    if "age_group" in filters:
        query["age_groups"] = filters["age_group"]
    if "min_rate" in filters or "max_rate" in filters:
        rate_q = {}
        if "min_rate" in filters:
            rate_q["$gte"] = filters["min_rate"]
        if "max_rate" in filters:
            rate_q["$lte"] = filters["max_rate"]
        query["hourly_rate"] = rate_q

    return list(tutor_profiles().find(query))
