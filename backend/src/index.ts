import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import loanRoutes from "./routes/loanRoutes";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://sterling-financials.pages.dev",
      "https://bd3e4bb1.sterling-financials.pages.dev",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/loans", loanRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Loan backend API is running successfully!");
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));