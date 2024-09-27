import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";

// Use CORS middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

import appRoute from "./routes/index.js";

// define route
app.use("/", appRoute);
export default app;
