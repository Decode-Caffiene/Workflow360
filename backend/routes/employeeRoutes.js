import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deactivateEmployee,
} from "../controllers/EmployeeController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", authorizeRoles("ADMIN"), createEmployee);
router.get("/", authorizeRoles("ADMIN", "MANAGER"), getEmployees);
router.get(
  "/:id",
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE"),
  getEmployeeById,
);
router.put("/:id", authorizeRoles("ADMIN", "MANAGER"), updateEmployee);
router.put("/:id/deactivate", authorizeRoles("ADMIN"), deactivateEmployee);

export default router;
