// 📂 src/controllers/loanController.ts
import { Request, Response } from "express";
import Loan from "../models/Loan";
import cloudinary from "../utils/cloudinary";
import { sendApplicationConfirmation, sendApprovalEmail, sendRejectionEmail } from "../utils/emailService";
import { saveOtp, verifyOtp } from "../utils/otpStore";
import { sendOtpEmail } from "../utils/emailService";

// ✅ Create Loan Application
export const createLoan = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      dob,
      houseAddress,
      workAddress,
      loanAmount,
      loanType,
      loanDuration,
    } = req.body;

    // ✅ Ensure files exist
    if (!req.files) {
      return res.status(400).json({ message: "All ID and SSN files are required" });
    }

const files = req.files as { [fieldname: string]: Express.Multer.File[] };
if (!files.idFront || !files.idBack || !files.ssnFront) {
  return res.status(400).json({ message: "ID Front, ID Back, and SSN Front are required" });
}

    // ✅ Helper function for Cloudinary uploads
    const uploadBuffer = (file: Express.Multer.File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "loanApp" },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload error:", error);
              return reject(error);
            }
            if (!result?.secure_url) {
              return reject(new Error("Cloudinary did not return a URL"));
            }
            resolve(result.secure_url);
          }
        );
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
    const newLoan = new Loan({
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
sendApplicationConfirmation(email, fullName, loanAmount, loanType)
  .then(() => console.log("📧 Confirmation email sent successfully"))
  .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));

} catch (error: any) {
  console.error("❌ Loan creation error:", error);
  res.status(500).json({
    success: false,
    message: "Server error during loan creation",
    error: error.message || error,
  });
}
};

// ✅ Get all loans (Admin View)
export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All loan applications retrieved successfully",
      count: loans.length,
      loans,
    });
  } catch (error: any) {
    console.error("❌ Error fetching loans:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching loans",
      error: error.message || error,
    });
  }
};


export const sendOtp = async (req: Request, res: Response) => {
  const { email, fullName } = req.body;
  if (!email || !fullName)
    return res.status(400).json({ success: false, message: "Email and name required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOtp(email, otp);

  try {
    await sendOtpEmail(email, fullName, otp);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err: any) {
    console.error("❌ OTP email error:", err?.message || err);
    console.error("❌ Full error:", JSON.stringify(err, null, 2));
    res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP",
      error: err?.message 
    });
  }
};

// ✅ Verify OTP
export const verifyOtpRoute = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const isValid = verifyOtp(email, otp);
  if (!isValid)
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

  res.json({ success: true, message: "OTP verified successfully" });
};

// ✅ Update Loan Status (Admin Only)
export const updateLoanStatus = async (req: Request, res: Response) => {
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
    const loan = await Loan.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

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
  sendApprovalEmail(loan.email, loan.fullName, loan.loanAmount, loan.loanType, loan.loanDuration.toString())
    .then(() => console.log("📧 Approval email sent successfully"))
    .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));
} else if (status === "rejected") {
  sendRejectionEmail(loan.email, loan.fullName, loan.loanAmount, loan.loanType)
    .then(() => console.log("📧 Rejection email sent successfully"))
    .catch((emailError) => console.error("⚠️ Email sending failed:", emailError));
}

    res.status(200).json({
      success: true,
      message: `Loan status updated to ${status}`,
      loan,
    });
  } catch (error: any) {
    console.error("❌ Error updating loan status:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating loan status",
      error: error.message || error,
    });
  }
};

// ✅ Delete Loan (Admin Only)
export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ✅ Find and delete loan
    const loan = await Loan.findByIdAndDelete(id);

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
  } catch (error: any) {
    console.error("❌ Error deleting loan:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting loan",
      error: error.message || error,
    });
  }
};