import Freelancer from "../models/Freelancer.js";
import Project from "../models/Project.js";
import { rankFreelancers } from "../services/tfidfService.js";

export const createFreelancer = async (req, res) => {
  try {
    const { userId, hourlyRate, skills, portfolioUrl, timezone } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "At least one skill is required" });
    }

    const freelancer = await Freelancer.create({
      userId, hourlyRate, skills, portfolioUrl, timezone
    });

    res.status(201).json({ message: "Freelancer created", freelancer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find().populate("userId", "-password");
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id).populate("userId", "-password");
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFreelancer = async (req, res) => {
  try {
    // Ownership guard: freelancers can only update their own profile
    if (req.user.role === "FREELANCER") {
      const freelancer = await Freelancer.findById(req.params.id);
      if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
      }
      if (freelancer.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "You can only update your own profile" });
      }
    }

    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Freelancer updated", freelancer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFreelancer = async (req, res) => {
  try {
    await Freelancer.findByIdAndDelete(req.params.id);
    res.json({ message: "Freelancer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// AI SKILL MATCHING  (Algorithm 1: TF-IDF + Cosine Similarity)
// POST /api/freelancers/match
//
// Body option A — match by projectId (uses project's name + description + skills)
//   { projectId: "...", topN: 5, minScore: 0.2 }
//
// Body option B — match by raw job description + skills list
//   { description: "...", requiredSkills: ["React","Node"], topN: 5, minScore: 0.2 }
// ─────────────────────────────────────────────────────────────────────────────
export const matchFreelancersToProject = async (req, res) => {
  try {
    const { projectId, description, requiredSkills, topN = 10, minScore } = req.body;
    const parsedTopN = Number.isFinite(Number(topN)) && Number(topN) > 0
      ? Math.min(Math.floor(Number(topN)), 50)
      : 10;

    let job = { description: "", requiredSkills: [] };

    if (projectId) {
      // Load from DB — uses actual project data
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      job = {
        description    : `${project.name || ""} ${project.description || ""}`,
        requiredSkills : project.requiredSkills || []
      };
    } else {
      // Manual input
      if (!description && (!requiredSkills || requiredSkills.length === 0)) {
        return res.status(400).json({
          message: "Provide either projectId or description/requiredSkills"
        });
      }
      job = { description: description || "", requiredSkills: requiredSkills || [] };
    }

    if (minScore !== undefined && (!Number.isFinite(Number(minScore)) || Number(minScore) < 0 || Number(minScore) > 1)) {
      return res.status(400).json({ message: "minScore must be a number between 0 and 1" });
    }

    // Fetch all freelancers
    const freelancers = await Freelancer.find().populate("userId", "name email");

    if (freelancers.length === 0) {
      return res.json({ message: "No freelancers found", matches: [] });
    }

    // Run TF-IDF + Cosine Similarity ranking
    const ranked = rankFreelancers({ ...job, minScore }, freelancers, parsedTopN);

    res.json({
      message       : "Freelancers ranked by AI skill matching",
      jobDescription: job.description,
      requiredSkills: job.requiredSkills,
      totalCandidates: freelancers.length,
      minScore      : minScore !== undefined ? Number(minScore) : 0.15,
      topN          : ranked.length,
      matches       : ranked
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
