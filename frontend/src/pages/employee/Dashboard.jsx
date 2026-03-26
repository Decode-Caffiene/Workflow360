import { useState, useEffect } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { 
  Clock, 
  Settings, 
  CalendarCheck, 
  Briefcase, 
  CheckCircle2, 
  ArrowUpRight,
  Zap,
  MapPin,
  ShieldCheck
} from "lucide-react";

const StatCard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
        <Icon size={22} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="flex items-center gap-1 text-slate-300 group-hover:text-blue-500 transition-colors">
        <span className="text-[10px] font-bold uppercase tracking-tighter">View Details</span>
        <ArrowUpRight size={14} />
      </div>
    </div>
    <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      {sub && <p className="text-xs text-slate-400 font-medium">{sub}</p>}
    </div>
    {/* Animated Bottom Border */}
    <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full ${color}`} />
  </div>
);

export default function EmployeeDashboard() {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [hoursToday, setHoursToday] = useState(0);
  const [loading, setLoading] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!clockedIn || !clockInTime) return;
    const t = setInterval(() => {
      const diff = (Date.now() - clockInTime) / 3600000;
      setHoursToday(+diff.toFixed(2));
    }, 5000);
    return () => clearInterval(t);
  }, [clockedIn, clockInTime]);

  const handleClockIn = async () => {
    setLoading(true);
    setTimeout(() => {
      setClockedIn(true);
      setClockInTime(Date.now());
      setLoading(false);
    }, 800);
  };

  const handleClockOut = async () => {
    setLoading(true);
    setTimeout(() => {
      setClockedIn(false);
      setLoading(false);
    }, 800);
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  return (
    <EmployeeLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Hello, Ishan <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-slate-500 font-medium">
              You have <span className="text-blue-600 font-bold">4 pending tasks</span> for today.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Office Location</span>
              <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <MapPin size={14} className="text-blue-500" /> Kathmandu, NP
              </span>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 hidden sm:block mx-2" />
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
               <span className="text-slate-700 text-sm font-black tracking-tight">
                 {liveTime.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
               </span>
            </div>
          </div>
        </div>

        {/* ── Main Layout Grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* User Sidebar Profile */}
          <div className="xl:col-span-1 bg-white border border-slate-100 rounded-3xl shadow-sm p-8 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-50 to-indigo-50" />
            
            <div className="relative z-10 group mt-4">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 p-1.5 shadow-xl shadow-blue-200 transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                   <span className="text-blue-600 font-black text-3xl tracking-tighter">RS</span>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-7 h-7 bg-emerald-500 border-4 border-white rounded-xl shadow-lg flex items-center justify-center">
                <ShieldCheck size={12} className="text-white" />
              </div>
            </div>

            <div className="mt-6 text-center z-10">
              <h2 className="text-xl font-black text-slate-800 leading-none">Ishan Awasthi</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Employee</p>
              </div>
            </div>

            <div className="w-full space-y-2 mt-8 z-10">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Dept</span>
                <span className="text-xs font-black text-blue-600">Engineering</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">ID</span>
                <span className="text-xs font-black text-slate-700">WF-2026-001</span>
              </div>
            </div>

            <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
              <Settings size={14} /> Manage Account
            </button>
          </div>

          {/* Clocking System Container */}
          <div className="xl:col-span-3 bg-slate-950 rounded-3xl p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[420px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    Shift Control Center
                  </span>
                  {clockedIn && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                    </span>
                  )}
                </div>
                <h3 className="text-white text-6xl font-black tracking-tighter">
                  {formatTime(liveTime).split(' ')[0]}
                  <span className="text-slate-600 text-2xl ml-3 font-medium uppercase">{formatTime(liveTime).split(' ')[1]}</span>
                </h3>
              </div>
              <div className="mt-6 md:mt-0 text-left md:text-right">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Productive Hours Today</p>
                <div className="flex items-baseline md:justify-end gap-1">
                   <p className="text-white text-5xl font-black tracking-tighter">{hoursToday}</p>
                   <p className="text-blue-500 text-xl font-bold italic">hrs</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 flex flex-col lg:flex-row items-center gap-8">
              <button
                onClick={clockedIn ? handleClockOut : handleClockIn}
                disabled={loading}
                className={`w-full lg:w-auto px-12 py-5 rounded-2xl font-black text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 text-white ${
                  clockedIn 
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-red-900/20' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-900/20'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : clockedIn ? (
                  <Clock size={18} />
                ) : (
                  <Zap size={18} fill="currentColor" />
                )}
                {clockedIn ? "END CURRENT SHIFT" : "INITIALIZE CLOCK IN"}
              </button>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-slate-400">
                    <Clock size={18} />
                 </div>
                 <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Entry Log</span>
                  <span className="text-white text-[13px] font-bold">
                    {clockedIn ? `Started at ${formatTime(new Date(clockInTime))}` : "System Ready for Log-in"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom KPI Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <StatCard 
            label="Monthly Attendance" 
            value="94.2%" 
            sub="+2.4% from last month" 
            icon={CalendarCheck} 
            color="bg-emerald-500" 
          />
          <StatCard 
            label="Available Leave" 
            value="14" 
            sub="Days remaining" 
            icon={Briefcase} 
            color="bg-blue-600" 
          />
          <StatCard 
            label="Weekly Productivity" 
            value="8.4" 
            sub="Avg. hours / day" 
            icon={CheckCircle2} 
            color="bg-violet-600" 
          />
        </div>

      </div>
    </EmployeeLayout>
  );
}