# app/config.py

import os

class Config:
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/tutor_app")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change")  # for demo
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

    SUBJECTS = [
        "Math",
        "English",
        "Science",
        "History",
        "Computer Science",
        "Foreign Language",
        "Test Prep",
    ]

    AGE_GROUPS = [
        "elementary",
        "middle",
        "high",
        "college",
    ]
