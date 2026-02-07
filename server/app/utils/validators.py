# app/utils/validators.py

def require_fields(data, fields):
    missing = [f for f in fields if f not in data or data[f] in (None, "")]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    return True, None
