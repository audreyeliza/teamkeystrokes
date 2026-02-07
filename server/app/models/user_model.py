# app/models/user_model.py
from bson import ObjectId
from app.extensions import mongo  # use the shared PyMongo instance

def users_collection():
    return mongo.db.users

def create_user(data):
    users = users_collection()
    result = users.insert_one(data)
    return str(result.inserted_id)

def find_user_by_email(email):
    return users_collection().find_one({"email": email})

def find_user_by_id(user_id):
    return users_collection().find_one({"_id": ObjectId(user_id)})
