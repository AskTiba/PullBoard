import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOpenPRs, fetchClosedPRs, PullRequest, fetchDashboardStats } from "../services/api";
import { Export, Filter, GitPR, Refresh, X, Search } from "../components/icons";
import LottieLoader from "../components/ui/LottieLoader";
import LottieEmptyState from "../components/ui/LottieEmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { useRepository } from "../context/RepositoryContext";

const PullRequests: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  const [statusFilter, setStatusFilter] = useState<'open' | 'merged'>('open');

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", currentRepo],
    queryFn: () => fetchDashboardStats(currentRepo),
    staleTime: 60000,
  });

  const { data: prs, isLoading } = useQuery<PullRequest[]>({
    queryKey: ["prs", statusFilter, currentRepo],
    queryFn: () => statusFilter === 'open' ? fetchOpenPRs(currentRepo) : fetchClosedPRs(currentRepo),
    staleTime: 60000,
  });

  const statuses = [
    { id: 'open', name: 'Open Requests', color: 'bg-green-500', count: stats?.totalPRs || 0 },
    { id: 'merged', name: 'Merged History', color: 'bg-purple-500', count: stats?.mergedPRs || 0 },
  ];

  if (isLoading || isLoadingRepo) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <LottieLoader />
        <p className="text-hestia-muted font-bold animate-pulse uppercase tracking-widest text-xs">
          {isLoadingRepo ? "Synchronizing Context..." : "Identifying Mission Bottlenecks..."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 px-6 animate-in fade-in duration-500 pt-2">
      
      {/* Standardized Header Intelligence */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                PR Intelligence Board
            </span>
            <span className="text-blue-600 font-bold text-sm tracking-tight italic">{currentRepo}</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight flex items-center gap-4">
            PR Intelligence Board
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-950 text-white rounded-2xl text-xs font-black shadow-2xl">
                <span className="text-blue-400">Total:</span>
                {statusFilter === 'open' ? stats?.totalPRs : stats?.mergedPRs} Missions
            </div>
          </h2>
          <p className="text-hestia-muted font-medium text-lg">
            High-fidelity monitoring of development velocity and potential mission risks.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm hover:shadow-premium transition-all">
              <Export width={18} fill="#0f172a" />
              <span>Export Briefing</span>
          </button>
        </div>
      </section>

      {/* Dynamic Status Toggle */}
      <section className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-[28px] border border-slate-200/50 shadow-inner">
          {statuses.map((s) => {
            const isActive = statusFilter === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id as any)}
                className={`
                  relative px-10 py-4 rounded-[24px] text-[13px] font-black tracking-tight transition-all
                  ${isActive ? 'text-gray-950' : 'text-slate-500 hover:text-slate-700'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="board-tab-elite"
                    className="absolute inset-0 bg-white rounded-[22px] shadow-lg border border-slate-200"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${s.color} ${isActive ? 'animate-pulse' : ''}`} />
                  {s.name}
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${isActive ? 'bg-slate-100 text-slate-900' : 'bg-slate-200/50 text-slate-400'}`}>
                    {s.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* List Area */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={statusFilter + currentRepo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {prs && prs.length > 0 ? (
            <div className="grid gap-6">
              {prs.map((pr) => (
                <div 
                  key={pr.id} 
                  className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-ios hover:shadow-premium transition-all duration-500 cursor-pointer relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${statusFilter === 'open' ? 'text-blue-600' : 'text-purple-600'}`}>
                            {currentRepo}
                          </span>
                          <span className="text-slate-200">/</span>
                          <span className="text-xs font-black text-slate-950">MISSION #{pr.id}</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-950 group-hover:text-blue-600 transition-colors tracking-tight">
                          {pr.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {pr.labels.map(label => (
                          <span key={label} className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest shadow-sm">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-4">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col items-end text-right">
                          <span className="text-sm font-black text-gray-950">{pr.author}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {statusFilter === 'open' ? `Opened ${new Date(pr.createdAt).toLocaleDateString()}` : `Updated ${new Date(pr.updatedAt).toLocaleDateString()}`}
                          </span>
                        </div>
                        <div className="w-14 h-14 bg-slate-950 rounded-[22px] border border-white/10 flex items-center justify-center font-black text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                          {pr.author[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 bg-white/40 rounded-[40px] border border-dashed border-slate-200 flex flex-col items-center justify-center">
              <LottieEmptyState message="The board is clear. No active missions found in this sector." />
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export default PullRequests;
