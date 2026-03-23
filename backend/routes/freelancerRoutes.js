import express from "express";
import {
  createFreelancer,
  getFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
  matchFreelancersToProject
} from "../controllers/FreelancerController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/match", authorizeRoles("ADMIN", "MANAGER"), matchFreelancersToProject);
router.post("/", authorizeRoles("ADMIN", "MANAGER"), createFreelancer);
router.get("/", authorizeRoles("ADMIN", "MANAGER"), getFreelancers);
router.get("/:id", authorizeRoles("ADMIN", "MANAGER", "FREELANCER"), getFreelancerById);
router.put("/:id", authorizeRoles("ADMIN", "MANAGER", "FREELANCER"), updateFreelancer);
router.delete("/:id", authorizeRoles("ADMIN"), deleteFreelancer);

export default router;