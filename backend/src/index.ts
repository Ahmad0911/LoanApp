import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import loanRoutes from "./routes/loanRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://sterling-financials.netlify.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/loans", loanRoutes);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Loan backend API is running successfully!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
