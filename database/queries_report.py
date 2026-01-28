from database.connection import get_connection

def user_health_report():
    """
    Health Tracker Report (INNER JOIN)
    user_inputs + user_activity + medical_info
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()

        query = """
            SELECT
            u.id AS user_id,
            u.name,
            u.age,
            u.height,
            u.weight,
            u.gender,
            a.steps,
            a.water_intake,
            a.calories_burned,
            m.disease,
            m.genetic_disease,
            m.allergies
        FROM user_inputs u
        LEFT JOIN user_activity a ON a.user_id = u.id
        LEFT JOIN medical_info m ON m.user_id = u.id
        ORDER BY u.id DESC;
      """

        cursor.execute(query)
        rows = cursor.fetchall()

        result = [
            {
                "user_id": r[0],
                "name": r[1],
                "age": r[2],
                # "gender": r[3],
                "height": r[3],
                "weight": r[4],
                "gender": r[5],
                "steps": r[6],
                "water_intake": r[7],
                "calories_burned": r[8],
                "disease": r[9] or "None",
                "genetic_disease": r[10] or "None",
                "allergies": r[11] or "None"
            }
            for r in rows
        ]

        conn.close()
        print(f"✅ Report query successful: {len(result)} records found")
        return result

    except Exception as e:
        print(f"❌ Database error in user_health_report: {e}")
        import traceback
        traceback.print_exc()
        return []


# from database.connection import get_connection

# def user_health_report():
#     try:
#         conn = get_connection()
#         cursor = conn.cursor()

#         query = """
#         SELECT
#             u.id,
#             u.name,
#             u.age,
#             u.height,
#             u.weight,
#             u.gender,
#             COALESCE(a.steps, 'None'),
#             COALESCE(a.water_intake, 'None'),
#             COALESCE(a.calories_burned, 'None'),
#             COALESCE(m.disease, 'None'),
#             COALESCE(m.genetic_disease, 'None'),
#             COALESCE(m.allergies, 'None')
#         FROM user_inputs u
#         LEFT JOIN user_activity a ON a.user_id = u.id
#         LEFT JOIN medical_info m ON m.user_id = u.id
#         ORDER BY u.id DESC;
#         """

#         cursor.execute(query)
#         rows = cursor.fetchall()

#         result = [
#             {
#                 "id": r[0],
#                 "name": r[1],
#                 "age": r[2],
#                 "height": r[3],
#                 "weight": r[4],
#                 "gender": r[5],
#                 "steps": r[6],
#                 "water_intake": r[7],
#                 "calories_burned": r[8],
#                 "disease": r[9],
#                 "genetic_disease": r[10],
#                 "allergies": r[11],
#             }
#             for r in rows
#         ]

#         conn.close()
#         print(f"✅ Report loaded: {len(result)} records")
#         return result

#     except Exception as e:
#         print("❌ Error in user_health_report:", e)
#         return []



