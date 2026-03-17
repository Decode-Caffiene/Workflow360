import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} from "../controllers/LeaveController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", authorizeRoles("EMPLOYEE"), applyLeave);
router.get("/my", authorizeRoles("EMPLOYEE"), getMyLeaves);
router.get("/", authorizeRoles("ADMIN", "MANAGER"), getAllLeaves);
router.put("/:id/approve", authorizeRoles("ADMIN", "MANAGER"), approveLeave);
router.put("/:id/reject", authorizeRoles("ADMIN", "MANAGER"), rejectLeave);

export default router;