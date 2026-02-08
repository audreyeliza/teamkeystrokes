# app/models/message_model.py
from bson import ObjectId
from flask import current_app
from app.extensions import mongo
from datetime import datetime

def messages_col():
    return mongo.db.messages

def create_message(match_id, sender_id, text):
    doc = {
        "match_id": match_id,
        "sender_id": sender_id,
        "text": text,
        "created_at": datetime.utcnow(),
    }
    result = messages_col().insert_one(doc)
    return str(result.inserted_id)

def get_messages_for_match(match_id):
    cursor = messages_col().find({"match_id": match_id}).sort("created_at", 1)
    return list(cursor)
