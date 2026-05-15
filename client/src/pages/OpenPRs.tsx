import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOpenPRs, PullRequest } from "../services/api";
import { GitPR, Filter, Export } from "../components/icons";
import LottieLoader from "../components/ui/LottieLoader";
import { useRepository } from "../context/RepositoryContext";

const OpenPRs: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  const { data, isLoading } = useQuery<PullRequest[]>({
    queryKey: ["open-prs", currentRepo],
    queryFn: () => fetchOpenPRs(currentRepo),
  });

  const getRiskLevel = (updatedAt: string) => {
    const updated = new Date(updatedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - updated.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays > 7) return { level: "Critical", color: "bg-red-500", text: "text-red-500", label: "Ancient" };
    if (diffDays > 3) return { level: "Warning", color: "bg-amber-500", text: "text-amber-500", label: "Stale" };
    return null;
  };

  if (isLoading || isLoadingRepo) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <LottieLoader />
        <p className="text-hestia-muted font-bold animate-pulse">
            {isLoadingRepo ? "Synchronizing Context..." : "Identifying Mission Bottlenecks..."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 px-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                Active Board
            </span>
            <span className="text-green-600 font-bold text-sm tracking-tight">{currentRepo}</span>
          </div>
          <h2 className="text-4xl font-extrabold text-hestia-text tracking-tight">
            PR Intelligence Board
          </h2>
          <p className="text-hestia-muted font-medium text-lg">
            Active monitoring of development velocity and potential mission risks.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white rounded-2xl text-sm font-bold shadow-premium hover:scale-105 transition-all">
              <Export width={18} fill="#fff" />
              <span>Export Briefing</span>
          </button>
        </div>
      </section>

      {/* Logic Disclosure */}
      <section className="bg-blue-50/50 border border-blue-100 rounded-[28px] p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-black italic">!</div>
          <p className="text-xs text-blue-700 font-bold uppercase tracking-wide">
             The board automatically flags missions that haven't received intelligence updates in more than 3 cycles.
          </p>
      </section>

      {/* PR Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data && data.length > 0 ? (
          data.map((pr) => {
            const risk = getRiskLevel(pr.updatedAt);
            return (
              <div 
                key={pr.id}
                className="card-ios group flex flex-col hover:shadow-premium transition-all duration-500 overflow-hidden relative bg-gradient-to-br from-white to-slate-50/50 border-slate-100"
              >
                {/* Risk Indicator Ribbon */}
                {risk && (
                    <div className={`absolute top-0 right-0 px-4 py-1.5 ${risk.color} text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-bl-2xl shadow-lg`}>
                        {risk.label} RISK
                    </div>
                )}

                <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                            <GitPR fill={risk ? (risk.level === 'Critical' ? '#ef4444' : '#f59e0b') : '#2563eb'} width={22} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-2">#{pr.id}</span>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-extrabold text-slate-950 leading-tight group-hover:text-blue-600 transition-colors">
                            {pr.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {pr.labels.map(label => (
                                <span key={label} className="px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-950 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                                {pr.author[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-slate-950">{pr.author}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Operator</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</p>
                            <p className={`text-[10px] font-black ${risk ? risk.text : 'text-slate-950'}`}>
                                {new Date(pr.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase">Comments: {pr.commentsCount}</span>
                    </div>
                    <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        View Intelligence
                    </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-40 text-center card-ios bg-slate-50">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active missions identified.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenPRs;
