// 📂 src/routes/loanRoutes.ts
import express from "express";
import { createLoan, getAllLoans, updateLoanStatus, deleteLoan } from "../controllers/loanControllers";
import upload from "../middleware/upload";
import { verifyAdminKey } from "../middleware/authAdmin";

const router = express.Router();

// ✅ User: Apply for a loan
router.post(
  "/apply",
  upload.fields([
    { name: "idFront", maxCount: 1 },
    { name: "idBack", maxCount: 1 },
    { name: "ssnFront", maxCount: 1 },
    { name: "ssnBack", maxCount: 1 },
  ]),
  createLoan
);

// ✅ Admin: View all loan applications (Protected)
router.get("/", verifyAdminKey, getAllLoans);

// ✅ Admin: Update loan status (Protected)
router.patch("/:id/status", verifyAdminKey, updateLoanStatus);

// ✅ Admin: Delete a loan application (Protected)
router.delete("/:id", verifyAdminKey, deleteLoan);

export default router;