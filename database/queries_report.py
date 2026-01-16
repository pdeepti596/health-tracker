
# from database.connection import get_connection

# def user_health_report():
#     conn = get_connection()
#     rows = conn.execute("""
#         SELECT
#             u.id AS user_id,
#             u.name,
#             u.age,
#             u.gender,
#             u.height,
#             u.weight,            

#             ua.steps,
#             ua.water_intake,
#             ua.calories_burned,

#             m.disease,
#             m.genetic_disease,
#             m.allergies
#         FROM user_inputs u
#         LEFT JOIN user_activity ua
#             ON u.id = ua.user_id
#         LEFT JOIN medical_info m
#             ON u.id = m.user_id
#         ORDER BY u.id DESC;
#     """).fetchall()

#     conn.close()
#     return [dict(r) for r in rows]
