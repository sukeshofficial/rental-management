import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  logout,
  getMe,
  updateMe,
  forgotPassword,
  resetPassword,
  staffDashboardOverview,
  testCustomerResource,
} from "../controllers/auth.controller.js";
import {
  authenticate,
  requireRole,
} from "../middleware/auth.middleware.js";

const router = Router();

// Rate limiter for authentication endpoints: max 50 requests per 15 mins (generous for tests, protective in prod)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public authentication routes
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", authenticate, logout);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

// Authenticated current-user routes
router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, updateMe);

// Internal staff management routes (Protected by authentication + requireRole)
router.get("/staff/dashboard", authenticate, requireRole("internal_staff"), staffDashboardOverview);

// Customer-isolated resource demonstration route (Protected by authentication + ownership check)
router.get("/customer-resource/:ownerId", authenticate, testCustomerResource);

export default router;
