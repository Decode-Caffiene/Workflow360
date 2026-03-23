import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeCode: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  salary: Number,
  joiningDate: Date,
  phone: String,
  emergencyContact: String
}, { timestamps: true });

const Employee=mongoose.model("Employee",employeeSchema);
export default Employee;
