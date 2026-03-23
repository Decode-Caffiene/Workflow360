import Freelance from "../models/Freelancer.js";

export const createFreelancer = async (req, res) => {

  try {

    const freelancer = await Freelance.create(req.body);

    res.status(201).json({
      message: "Freelancer created",
      freelancer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


export const getFreelancers = async (req, res) => {

  try {

    const freelancers = await Freelance
      .find()
      .populate("userId");

    res.json(freelancers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

export const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelance
      .findById(req.params.id)
      .populate("userId");

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const matchFreelancersToProject = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: "Skills are required" });
    }

    const freelancers = await Freelance.find({
      skills: { $in: skills }
    });

    res.json({
      message: "Matching freelancers fetched",
      freelancers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFreelancer = async (req, res) => {

  try {

    const freelancer = await Freelance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Freelancer updated",
      freelancer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


export const deleteFreelancer = async (req, res) => {

  try {

    await Freelance.findByIdAndDelete(req.params.id);

    res.json({ message: "Freelancer deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};