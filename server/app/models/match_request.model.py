# app/models/match_request_model.py
from bson import ObjectId
from flask import current_app

def matches_col():
    return current_app.extensions["pymongo"].db.match_requests

def create_match(student_id, tutor_id):
    doc = {
        "student_id": student_id,
        "tutor_id": tutor_id,
        "status": "pending",
    }
    result = matches_col().insert_one(doc)
    return str(result.inserted_id)

def get_matches_for_user(user_id, role):
    col = matches_col()
    if role == "tutor":
        cursor = col.find({"tutor_id": user_id})
    else:
        cursor = col.find({"student_id": user_id})
    return list(cursor)

def update_match_status(match_id, status):
    matches_col().update_one(
        {"_id": ObjectId(match_id)},
        {"$set": {"status": status}},
    )

def get_match(match_id):
    return matches_col().find_one({"_id": ObjectId(match_id)})
