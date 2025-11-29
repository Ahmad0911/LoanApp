"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 📂 src/routes/loanRoutes.ts
const express_1 = __importDefault(require("express"));
const loanControllers_1 = require("../controllers/loanControllers");
const upload_1 = __importDefault(require("../middleware/upload"));
const authAdmin_1 = require("../middleware/authAdmin");
const router = express_1.default.Router();
// ✅ User: Apply for a loan
router.post("/apply", upload_1.default.fields([
    { name: "idFront", maxCount: 1 },
    { name: "idBack", maxCount: 1 },
    { name: "ssnFront", maxCount: 1 },
    { name: "ssnBack", maxCount: 1 },
]), loanControllers_1.createLoan);
// ✅ Admin: View all loan applications (Protected)
router.get("/", authAdmin_1.verifyAdminKey, loanControllers_1.getAllLoans);
// ✅ Admin: Update loan status (Protected)
router.patch("/:id/status", authAdmin_1.verifyAdminKey, loanControllers_1.updateLoanStatus);
// ✅ Admin: Delete a loan application (Protected)
router.delete("/:id", authAdmin_1.verifyAdminKey, loanControllers_1.deleteLoan);
exports.default = router;
//# sourceMappingURL=loanRoutes.js.map