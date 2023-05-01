// Load environment variables
require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ZodError } = require("zod");

const { userRouter } = require("./routes/user.routes");

// Passport setup
const passportSetup = require("./utils/OAuthConfig");

// Express server setup and configure port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set up swagger docs and UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth/google", userRouter);

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
