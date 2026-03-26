import express from "express";
import {
  getDashboardStats,
  getPerformanceReport,
  getProductivityInsights,
  getTeamPerformanceLeaderboard,
  downloadAttendanceReport,
  downloadPerformanceReport
} from "../controllers/AnalyticsController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

// Dashboard — all roles see their own view
router.get("/dashboard",
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"),
  getDashboardStats
);

// Performance report — management only
router.get("/performance",
  authorizeRoles("ADMIN", "MANAGER"),
  getPerformanceReport
);

// Individual productivity insights (Algorithm 2)
// ADMIN/MANAGER can view anyone; EMPLOYEE/FREELANCER only see themselves
// (ownership check is in the controller)
router.get("/productivity/:userId",
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"),
  getProductivityInsights
);

// Team leaderboard with Z-score anomaly flags (Algorithm 2 — batch)
router.get("/team-performance",
  authorizeRoles("ADMIN", "MANAGER"),
  getTeamPerformanceLeaderboard
);

// PDF report downloads
router.get("/report/attendance/:employeeId",
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE"),
  downloadAttendanceReport
);

router.get("/report/performance/:userId",
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"),
  downloadPerformanceReport
);

export default router;