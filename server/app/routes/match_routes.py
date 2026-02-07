# app/routes/match_routes.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from app.models.match_request_model import (
    create_match,
    get_matches_for_user,
    update_match_status,
    get_match,
)

match_bp = Blueprint("matches", __name__)


@match_bp.post("/")
@jwt_required()
def create_match_route():
    """
    Student-only endpoint to create a new match with a tutor.
    """
    claims = get_jwt()
    if claims.get("role") != "student":
        return {"message": "Only students can create matches"}, 403

    student_id = get_jwt_identity()
    tutor_id = (request.get_json() or {}).get("tutor_id")
    if not tutor_id:
        return {"message": "tutor_id required"}, 400

    match_id = create_match(student_id, tutor_id)
    return {"id": match_id}, 201


@match_bp.get("/me")
@jwt_required()
def my_matches():
    """
    Return matches for the current user, based on their role.
    """
    user_id = get_jwt_identity()
    role = get_jwt().get("role")

    matches = get_matches_for_user(user_id, role)
    for m in matches:
        m["id"] = str(m["_id"])
        m.pop("_id", None)

    return {"matches": matches}


@match_bp.patch("/<match_id>")
@jwt_required()
def update_match(match_id):
    """
    Tutor-only endpoint to update a match status to accepted/declined.
    """
    claims = get_jwt()
    if claims.get("role") != "tutor":
        return {"message": "Only tutors can update matches"}, 403

    status = (request.get_json() or {}).get("status")
    if status not in ["accepted", "declined"]:
        return {"message": "Invalid status"}, 400

    # Optional: verify that this tutor actually belongs to the match
    update_match_status(match_id, status)
    return {"message": "Updated"}
