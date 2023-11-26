#Poll Application RESTful API
This RESTful API serves as the backend for a poll application, enabling users to create, retrieve, and vote on polls. The API is designed using Node.js with Express and MySQL as the database.

Installation
Clone this repository.
Install dependencies using npm install.
Set up the MySQL database and configure the connection in config/db.js.
Start the server using npm start.
API Endpoints
1. Create Poll
Endpoint: POST /polls
Description: Creates a new poll with multiple options.
Request Body:
json
Copy code
{
  "title": "Example Poll",
  "category": "Example Category",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "minReward": 5,
  "maxReward": 10
}
Response: Returns the created poll details.
2. Add Question Set to Poll
Endpoint: POST /polls/:pollId/questions
Description: Adds a question set to a specific poll.
Request Parameters:
pollId: The unique identifier for the poll.
Request Body:
json
Copy code
{
  "questionType": "single/multiple",
  "questionText": "Example question?",
  "options": ["Option 1", "Option 2", "Option 3"]
}
Response: Returns the added question set details.
3. Fetch All Created Polls
Endpoint: GET /polls
Description: Retrieves a list of all created polls with analytics.
... (continue documenting other endpoints)

Models
1. Users
Represents users in the system.
Attributes: user_id, username.
... (document other models)

Controllers
Poll.controller.js: Handles poll-related operations.
User.controller.js: Manages user-related actions.
Models
Poll.model.js: Contains functions to interact with polls in the database.
User.model.js: Includes functions for user-related database interactions.
Database Schema
The database schema includes tables for Users, Polls, Questions, Options, UserPolls, and PollAnalytics.

... (describe schema)

Postman Collection
Access the Postman collection here.

Feel free to enhance and expand this documentation by adding more detailed descriptions, examples, or any additional information that might be relevant for users or developers interacting with your API.
