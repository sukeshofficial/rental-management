// src/services/authService.js
import api from "@/api/api";

/**
 * Login with email + password.
 * Response: { message, user }
 */
export async function login(email, password) {
    const { data } = await api.post("/api/auth/login", { email, password });
    return data;
}

/**
 * Register a new account with email + password.
 * Response: { message, userDetails }
 */
export async function signup(email, password, avatarFile) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile-avatar", avatarFile);
    const { data } = await api.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

/**
 * Logout the current session (clears cookie server-side).
 * Response: { message }
 */
export async function logout() {
    const { data } = await api.post("/api/auth/logout");
    return data;
}

/**
 * Verify the OTP sent to email after signup or login if unverified.
 * Response: { message, userDetails }
 */
export async function verifyOTP(email, otp) {
    const { data } = await api.post("/api/auth/verify-otp", { email, otp });
    return data;
}

/**
 * Resend OTP to the given email.
 * Response: { message }
 */
export async function resendOTP(email) {
    const { data } = await api.post("/api/auth/resend-verify-otp", { email });
    return data;
}

/**
 * Request password reset instructions to email.
 * Response: { message }
 */
export async function forgotPassword(email) {
    const { data } = await api.post("/api/auth/forgot-password", { email });
    return data;
}

/**
 * Reset password using token and new password.
 * Response: { message }
 */
export async function resetPassword(email, token, newPassword) {
    const { data } = await api.post("/api/auth/reset-password", { email, reset_token: token, newPassword });
    return data;
}

/**
 * Fetch a user's profile preview using their email.
 * GET /api/auth/user-preview?email=...
 */
export async function getUserPreview(email) {
    const { data } = await api.get("/api/auth/user-preview", {
        params: { email },
    });

    return data;
}