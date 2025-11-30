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
    origin: "https://sterling-financials.netlify.app", // exact frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true, // ✅ must be true since frontend uses 'credentials: include'
  })
);

app.use(express.json());
app.use("/api/loans", loanRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Loan backend API is running successfully!");
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
