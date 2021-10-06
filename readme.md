# express-typeorm-bull

Example for distributed jobs trigger after CRUD actions.

# Getting started

1. `docker-compose up -d`
2. `yarn develop`

# Detail

All CRUD actions that mutate user records will need to make notifications.

- `POST /users` --> notify that a new user is created
- `PUT /user/:id` --> notify that a user is updated
- `DELETE /user/:id` --> notify that a user is deleted

To list all notifications: `GET /notifications`
