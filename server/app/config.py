# app/config.py

import os

class Config:
    MONGODB_URI = os.getenv(
        "MONGODB_URI",
        "mongodb://localhost:27017/tutor_match",
    )
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change")
    FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

    SUBJECTS = [
        "Mathematics",
        "Language Arts",
        "Science",
        "Social Studies",
        "Computer Science",
        "Spanish",
        "Test Prep",
    ]

    AGE_GROUPS = [
        "Elementary",
        "Middle",
        "High",
        "College",
    ]
