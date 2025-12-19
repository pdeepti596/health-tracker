# A. Get All users
# curl -X GET "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users"

# # B. Get One user
# curl -X GET "http://localhost:8000/api/users/1"

# # # C. Create user
# curl -X POST "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "name": "Alice Johnson",
#     "age": 25,
#     "gender": "Female",
#     "height": 165,
#     "weight": 70
#   }'

# # # D. Update user
# curl -X PUT "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users/1" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "name": "Alice Updated",
#     "age": 26,
#     "gender": "Female",
#     "height": 165,
#     "weight": 70

#   }'

# # # E. Delete user
# curl -X DELETE "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users/1"






# A. Get all activities
curl -X GET "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/activities"

# B. Get One activity
curl -X GET "http://localhost:8000/api/activities/1"

# C. Create activity
curl -X POST "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/activities" \
  -H "Content-Type: application/json" \
  -d '{
    "activity_id": 1,
    "steps": 5000,
    "water": 2,
    "calories": 300
  }'

# D. Update activity
curl -X PUT "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/activities/1" \
  -H "Content-Type: application/json" \
  -d '{
    "steps": 6500,
    "water": 3,
    "calories": 350
  }'

# E. Delete activity
curl -X DELETE "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/activities/1"




