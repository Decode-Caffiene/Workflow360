import express from "express";
import {
  createTask,
  getTasksByProject,
  getMyTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getPrioritizedTasks
} from "../controllers/TaskController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", authorizeRoles("ADMIN", "MANAGER"), createTask);
router.get("/my", authorizeRoles("EMPLOYEE", "FREELANCER"), getMyTasks);
router.get("/prioritized", authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"), getPrioritizedTasks);
router.get("/project/:projectId", authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"), getTasksByProject);
router.put("/:id/status", authorizeRoles("EMPLOYEE", "FREELANCER", "MANAGER", "ADMIN"), updateTaskStatus);
router.put("/:id", authorizeRoles("ADMIN", "MANAGER"), updateTask);
router.delete("/:id", authorizeRoles("ADMIN", "MANAGER"), deleteTask);

export default router;