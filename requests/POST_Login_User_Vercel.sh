curl --request POST \
  --url 'https://backend-express-mongodb-six.vercel.app/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "newuser",
    "email": "lala@gmail.com",
    "password": "securepassword123"
  }'