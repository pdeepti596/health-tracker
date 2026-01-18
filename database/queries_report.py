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
                u.user_id,
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
            INNER JOIN user_activity a
                ON u.user_id = a.user_id
            INNER JOIN medical_info m
                ON u.user_id = m.user_id
            ORDER BY u.user_id
        """

        cursor.execute(query)
        rows = cursor.fetchall()

        result = [
            {
                "user_id": r[0],
                "name": r[1],
                "age": r[2],
                "gender": r[3],
                "height": r[4],
                "weight": r[5],
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
        print(f"❌ Error in user_health_report: {e}")
        import traceback
        traceback.print_exc()
        return []
