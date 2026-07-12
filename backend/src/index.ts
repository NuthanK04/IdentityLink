import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (_req, res) => {
  res.send("🚀 IdentityLink Backend is running...");
});

// Health Route
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});