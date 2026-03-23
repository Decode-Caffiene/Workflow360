import express from "express";
import authRoutes from "./authRoutes.js";
import attendanceRoutes from "./attendanceRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import freelancerRoutes from "./freelancerRoutes.js";
import leaveRoutes from "./leaveRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";
import timesheetRoutes from "./timesheetRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/employees", employeeRoutes);
router.use("/freelancers", freelancerRoutes);
router.use("/leaves", leaveRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/timesheets", timesheetRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/analytics", analyticsRoutes);

export default router;