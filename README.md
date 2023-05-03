<h1>Calendly</h1>

This is a simple web application that allows users to schedule meetings with a host. The application allows the host to set their availability and users can view this availability and schedule meetings with the host. The application also integrates with Google Calendar to automatically add the scheduled meeting to the calendars of the host and user.

<h2>Getting Started</h2>
To run the application locally, follow these steps:
<br>
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

<h1>API Documentation</h1>
The API documentation can be found at http://localhost:3000/api-docs.

<h2>Authentication</h2>
The API uses OAuth2 for authentication. To access the endpoints, you will need to first obtain an access token from the authentication server.

To obtain an access token, make a request to http://localhost:3000/oauth/google and follow the authorization flow. Once you have authorized the application, you will be redirected to http://localhost:3000/oauth/google/callback with an authorization code. Use this code to obtain an access token by making a request to http://localhost:3000/oauth/google/callback with the code as a query parameter.

Include the access token in the Authorization header of your requests, like this:

```
Authorization: Bearer <access-token>
```

<h2>Endpoints</h2>
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
```
docker build -t calendly .
```

To start a Docker container with the image, run:
```
docker run -p 3000:3000 -d calendly
```

<h2>Technologies Used</h2>
Node.js
TypeScript
Docker
Zod
Swagger
OAuth2
Google Calendar API
