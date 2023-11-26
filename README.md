# Poll Application RESTful API

This RESTful API serves as the backend for a poll application, enabling users to create, retrieve, and vote on polls. The API is designed using Node.js with Express and MySQL as the database.

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up the MySQL database and configure the connection in `config/db.js`.
4. Start the server using `npm start`.

## API Endpoints

### 1. Create Poll

- **Endpoint:** `POST /polls`
- **Description:** Creates a new poll with multiple options.
- **Request Body:**
  ```json
  {
    "title": "Example Poll",
    "category": "Example Category",
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "minReward": 5,
    "maxReward": 10
  }
  Response: Returns the added question set details.

### 3. Fetch All Created Polls

- **Endpoint:** `GET /polls`
- **Description:** Retrieves a list of all created polls with analytics.
- *Continue documenting other endpoints...*

## Models

### 1. Users

Represents users in the system.

- **Attributes:** `user_id`, `username`.
- *Document other models...*

## Controllers

- `Poll.controller.js`: Handles poll-related operations.
- `User.controller.js`: Manages user-related actions.

## Models

- `Poll.model.js`: Functions to interact with polls in the database.
- `User.model.js`: Functions for user-related database interactions.

## Database Schema

The database schema includes tables for Users, Polls, Questions, Options, UserPolls, and PollAnalytics. Here's an overview:

### Users Table

- `user_id`: Unique identifier for users.
- `username`: User's username.

### Polls Table

- ... (Describe other tables and their attributes)

## Postman Collection

[Access the Postman collection here](https://universal-star-350473.postman.co/workspace/New-Team-Workspace~d50e83ff-5303-424f-a991-8e73d7c728fc/collection/30678801-a80ef647-1f2e-46b5-86c9-52a39c4c8773?action=share&creator=30678801)


Feel free to enhance and expand this documentation by adding more detailed descriptions, examples, or any additional information that might be relevant for users or developers interacting with your API.

