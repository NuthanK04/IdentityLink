import express from "express";
import cors from "cors";
import identifyRoutes from "./routes/identify.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", identifyRoutes);

app.get("/", (_req, res) => {
  res.send("🚀 IdentityLink Backend is running...");
});

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// These handlers help us see if something is shutting down the process
process.on("SIGINT", () => {
  console.log("Server shutting down...");
  server.close(() => process.exit(0));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});