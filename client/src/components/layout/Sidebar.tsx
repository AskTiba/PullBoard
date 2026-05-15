import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DashBoard, GitPR, Team, Analytics, Settings, User as UserIcon, X, Logout } from "../icons";
import { useRepository } from "../../context/RepositoryContext";
import { fetchCurrentUser } from "../../services/api";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recentRepos, setRepo, removeRecentRepo, currentRepo, isLoadingRepo } = useRepository();

  // 🛡️ AUTHORITATIVE IDENTITY FETCH
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
    retry: 1,
  });

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/auth", { replace: true });
  };

  const menuItems = [
    { icon: <DashBoard width={20} fill="currentColor" />, label: "Dashboard", path: "/dashboard" },
    { icon: <GitPR width={20} fill="currentColor" />, label: "PR Board", path: "/prs" },
    { icon: <Team width={20} fill="currentColor" />, label: "Team Hub", path: "/team" },
    { icon: <Analytics width={20} fill="currentColor" />, label: "Intelligence", path: "/analytics" },
  ];

  return (
    <aside className="w-[280px] h-screen bg-slate-950 flex flex-col sticky top-0 shrink-0 shadow-2xl z-50 text-slate-300 no-horizontal">
      {/* Brand Section */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-premium group-hover:scale-110 transition-transform duration-500">
            <span className="text-xl font-black italic">P</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-black text-white tracking-tighter truncate">PullBoard</h1>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none truncate">Command Center</p>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 pt-8 overflow-y-auto custom-scrollbar no-horizontal">
        <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Core Missions</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 relative group
                ${isActive ? "bg-white/10 text-white shadow-lg border border-white/5" : "text-slate-400 hover:bg-white/5 hover:text-white"}
              `}
            >
              <span className={`shrink-0 transition-colors ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-blue-400"}`}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              )}
            </Link>
          );
        })}

        {/* Recent Missions */}
        <div className="pt-10 pb-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Recent Missions</p>
            <div className="space-y-1">
                {recentRepos.map((repo) => (
                    <div key={repo} className="group relative flex items-center">
                        <button
                            onClick={() => setRepo(repo)}
                            className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold transition-all text-left border border-transparent min-w-0
                                ${currentRepo === repo ? 'bg-blue-600/10 text-blue-400 border-blue-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}
                            `}
                        >
                            <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${currentRepo === repo ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]' : 'bg-slate-700'}`} />
                            <span className="truncate pr-6">{repo}</span>
                        </button>
                        
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                removeRecentRepo(repo);
                            }}
                            className="absolute right-2 p-1.5 text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        >
                            <X width={12} fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </nav>

      {/* OPERATOR IDENTITY SECTION */}
      <div className="p-6 bg-black/40 border-t border-white/5 space-y-6 no-horizontal">
        <div className="flex items-center gap-4 px-2">
            <div className="shrink-0 w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center text-slate-950 shadow-premium border border-white/10 group cursor-pointer hover:scale-105 transition-all">
                {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                    <UserIcon width={22} fill="currentColor" />
                )}
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-black text-white leading-none mb-1 uppercase tracking-wider truncate">
                    {isLoadingUser ? "Authenticating..." : (user?.username || "Guest Operator")}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Verified Identity</span>
                </div>
            </div>
        </div>

        {/* UTILITY STRIP */}
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/settings"
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                    ${location.pathname === "/settings" ? "bg-white text-slate-950 shadow-premium" : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"}
                  `}
                >
                  <Settings width={14} fill="currentColor" />
                  <span>Panel</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-white/5 text-slate-400 border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                >
                  <Logout width={14} fill="currentColor" />
                  <span>Exit</span>
                </button>
            </div>
        </div>
      </div>
    </aside>
  );
}
