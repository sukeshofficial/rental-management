import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";
import testInputRoutes from "./routes/testInput.routes.js";

const app = express();

// Security and middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Ensure DB connection for every request (essential for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// API routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/test-input", testInputRoutes);


// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;