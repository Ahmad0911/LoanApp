"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanFilesUpload = void 0;
const multer_1 = __importDefault(require("multer"));
// ✅ Use memory storage for direct Cloudinary uploads
const storage = multer_1.default.memoryStorage();
// ✅ File filter (only images allowed)
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB per file
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            const error = new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname);
            error.message = "Only image files are allowed!";
            cb(error);
        }
    },
});
// ✅ Predefined upload for loan routes
exports.loanFilesUpload = upload.fields([
    { name: "idFront", maxCount: 1 },
    { name: "idBack", maxCount: 1 },
    { name: "ssnFront", maxCount: 1 },
    { name: "ssnBack", maxCount: 1 },
]);
exports.default = upload;
//# sourceMappingURL=upload.js.map