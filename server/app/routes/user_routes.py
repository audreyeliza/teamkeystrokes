# app/routes/user_routes.py
from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.models.user_model import find_user_by_id
from app.config import Config

user_bp = Blueprint("users", __name__)

@user_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = find_user_by_id(user_id)
    if not user:
        return {"message": "User not found"}, 404
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "city": user.get("city"),
        "zip": user.get("zip"),
    }

@user_bp.get("/metadata")
def metadata():
    """Send fixed subject and age-group lists for dropdowns."""
    return {
        "subjects": Config.SUBJECTS,
        "age_groups": Config.AGE_GROUPS,
    }
