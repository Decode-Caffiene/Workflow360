import Task from "../models/Task.js";

// F4.4 — AI Task Priority Scoring
const calculatePriorityScore = (task) => {
  const now = new Date();
  const deadline = new Date(task.deadline);
  const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);

  const priorityWeight = { URGENT: 40, HIGH: 30, MEDIUM: 20, LOW: 10 };
  const urgencyWeight = daysLeft <= 1 ? 50 : daysLeft <= 3 ? 35 : daysLeft <= 7 ? 20 : 5;
  const statusWeight = task.status === "TODO" ? 10 : task.status === "IN_PROGRESS" ? 5 : 0;

  return (priorityWeight[task.priority] || 0) + urgencyWeight + statusWeight;
};

export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignee, priority, deadline, tags } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "title and project are required" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      createdBy: req.user.id,
      priority: priority || "MEDIUM",
      deadline,
      tags: tags || [],
      status: "TODO"
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = { project: req.params.projectId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task
      .find(filter)
      .populate("assignee", "-password")
      .populate("createdBy", "-password")
      .sort({ deadline: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task
      .find({ assignee: req.user.id, status: { $ne: "COMPLETED" } })
      .populate("project", "name deadline")
      .sort({ deadline: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// F4.4 — AI-powered task prioritization
export const getPrioritizedTasks = async (req, res) => {
  try {
    const filter = { status: { $ne: "COMPLETED" } };

    if (req.user.role === "EMPLOYEE" || req.user.role === "FREELANCER") {
      filter.assignee = req.user.id;
    }

    const tasks = await Task
      .find(filter)
      .populate("assignee", "name")
      .populate("project", "name");

    const prioritized = tasks
      .map(task => ({
        ...task.toObject(),
        aiPriorityScore: task.deadline ? calculatePriorityScore(task) : 0
      }))
      .sort((a, b) => b.aiPriorityScore - a.aiPriorityScore);

    res.json({ message: "Tasks ranked by AI priority score", tasks: prioritized });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};