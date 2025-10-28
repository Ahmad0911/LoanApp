import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// ✅ Use memory storage for direct Cloudinary uploads
const storage = multer.memoryStorage();

// ✅ File filter (only images allowed)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB per file
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname);
      (error as any).message = "Only image files are allowed!";
      cb(error);
    }
  },
});

// ✅ Predefined upload for loan routes
export const loanFilesUpload = upload.fields([
  { name: "idFront", maxCount: 1 },
  { name: "idBack", maxCount: 1 },
  { name: "ssnFront", maxCount: 1 },
  { name: "ssnBack", maxCount: 1 },
]);

export default upload;
