# API Documentation

This document provides detailed information on the available endpoints and their request/response structure for the project.

## Base URL

The base URL for all API endpoints is: `http://localhost:8000`

## Authentication

To access protected endpoints, you need to include the `Authorization` header in your requests. The header value should be in the format `Bearer <jwt-token>`, where `<jwt-token>` is a valid JSON Web Token obtained through the login endpoint.

## Endpoints

### Upload an Image

**Endpoint**: `POST /images`

**Description**: Uploads an image file and saves it to the server.

**Request**:

- Headers:
  - `Authorization` (required): Bearer token obtained through authentication.
- Body:
  - `file` (required): The image file to upload (multipart/form-data).
  - `description` (optional): Description of the image.

**Response**:

- Success:
  - Status: 200 OK
  - Body: 
    ```json
    {
      "status": 1,
      "message": "Image saved"
    }
    ```
- Error:
  - Status: 500 Internal Server Error
  - Body: 
    ```json
    {
      "error": "Something went wrong! Unable to upload at the moment."
    }
    ```

### User Registration

**Endpoint**: `POST /registration`

**Description**: Registers a new user.

**Request**:

- Body:
  - `username` (required): Username of the user.
  - `email` (required): Email address of the user.
  - `password` (required): Password of the user.

**Response**:

- Success:
  - Status: 200 OK
  - Body: The created user object
- Error:
  - Status: 400 Bad Request
  - Body: 
    ```json
    {
      "error": "Invalid username"
    }
    ```
    or
    ```json
    {
      "error": "Invalid email address"
    }
    ```
    or
    ```json
    {
      "error": "Invalid password"
    }
    ```

### User Login

**Endpoint**: `POST /login`

**Description**: Logs in with an existing user.

**Request**:

- Body:
  - `email` (required): Email address of the user.
  - `password` (required): Password of the user.

**Response**:

- Success:
  - Status: 200 OK
  - Body: 
    ```json
    {
      "message": "Login successful",
      "token": "<jwt-token>",
      "username": "<username>",
      "userid": "<userid>"
    }
    ```
- Error:
  - Status: 400 Bad Request
  - Body: 
    ```json
    {
      "error": "User not found"
    }
    ```
    or
    ```json
    {
      "error": "Invalid password"
    }
    ```

### Get User Images

**Endpoint**: `GET /userimages/:userid`

**Description**: Retrieves all images uploaded by a specific user.

**Request**:

- Headers:
  - `Authorization` (required): Bearer token obtained through authentication.
- URL Parameters:
  - `userid` (required): ID of the user to retrieve images for.

**Response**:

- Success:
  - Status: 200 OK
  - Body: Array of image objects
- Error:
  - Status: 403 Forbidden
  - Body: 
    ```json
    {
      "error": "Unauthorized"
    }
    ```
  - or
  - Status: 404 Not Found
  - Body: 
    ```json
    {
      "error": "Images not found for the user"
    }
    ```
  - or
  - Status: 500 Internal Server Error
  - Body: 
    ```json
    {
      "error": "Internal server error"
    }
    ```