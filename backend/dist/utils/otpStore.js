"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.saveOtp = void 0;
// Temporary in-memory OTP store
const otpStore = new Map();
const saveOtp = (email, otp) => {
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 min expiry
};
exports.saveOtp = saveOtp;
const verifyOtp = (email, otp) => {
    const record = otpStore.get(email);
    if (!record)
        return false;
    if (Date.now() > record.expires) {
        otpStore.delete(email);
        return false;
    }
    if (record.otp !== otp)
        return false;
    otpStore.delete(email); // one-time use
    return true;
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=otpStore.js.map