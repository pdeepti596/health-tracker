A. Get All users
curl -X GET "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users"

# B. Get One user
curl -X GET "http://localhost:8000/api/users/1"

# # C. Create user
curl -X POST "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "age": 25,
    "gender": "Female",
    "height": 165,
    "weight": 70
  }'

# # D. Update user
curl -X PUT "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "age": 26,
    "gender": "Female",
    "height": 165,
    "weight": 70
    
  }'

# # E. Delete user
# curl -X DELETE "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users/1"



