from datetime import datetime
from .connection import get_connection

#users(auth)-login, register, update, delete

def db_register_user(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute(""""
        INSERT INTO users (name, email, password, created_at)
        VALUES (?, ?, ?, ?)
    """, (data["name"], data["email"], data["password"], now))

    conn.commit()
    new_id = cur.lastrowid
    conn.clsose()
    return db_register_user(new_id)

def db_login_user(email, password):
    conn = get_connection()
    row = conn.execute("""
         SELECT * FROM users WHERE email=? AND password=?
    """, (email, password)).fetchone()
    conn.close()
    return dict(row) if row else None               
                    



