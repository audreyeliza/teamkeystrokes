# app/models/user_model.py
from bson import ObjectId
from flask import current_app

def users_collection():
    return current_app.extensions["pymongo"].db.users

def create_user(data):
    users = users_collection()
    result = users.insert_one(data)
    return str(result.inserted_id)

def find_user_by_email(email):
    return users_collection().find_one({"email": email})

def find_user_by_id(user_id):
    return users_collection().find_one({"_id": ObjectId(user_id)})
