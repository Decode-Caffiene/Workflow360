import express from "express";
import {
  logTime,
  getMyTimesheets,
  getAllTimesheets,
  approveTimesheet
} from "../controllers/TimesheetController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", authorizeRoles("FREELANCER"), logTime);
router.get("/my", authorizeRoles("FREELANCER"), getMyTimesheets);
router.get("/", authorizeRoles("ADMIN", "MANAGER"), getAllTimesheets);
router.put("/:id/approve", authorizeRoles("ADMIN", "MANAGER"), approveTimesheet);

export default router;