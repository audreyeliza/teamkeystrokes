# app/models/tutor_profile_model.py
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

    city = filters.get("city")
    zip_code = filters.get("zip")
    subject = filters.get("subject")
    age_group = filters.get("age_group")
    min_rate = filters.get("min_rate")
    max_rate = filters.get("max_rate")

    # case-insensitive city / zip
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    if zip_code:
        query["zip"] = {"$regex": zip_code, "$options": "i"}

    # subject: matches element in subjects array
    if subject:
        query["subjects"] = subject

    # age_group: matches element in age_groups array
    if age_group:
        query["age_groups"] = age_group

    # hourly_rate range (field name matches save_profile)
    if min_rate is not None or max_rate is not None:
        rate_q = {}
        if min_rate is not None:
            rate_q["$gte"] = float(min_rate)
        if max_rate is not None:
            rate_q["$lte"] = float(max_rate)
        query["hourly_rate"] = rate_q

    print("MONGO QUERY:", query)  # optional debug

    return list(tutor_profiles().find(query))
