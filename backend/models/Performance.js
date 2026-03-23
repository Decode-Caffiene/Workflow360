const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  feedback: String,
  period: String
}, { timestamps: true });

module.exports = mongoose.model("PerformanceReview", performanceSchema);
