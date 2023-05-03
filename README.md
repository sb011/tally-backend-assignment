Calendly

This is a simple web application that allows users to schedule meetings with a host. The application allows the host to set their availability and users can view this availability and schedule meetings with the host. The application also integrates with Google Calendar to automatically add the scheduled meeting to the calendars of the host and user.

Getting Started
To run the application locally, follow these steps:

1. Clone the repository

```
git clone https://github.com/sb011/tally-backend-assignment.git
```

2. Install the dependencies

```
cd tally-backend-assginment
npm install
```

3. Set up the environment variables
   Create a .env file in the root directory of the project and set the following environment variables:

```
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_REDIRECT_URI=<your-google-redirect-uri>
```

4. Start the server

```
npm run dev
```

The server will start on port 3000.

API Documentation
The API documentation can be found at http://localhost:3000/api-docs.

Authentication
The API uses OAuth2 for authentication. To access the endpoints, you will need to first obtain an access token from the authentication server.

To obtain an access token, make a request to http://localhost:3000/oauth/google and follow the authorization flow. Once you have authorized the application, you will be redirected to http://localhost:3000/oauth/google/callback with an authorization code. Use this code to obtain an access token by making a request to http://localhost:3000/oauth/google/callback with the code as a query parameter.

Include the access token in the Authorization header of your requests, like this:

```
Authorization: Bearer <access-token>
```

Endpoints
GET /api/availability
Gets the availability for the authenticated user.

POST /api/meetings
Schedules a meeting between the authenticated user and another user.

GET /api/meetings
Returns a list of meetings scheduled for the authenticated user.

GET /api/meetings/:id
Return a meeting scheduled for the authenticated user.

Docker
The application can be run inside a Docker container. To build the Docker image, run:

Technologies Used
Node.js
TypeScript
Docker
Zod
Swagger
OAuth2
Google Calendar API
