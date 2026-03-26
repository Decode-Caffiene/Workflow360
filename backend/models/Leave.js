import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  type: { type: String, enum: ["SICK", "CASUAL", "VACATION"] },
  from: Date,
  to: Date,
  reason: String,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String
}, { timestamps: true });

export default mongoose.model("Leave", leaveSchema);