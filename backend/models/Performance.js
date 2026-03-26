import mongoose from "mongoose";

export const performanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: String,
  period: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("PerformanceReview", performanceSchema);
