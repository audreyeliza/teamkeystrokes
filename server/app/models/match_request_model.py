from bson import ObjectId
from app.extensions import mongo

def matches_col():
    return mongo.db.matches

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

    matches = list(cursor)
    if not matches:
        return []

    user_ids = set()
    for m in matches:
        if "student_id" in m:
            user_ids.add(m["student_id"])
        if "tutor_id" in m:
            user_ids.add(m["tutor_id"])

    object_ids = [ObjectId(uid) for uid in user_ids]
    users = list(mongo.db.users.find({"_id": {"$in": object_ids}}))
    id_to_name = {str(u["_id"]): u.get("name") for u in users}

    for m in matches:
        sid = m.get("student_id")
        tid = m.get("tutor_id")
        m["student_name"] = id_to_name.get(sid, sid)
        m["tutor_name"] = id_to_name.get(tid, tid)

    return matches

def update_match_status(match_id, status):
    matches_col().update_one(
        {"_id": ObjectId(match_id)},
        {"$set": {"status": status}},
    )

def get_match(match_id):
    return matches_col().find_one({"_id": ObjectId(match_id)})
