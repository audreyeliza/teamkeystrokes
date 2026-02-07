# app/routes/auth_routes.py
from flask import Blueprint, request
from flask_jwt_extended import (
    create_access_token,
)
from ..models.user_model import create_user, find_user_by_email
from ..utils.security import hash_password, verify_password
from ..config import Config

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    required = ["name", "email", "password", "role", "city", "zip"]
    if not all(k in data for k in required):
        return {"message": "Missing fields"}, 400

    if data["role"] not in ["tutor", "student"]:
        return {"message": "Invalid role"}, 400

    existing = find_user_by_email(data["email"])
    if existing:
        return {"message": "Email already registered"}, 400

    user_doc = {
        "name": data["name"],
        "email": data["email"],
        "password_hash": hash_password(data["password"]),
        "role": data["role"],
        "city": data["city"],
        "zip": data["zip"],
    }
    user_id = create_user(user_doc)

    access_token = create_access_token(identity=str(user_id), additional_claims={
        "role": data["role"],
        "name": data["name"],
    })
    return {
        "access_token": access_token,
        "user": {"id": user_id, "name": data["name"], "role": data["role"]},
        "subjects": Config.SUBJECTS,
        "age_groups": Config.AGE_GROUPS,
    }, 201

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    user = find_user_by_email(data.get("email"))
    if not user or not verify_password(data.get("password", ""), user["password_hash"]):
        return {"message": "Invalid credentials"}, 401

    access_token = create_access_token(identity=str(user["_id"]), additional_claims={
        "role": user["role"],
        "name": user["name"],
    })
    return {
        "access_token": access_token,
        "user": {"id": str(user["_id"]), "name": user["name"], "role": user["role"]},
    }
