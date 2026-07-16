"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const loanRoutes_1 = __importDefault(require("./routes/loanRoutes"));
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: [
        "https://sterling-financials.pages.dev",
        "https://bd3e4bb1.sterling-financials.pages.dev",
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/loans", loanRoutes_1.default);
app.get("/", (req, res) => {
    res.send("🚀 Loan backend API is running successfully!");
});
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
//# sourceMappingURL=index.js.map