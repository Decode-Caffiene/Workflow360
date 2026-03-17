import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  hours: Number,
  date: Date,
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

export default mongoose.model("Timesheet", timesheetSchema);
