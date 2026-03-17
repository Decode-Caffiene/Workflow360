import Timesheet from "../models/Timesheet.js";

export const logTime = async (req, res) => {
  try {
    const { project, hours, date } = req.body;

    if (!project || !hours || !date) {
      return res.status(400).json({ message: "project, hours, and date are required" });
    }

    if (hours <= 0 || hours > 24) {
      return res.status(400).json({ message: "Hours must be between 0 and 24" });
    }

    const timesheet = await Timesheet.create({
      freelancer: req.user.id,
      project,
      hours,
      date,
      status: "PENDING"
    });

    res.status(201).json({ message: "Time logged", timesheet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTimesheets = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = { freelancer: req.user.id };
    if (projectId) filter.project = projectId;

    const timesheets = await Timesheet
      .find(filter)
      .populate("project", "name deadline")
      .sort({ date: -1 });

    res.json(timesheets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTimesheets = async (req, res) => {
  try {
    const { freelancerId, projectId, status } = req.query;
    const filter = {};

    if (freelancerId) filter.freelancer = freelancerId;
    if (projectId) filter.project = projectId;
    if (status) filter.status = status;

    const timesheets = await Timesheet
      .find(filter)
      .populate("freelancer")
      .populate("project", "name")
      .sort({ date: -1 });

    res.json(timesheets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveTimesheet = async (req, res) => {
  try {
    const timesheet = await Timesheet.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED" },
      { new: true }
    );

    if (!timesheet) {
      return res.status(404).json({ message: "Timesheet not found" });
    }

    res.json({ message: "Timesheet approved", timesheet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};