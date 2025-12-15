from datetime import datetime
from .connection import get_connection


def db_activity_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute("""
        INSERT INTO daily_activity (user_id, water, steps, calories, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (data["user_id"], data["water"], data["steps"], data["calories"], now))

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_activity_get_one(new_id)


def db_activity_get_one(activity_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM daily_activity WHERE id=?", (activity_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_activity_get_all(user_id):
    conn = get_connection()
    rows = conn.execute("""
        SELECT * FROM daily_activity 
        WHERE user_id=?
        ORDER BY id DESC
    """, (user_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_activity_update(activity_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute("""
        UPDATE daily_activity
        SET water=?, steps=?, calories=?, updated_at=?
        WHERE id=?
    """, (data["water"], data["steps"], data["calories"], now, activity_id))

    conn.commit()
    conn.close()
    return db_activity_update(activity_id)


def db_activity_delete(activity_id):
    old = db_activity_update(activity_id)
    if not old:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM daily_activity WHERE id=?", (activity_id,))
    conn.commit()
    conn.close()
    return old
