const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const { ZodError } = require("zod");

const { userRouter } = require("./routes/user");

// Load environment variables
require("dotenv").config();

// Express server setup and configure port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Google OAuth2
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google Calendar API
const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

// Set up swagger docs and UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/user", userRouter);

// Internal server error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export {};
