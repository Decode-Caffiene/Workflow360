import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  totalHours: { type: Number, default: 0 },
  amount: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
    default: "PENDING"
  }
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
