// 📂 src/middleware/authAdmin.ts
import { Request, Response, NextFunction } from "express";

export const verifyAdminKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const providedKey = req.headers["x-api-key"];

    if (!providedKey) {
      return res.status(401).json({ success: false, message: "API key required" });
    }

    if (providedKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ success: false, message: "Invalid API key" });
    }

    next(); // ✅ Allow access
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error verifying admin" });
  }
};

