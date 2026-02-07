# app/routes/tutor_routes.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.models.tutor_profile_model import upsert_tutor_profile, get_tutor_profile, search_tutors
from app.models.user_model import find_user_by_id
from app.config import Config


tutor_bp = Blueprint("tutors", __name__)

def require_tutor():
    claims = get_jwt()
    if claims.get("role") != "tutor":
        return {"message": "Tutor role required"}, 403

@tutor_bp.post("/profile")
@jwt_required()
def save_profile():
    if (resp := require_tutor()) is not None:
        return resp
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    profile_doc = {
        "user_id": user_id,
        "subjects": data.get("subjects", []),
        "hourly_rate": data.get("hourly_rate", 0),
        "age_groups": data.get("age_groups", []),
        "city": data.get("city"),
        "zip": data.get("zip"),
        "bio": data.get("bio", ""),
        "is_active": data.get("is_active", True),
    }
    upsert_tutor_profile(user_id, profile_doc)
    return {"message": "Profile saved"}

@tutor_bp.patch("/profile/active")
@jwt_required()
def toggle_active():
    if (resp := require_tutor()) is not None:
        return resp
    user_id = get_jwt_identity()
    is_active = (request.get_json() or {}).get("is_active", True)
    upsert_tutor_profile(user_id, {"is_active": is_active})
    return {"message": "Updated"}

@tutor_bp.get("/me")
@jwt_required()
def my_profile():
    if (resp := require_tutor()) is not None:
        return resp
    user_id = get_jwt_identity()
    profile = get_tutor_profile(user_id) or {}
    profile["id"] = str(profile.get("_id")) if profile.get("_id") else None
    profile.pop("_id", None)
    return profile

@tutor_bp.get("/search")
def search():
    city = request.args.get("city")
    zip_code = request.args.get("zip")
    subject = request.args.get("subject")
    age_group = request.args.get("ageGroup")
    min_rate = request.args.get("minRate", type=float)
    max_rate = request.args.get("maxRate", type=float)

    filters = {}
    if city:
        filters["city"] = city
    if zip_code:
        filters["zip"] = zip_code
    if subject:
        filters["subject"] = subject
    if age_group:
        filters["age_group"] = age_group
    if min_rate is not None:
        filters["min_rate"] = min_rate
    if max_rate is not None:
        filters["max_rate"] = max_rate

    tutors = search_tutors(filters)
    # join basic user info
    results = []
    for t in tutors:
        user = find_user_by_id(t["user_id"])
        results.append({
            "id": str(t["_id"]),
            "tutor_user_id": t["user_id"],
            "name": user["name"] if user else "",
            "subjects": t.get("subjects", []),
            "hourly_rate": t.get("hourly_rate", 0),
            "age_groups": t.get("age_groups", []),
            "city": t.get("city"),
            "zip": t.get("zip"),
            "bio": t.get("bio", ""),
        })

    return {"tutors": results}
