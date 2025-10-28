import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import loanRoutes from "./routes/loanRoutes";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/loans", loanRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Loan backend API is running successfully!");
});

app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
