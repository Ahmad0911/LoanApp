// Temporary in-memory OTP store
const otpStore = new Map<string, { otp: string; expires: number }>();

export const saveOtp = (email: string, otp: string) => {
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // 5 min expiry
};

export const verifyOtp = (email: string, otp: string): boolean => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expires) { otpStore.delete(email); return false; }
  if (record.otp !== otp) return false;
  otpStore.delete(email); // one-time use
  return true;
};