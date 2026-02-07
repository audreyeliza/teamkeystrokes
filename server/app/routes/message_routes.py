# app/routes/message_routes.py
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.message_model import create_message, get_messages_for_match
from ..models.match_request_model import get_match

message_bp = Blueprint("messages", __name__)

def user_in_match(user_id, match_doc):
    return user_id in [match_doc["student_id"], match_doc["tutor_id"]]

@message_bp.get("/<match_id>")
@jwt_required()
def list_messages(match_id):
    user_id = get_jwt_identity()
    match_doc = get_match(match_id)
    if not match_doc or not user_in_match(user_id, match_doc):
        return {"message": "Not allowed"}, 403

    msgs = get_messages_for_match(match_id)
    for m in msgs:
        m["id"] = str(m["_id"])
        m.pop("_id", None)
    return {"messages": msgs}

@message_bp.post("/<match_id>")
@jwt_required()
def send_message(match_id):
    user_id = get_jwt_identity()
    match_doc = get_match(match_id)
    if not match_doc or not user_in_match(user_id, match_doc):
        return {"message": "Not allowed"}, 403

    text = (request.get_json() or {}).get("text", "").strip()
    if not text:
        return {"message": "Text required"}, 400
    msg_id = create_message(match_id, user_id, text)
    return {"id": msg_id}, 201
