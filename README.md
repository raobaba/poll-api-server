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
