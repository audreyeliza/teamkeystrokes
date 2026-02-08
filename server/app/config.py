# app/config.py

import os

class Config:
    MONGODB_URI = os.getenv("mongodb+srv://appuser:MgBOSpiQlZLD4Zv@cluster0.s32hf86.mongodb.net/?appName=Cluster0", "mongodb://localhost:27017/tutor_app")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change")  # for demo
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
