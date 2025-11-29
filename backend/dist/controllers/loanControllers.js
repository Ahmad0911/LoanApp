"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoan = exports.updateLoanStatus = exports.getAllLoans = exports.createLoan = void 0;
const Loan_1 = __importDefault(require("../models/Loan"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const emailService_1 = require("../utils/emailService");
// ✅ Create Loan Application
const createLoan = async (req, res) => {
    try {
        const { fullName, email, phone, dob, houseAddress, workAddress, loanAmount, loanType, loanDuration, } = req.body;
        // ✅ Ensure files exist
        if (!req.files) {
            return res.status(400).json({ message: "All ID and SSN files are required" });
        }
        const files = req.files;
        if (!files.idFront || !files.idBack || !files.ssnFront) {
            return res.status(400).json({ message: "ID Front, ID Back, and SSN Front are required" });
        }
        // ✅ Helper function for Cloudinary uploads
        const uploadBuffer = (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ folder: "loanApp" }, (error, result) => {
                    if (error) {
                        console.error("❌ Cloudinary upload error:", error);
                        return reject(error);
                    }
                    if (!result?.secure_url) {
                        return reject(new Error("Cloudinary did not return a URL"));
                    }
                    resolve(result.secure_url);
                });
                stream.end(file.buffer);
            });
        };
        // ✅ Upload all files to Cloudinary
        console.log("📤 Uploading files to Cloudinary...");
        const [idFrontUrl, idBackUrl, ssnFrontUrl] = await Promise.all([
            uploadBuffer(files.idFront[0]),
            uploadBuffer(files.idBack[0]),
            uploadBuffer(files.ssnFront[0]),
        ]);
        // Upload SSN back only if provided
        const ssnBackUrl = files.ssnBack ? await uploadBuffer(files.ssnBack[0]) : "";
        console.log("✅ All files uploaded successfully");
        // ✅ Create a new loan record
        const newLoan = new Loan_1.default({
            fullName,
            email,
            phone,
            dob,
            houseAddress,
            workAddress,
            idFront: idFrontUrl,
            idBack: idBackUrl,
            ssnFront: ssnFrontUrl,
            ssnBack: ssnBackUrl,
            loanAmount,
            loanType,
            loanDuration,
        });
        await newLoan.save();
        console.log("✅ Loan saved successfully");
        // ✅ Respond immediately to user
        res.status(201).json({
            success: true,
            message: "Loan application submitted successfully",
            loan: newLoan,
        });
        // ✅ Send confirmation email in background (non-blocking)
        (0, emailService_1.sendApplicationConfirmation)(email, fullName, loanAmount, loanType)
            .then(() => console.log("📧 Confirmation email sent successfully"))
            .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));
    }
    catch (error) {
        console.error("❌ Loan creation error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during loan creation",
            error: error.message || error,
        });
    }
};
exports.createLoan = createLoan;
// ✅ Get all loans (Admin View)
const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All loan applications retrieved successfully",
            count: loans.length,
            loans,
        });
    }
    catch (error) {
        console.error("❌ Error fetching loans:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching loans",
            error: error.message || error,
        });
    }
};
exports.getAllLoans = getAllLoans;
// ✅ Update Loan Status (Admin Only)
const updateLoanStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // ✅ Validate status
        const validStatuses = ["pending", "approved", "rejected"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }
        // ✅ Find and update loan
        const loan = await Loan_1.default.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan application not found",
            });
        }
        console.log(`✅ Loan ${id} status updated to: ${status}`);
        // ✅ Respond immediately to user
        res.status(200).json({
            success: true,
            message: `Loan status updated to ${status}`,
            loan,
        });
        // ✅ Send email notification in background (non-blocking)
        if (status === "approved") {
            (0, emailService_1.sendApprovalEmail)(loan.email, loan.fullName, loan.loanAmount, loan.loanType, loan.loanDuration.toString())
                .then(() => console.log("📧 Approval email sent successfully"))
                .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));
        }
        else if (status === "rejected") {
            (0, emailService_1.sendRejectionEmail)(loan.email, loan.fullName, loan.loanAmount, loan.loanType)
                .then(() => console.log("📧 Rejection email sent successfully"))
                .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));
        }
        res.status(200).json({
            success: true,
            message: `Loan status updated to ${status}`,
            loan,
        });
    }
    catch (error) {
        console.error("❌ Error updating loan status:", error);
        res.status(500).json({
            success: false,
            message: "Server error updating loan status",
            error: error.message || error,
        });
    }
};
exports.updateLoanStatus = updateLoanStatus;
// ✅ Delete Loan (Admin Only)
const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;
        // ✅ Find and delete loan
        const loan = await Loan_1.default.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan application not found",
            });
        }
        console.log(`✅ Loan ${id} deleted successfully`);
        res.status(200).json({
            success: true,
            message: "Loan application deleted successfully",
            deletedLoan: loan,
        });
    }
    catch (error) {
        console.error("❌ Error deleting loan:", error);
        res.status(500).json({
            success: false,
            message: "Server error deleting loan",
            error: error.message || error,
        });
    }
};
exports.deleteLoan = deleteLoan;
//# sourceMappingURL=loanControllers.js.map