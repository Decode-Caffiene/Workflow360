import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  assignFreelancer,
  deleteProject
} from "../controllers/ProjectController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", authorizeRoles("ADMIN", "MANAGER"), createProject);
router.get("/", authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"), getProjects);
router.get("/:id", authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE", "FREELANCER"), getProjectById);
router.put("/:id", authorizeRoles("ADMIN", "MANAGER"), updateProject);
router.post("/:id/assign", authorizeRoles("ADMIN", "MANAGER"), assignFreelancer);
router.delete("/:id", authorizeRoles("ADMIN"), deleteProject);

export default router;