const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  month: String,
  grossSalary: Number,
  deductions: Number,
  netSalary: Number
}, { timestamps: true });

module.exports = mongoose.model("Payroll", payrollSchema);
