import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login            from "./pages/Login";
import EmployeeDashboard from "./pages/employee/Dashboard";
import ApplyLeave        from "./pages/employee/ApplyLeave";
import ViewPayslip from "./pages/employee/Payslip";
import MyTasks from "./pages/employee/MyTaskPage";
import Timesheet from "./pages/employee/Timesheet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<Login />} />
        <Route path="/employee/dashboard"    element={<EmployeeDashboard />} />
        <Route path="/employee/leave"        element={<ApplyLeave />} />
        <Route path="/employee/payslip"      element={<ViewPayslip />} />
        <Route path="/employee/tasks"        element={<MyTasks />} />
        <Route path="/employee/timesheet"    element={<Timesheet />} />


        <Route path="*"                      element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
