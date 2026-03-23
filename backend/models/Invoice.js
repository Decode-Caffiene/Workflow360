import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  amount: Number,
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
