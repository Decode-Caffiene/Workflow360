import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  date: Date,
  clockIn: Date,
  clockOut: Date
}, { timestamps: true });

const Attendance=mongoose.model('Attendance',attendanceSchema);
export default Attendance;