import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { name, budget, deadline, freelancers, description } = req.body;

    if (!name || !deadline) {
      return res.status(400).json({ message: "name and deadline are required" });
    }

    const project = await Project.create({
      name,
      description,
      budget,
      deadline,
      freelancers: freelancers || [],
      manager: req.user.id,
      status: "ACTIVE"
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) filter.status = status;

    if (req.user.role === "FREELANCER") {
      filter.freelancers = req.user.id;
    }

    const projects = await Project
      .find(filter)
      .populate("manager", "-password")
      .populate("freelancers", "-password")
      .sort({ deadline: 1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project
      .findById(req.params.id)
      .populate("manager", "-password")
      .populate("freelancers", "-password");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { freelancers: freelancerId } },
      { new: true }
    ).populate("freelancers", "-password");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Freelancer assigned to project", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};