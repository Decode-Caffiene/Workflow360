import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hourlyRate: Number,
  skills: [String],
  portfolioUrl: String,
  timezone: String
}, { timestamps: true });

const Freelancer=mongoose.model("Freelancer",freelancerSchema);
export default Freelancer;
