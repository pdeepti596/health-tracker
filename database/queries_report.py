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
                "id": row[0],
                "name": row[1],
                "age": row[2],
                "gender": row[3],
                "height": row[4],
                "weight": row[5],
                "steps": row[6],
                "water_intake": row[7],
                "calories_burned": row[8],
                "disease": row[9] or "None",
                "genetic_disease": row[10] or "None",
                "allergies": row[11] or "None"
            }
            for row in rows
        ]

        conn.close()
        print(f"✅ Report query successful: {len(result)} records found")
        return result

    except Exception as e:
        print(f"❌ Database error in user_health_report: {e}")
        import traceback
        traceback.print_exc()
        return []
