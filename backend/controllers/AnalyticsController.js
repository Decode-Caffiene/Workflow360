import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Task from "../models/Task.js";
import Timesheet from "../models/Timesheet.js";
import Project from "../models/Project.js";
import Employee from "../models/Employee.js";
import Freelancer from "../models/Freelancer.js";

// F5.1 & F5.2 — Role-based dashboard analytics
export const getDashboardStats = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role === "ADMIN" || role === "MANAGER") {
      const [
        totalEmployees,
        totalFreelancers,
        totalProjects,
        activeProjects,
        pendingLeaves,
        pendingTimesheets,
        taskStats
      ] = await Promise.all([
        Employee.countDocuments(),
        Freelancer.countDocuments(),
        Project.countDocuments(),
        Project.countDocuments({ status: "ACTIVE" }),
        Leave.countDocuments({ status: "PENDING" }),
        Timesheet.countDocuments({ status: "PENDING" }),
        Task.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ])
      ]);

      const taskSummary = { TODO: 0, IN_PROGRESS: 0, COMPLETED: 0 };
      taskStats.forEach(t => { taskSummary[t._id] = t.count; });

      return res.json({
        totalEmployees,
        totalFreelancers,
        totalProjects,
        activeProjects,
        pendingLeaves,
        pendingTimesheets,
        taskSummary
      });
    }

    if (role === "EMPLOYEE") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [attendance, pendingLeaves, myTasks] = await Promise.all([
        Attendance.findOne({ employee: id, date: { $gte: today } }),
        Leave.countDocuments({ employee: id, status: "PENDING" }),
        Task.countDocuments({ assignee: id, status: { $ne: "COMPLETED" } })
      ]);

      return res.json({
        clockedInToday: !!attendance?.clockIn,
        clockedOutToday: !!attendance?.clockOut,
        pendingLeaves,
        openTasks: myTasks
      });
    }

    if (role === "FREELANCER") {
      const [activeProjects, pendingTimesheets, pendingInvoices, openTasks] = await Promise.all([
        Project.countDocuments({ freelancers: id, status: "ACTIVE" }),
        Timesheet.countDocuments({ freelancer: id, status: "PENDING" }),
        (await import("../models/Invoice.js")).default.countDocuments({ freelancer: id, status: "PENDING" }),
        Task.countDocuments({ assignee: id, status: { $ne: "COMPLETED" } })
      ]);

      return res.json({ activeProjects, pendingTimesheets, pendingInvoices, openTasks });
    }

    res.status(400).json({ message: "Unknown role" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// F5.2 — Employee vs Freelancer performance comparison
export const getPerformanceReport = async (req, res) => {
  try {
    const [employeeTaskStats, freelancerHourStats] = await Promise.all([
      Task.aggregate([
        { $match: { status: "COMPLETED" } },
        { $group: { _id: "$assignee", completedTasks: { $sum: 1 } } },
        { $sort: { completedTasks: -1 } },
        { $limit: 10 }
      ]),
      Timesheet.aggregate([
        { $match: { status: "APPROVED" } },
        { $group: { _id: "$freelancer", totalHours: { $sum: "$hours" } } },
        { $sort: { totalHours: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      topEmployeesByCompletedTasks: employeeTaskStats,
      topFreelancersByHoursLogged: freelancerHourStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// F5.3 — AI productivity insights
export const getProductivityInsights = async (req, res) => {
  try {
    const { userId } = req.params;

    const [tasks, timesheets] = await Promise.all([
      Task.find({ assignee: userId }),
      Timesheet.find({ freelancer: userId, status: "APPROVED" })
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "COMPLETED").length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const overdueTasks = tasks.filter(t =>
      t.deadline && new Date(t.deadline) < new Date() && t.status !== "COMPLETED"
    ).length;

    const totalHours = timesheets.reduce((sum, t) => sum + t.hours, 0);
    const avgHoursPerEntry = timesheets.length > 0
      ? Math.round((totalHours / timesheets.length) * 10) / 10
      : 0;

    let insight = "";
    if (completionRate >= 80) {
      insight = "Excellent performance. High task completion rate.";
    } else if (completionRate >= 50) {
      insight = "Moderate performance. Focus on completing pending tasks.";
    } else {
      insight = "Low completion rate. Review workload and prioritize urgent tasks.";
    }

    if (overdueTasks > 0) {
      insight += ` ${overdueTasks} overdue task(s) need immediate attention.`;
    }

    res.json({
      totalTasks,
      completedTasks,
      completionRate: `${completionRate}%`,
      overdueTasks,
      totalHoursLogged: totalHours,
      avgHoursPerEntry,
      aiInsight: insight
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};