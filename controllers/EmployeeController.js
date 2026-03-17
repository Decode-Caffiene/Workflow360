import Employee from "../models/Employee.js";
import User from "../models/User.js";

export const createEmployee = async (req, res) => {
  try {
    const { userId, employeeCode, department, designation, salary, joiningDate, phone, emergencyContact } = req.body;

    if (!userId || !employeeCode) {
      return res.status(400).json({ message: "userId and employeeCode are required" });
    }

    const employee = await Employee.create({
      userId, employeeCode, department, designation,
      salary, joiningDate, phone, emergencyContact
    });

    res.status(201).json({ message: "Employee created", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee
      .find()
      .populate("userId", "-password")
      .populate("department")
      .populate("designation");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee
      .findById(req.params.id)
      .populate("userId", "-password")
      .populate("department")
      .populate("designation");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deactivateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await User.findByIdAndUpdate(employee.userId, { isActive: false });

    res.json({ message: "Employee deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};