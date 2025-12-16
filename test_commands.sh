# A. Get All users
curl -X GET "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users"

# B. Get One user
curl -X GET "http://localhost:8000/api/users/1"

# # C. Create user
curl -X POST "https://organic-eureka-97r6j56v547jf7w4-8000.app.github.dev/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "course": "Computer Science",
    "year": 2
  }'

# # D. Update user
# curl -X PUT "http://localhost:8000/api/students/1" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "name": "Alice Updated",
#     "email": "alice_new@example.com",
#     "course": "Data Science",
#     "year": 3
#   }'

# # E. Delete user
# curl -X DELETE "http://localhost:8000/api/students/1"



