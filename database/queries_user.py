from datetime import datetime
from .connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM user_inputs").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(user_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM user_inputs WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO users (name, age, gender, height, weight, created_at)"
        "VALUES (?, ?, ?, ?, ?, ?)",
        (
            data["name"], data["age"], data["gender"],
            data["height"], data["weight"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(user_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE users SET name=?, age=?, gender=?, height=?, weight=?, updated_at=?
        WHERE id=?
    """, (
        data["name"], data["age"], data["gender"],
        data["height"], data["weight"], now, user_id
    ))
    conn.commit()
    conn.close()
    return db_get_one(user_id)


def db_delete(user_id):
    existing = db_get_one(user_id)
    if not existing:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    conn.close()
    return existing

