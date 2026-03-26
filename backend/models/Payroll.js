import mongoose from "mongoose";

export const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  month: { type: String, required: true },
  grossSalary: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
  breakdown: {
    totalDaysInMonth: Number,
    daysAttended: Number,
    leaveDays: Number,
    lopDays: Number,
    lopDeduction: Number,
    taxDeduction: Number
  }
}, { timestamps: true });

export default mongoose.model("Payroll", payrollSchema);
