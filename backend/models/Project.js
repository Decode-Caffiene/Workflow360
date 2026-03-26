import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  budget: Number,
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED", "ON_HOLD", "CANCELLED"],
    default: "ACTIVE"
  },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requiredSkills: [String],
  freelancers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
