

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarPlus, 
  FileText, 
  CheckSquare, 
  Timer, 
  Menu,
  X,
  Bell,
  ChevronRight
} from "lucide-react";

const navItems = [
  { to: "/employee/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employee/leave", label: "Apply for Leave", icon: CalendarPlus },
  { to: "/employee/payslip", label: "View Payslip", icon: FileText },
  { to: "/employee/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/employee/timesheet", label: "Timesheet", icon: Timer },
];

export default function EmployeeLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ── Background Decoration ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `radial-gradient(#1e40af 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      {/* ── Header ── */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* LEFT: Logo Area (Flex-1 keeps it to the left) */}
          <div className="flex-1 flex items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-105 transition-all">
                <span className="text-white font-black text-sm">W</span>
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="text-slate-900 font-black text-[14px] leading-tight tracking-tight">Workforce360</span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Employee Portal</span>
              </div>
            </div>
          </div>

          {/* CENTER: Navigation Links (Natural Center) */}
          <nav className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300
                  ${isActive
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50"
                    : "text-slate-500 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: User Tools & Profile (Flex-1 + justify-end) */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell size={19} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-[13px] font-black text-slate-800 leading-none">Ishan Awasthi</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Employee</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center font-black text-slate-600 text-xs shadow-sm cursor-pointer hover:border-blue-400 transition-colors">
                IA
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-lg ml-2"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl p-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="font-black text-slate-900">Navigation</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20}/></button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold transition-all
                    ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"}`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={14} className="opacity-50" />
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Breadcrumb Indicator */}
        <div className="mb-8 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>Portal</span>
          <ChevronRight size={10} />
          <span className="text-blue-600">Active Session</span>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}