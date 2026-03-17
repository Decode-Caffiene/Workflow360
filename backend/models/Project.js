import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  deadline: Date,
  freelancers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
