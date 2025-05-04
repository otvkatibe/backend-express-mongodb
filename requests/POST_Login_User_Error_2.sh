curl --request POST \
  --url 'http://localhost:3000/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "newuser",
    "email": "Lalalala@gmail.com",
    "password": "securepassword123"
    }'