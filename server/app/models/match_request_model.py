# app/models/match_request_model.py
from bson import ObjectId
from app.extensions import mongo


def matches_col():
    """
    Collection used to store student–tutor matches.
    """
    return mongo.db.matches  # FIX: was tutor_profiles


def create_match(student_id, tutor_id):
    """
    Create a new match between a student and a tutor.

    :param student_id: ID of the student (string, from JWT identity)
    :param tutor_id: ID of the tutor (string)
    :return: ID of the created match as string
    """
    doc = {
        "student_id": student_id,
        "tutor_id": tutor_id,
        "status": "pending",
    }
    result = matches_col().insert_one(doc)
    return str(result.inserted_id)


def get_matches_for_user(user_id, role):
    """
    Get all matches for a given user based on their role.

    - If role == "tutor": matches where tutor_id == user_id
    - Otherwise (student): matches where student_id == user_id
    """
    col = matches_col()
    if role == "tutor":
        cursor = col.find({"tutor_id": user_id})
    else:
        cursor = col.find({"student_id": user_id})
    return list(cursor)


def update_match_status(match_id, status):
    """
    Update the status of a match.

    :param match_id: Match document _id as string
    :param status: "accepted" | "declined"
    """
    matches_col().update_one(
        {"_id": ObjectId(match_id)},
        {"$set": {"status": status}},
    )


def get_match(match_id):
    """
    Fetch a single match by its ID.
    """
    return matches_col().find_one({"_id": ObjectId(match_id)})
