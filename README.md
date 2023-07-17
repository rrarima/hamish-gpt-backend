# HamishGPT-Backend

Backend repository for an animal identification app - responsible for managing user data and authentication. It is a containerised service that interfaces with a MySQL server and is specifically designed to work with the frontend repository [HamishGPT](#https://github.com/JennyHolberton/hamish-gpt).


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

## Installation

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/rrarima/hamish-gpt-backend/`
2. Set up environment variables by creating a `.env` file with the following contents:

```

```
3. Build and run the containers: `docker-compose up --build`

## Usage

This application is designed to compliment [HamishGPT-frontend](#https://github.com/JennyHolberton/hamish-gpt) however the endpoints may be accessed using http requests if another use arises .

## Endpoints

- `POST /images`: Upload an image file and save it to the server. Requires authentication.
- `POST /registration`: Register a new user.
- `POST /login`: Log in with an existing user.
- `GET /userimages/:userid`: Get all images uploaded by a specific user. Requires authentication.

For detailed information on each endpoint, including request/response examples, refer to the [API documentation](api-docs.md).

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. To authenticate API requests, include the `Authorization` header with a valid JWT token:

```
Authorization: Bearer <jwt-token>
```

## Dependencies

The project relies on the following dependencies:

- `express`: Fast, unopinionated web framework for Node.js.
- `cors`: Middleware to enable Cross-Origin Resource Sharing (CORS).
- `sequelize`: Promise-based ORM for Node.js.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens (JWT).
- `multer`: Middleware for handling file uploads.
- `@google-cloud/storage`: Client library for interacting with Google Cloud Storage.
- `bcrypt`: Library for hashing and comparing passwords.
- `docker`: Platform to create, deploy and manage virtualized application containers on a common operating system 

For a complete list of dependencies, refer to the `package.json` file.

## Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request.
