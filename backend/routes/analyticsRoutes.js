import express from "express";
import {
  getDashboardStats,
  getPerformanceReport,
  getProductivityInsights
} from "../controllers/AnalyticsController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/dashboard", authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"), getDashboardStats);
router.get("/performance", authorizeRoles("ADMIN", "MANAGER"), getPerformanceReport);
router.get("/productivity/:userId", authorizeRoles("ADMIN", "MANAGER"), getProductivityInsights);

export default router;