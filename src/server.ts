// Load environment variables
require("dotenv").config();

import express from "express";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../swagger.json";
import bodyParser from "body-parser";
import cors from "cors";
import { ZodError } from "zod";
import availabilityRoutes from "./routes/availability.routes";
import authRoutes from "./routes/auth.routes";
import meetingRoutes from "./routes/meeting.routes";
import authMiddleware from "./middlewares/auth.middleware";

// Express server setup and configure port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Set up swagger docs and UI
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/availability", authMiddleware, availabilityRoutes);
app.use("/api/meeting", authMiddleware, meetingRoutes);

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
