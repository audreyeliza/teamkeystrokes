# app/extensions.py
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo

jwt = JWTManager()
mongo = PyMongo()  # this registers as current_app.extensions["pymongo"]
