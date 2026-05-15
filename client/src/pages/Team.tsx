import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamData, TeamMember, fetchDashboardStats } from "../services/api";
import { motion } from "framer-motion";
import { useRepository } from "../context/RepositoryContext";
import { Shield, GitPR } from "../components/icons";
import { MemberCardSkeleton } from "../components/ui/Skeleton";

const Team: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats", currentRepo],
    queryFn: () => fetchDashboardStats(currentRepo),
    staleTime: 60000,
    enabled: !!currentRepo && !isLoadingRepo,
  });

  const { data, isLoading: isLoadingTeam, error } = useQuery<TeamMember[]>({
    queryKey: ["team-data", currentRepo],
    queryFn: () => fetchTeamData(currentRepo),
    staleTime: 60000,
    enabled: !!currentRepo && !isLoadingRepo,
  });

  const isLoading = isLoadingTeam || isLoadingRepo;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 px-6 animate-in fade-in duration-500 pt-2 no-horizontal">
      
      {/* Blueprint Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                    Engineering Intelligence
                </span>
                <span className="text-blue-600 font-bold text-sm tracking-tight italic">
                    {isLoadingRepo ? "Loading Repository..." : currentRepo}
                </span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight leading-none">Engineering Intelligence Hub</h2>
            <p className="text-hestia-muted font-medium text-lg">
                Quantifying organizational impact through cross-functional signal analysis.
            </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200/60 shadow-sm">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Contributors</span>
            <span className="text-2xl font-black text-slate-950 leading-none">
                {isLoadingStats ? "..." : (stats?.contributors || 0)} Operators
            </span>
        </div>
      </section>

      {/* Surgical Tactical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isLoading ? (
            <>
                <MemberCardSkeleton />
                <MemberCardSkeleton />
                <MemberCardSkeleton />
                <MemberCardSkeleton />
            </>
        ) : (
            data && data.length > 0 ? (
            data.map((member, i) => {
                const isTopOne = i === 0;
                return (
                <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`card-ios overflow-hidden flex flex-col sm:flex-row hover:border-blue-500/40 transition-all duration-300 relative
                    ${isTopOne ? 'border-blue-500/30 ring-1 ring-blue-500/10 shadow-xl' : 'bg-white border-slate-200 shadow-sm'}
                    `}
                >
                    {/* LEFT: Identity & High-Contrast Intelligence */}
                    <div className={`sm:w-[35%] p-6 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r space-y-4
                        ${isTopOne ? 'bg-slate-950 border-white/10' : 'bg-slate-50 border-slate-200'}
                    `}>
                        <div className="relative">
                            <div className={`w-16 h-16 bg-white border-2 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-950 shadow-2xl transition-transform duration-500 group-hover:scale-105
                                ${isTopOne ? 'border-blue-400' : 'border-slate-200'}
                            `}>
                                {member.avatar}
                            </div>
                            <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-2 shadow-xl
                                ${isTopOne ? 'bg-blue-600 border-white text-white' : 'bg-white border-slate-300 text-slate-500'}
                            `}>
                                #{i + 1}
                            </div>
                        </div>

                        <div className="space-y-1 w-full min-w-0">
                            <h3 className={`text-lg font-black tracking-tight truncate px-1 ${isTopOne ? 'text-white' : 'text-slate-950'}`}>{member.name}</h3>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${isTopOne ? 'text-blue-300' : 'text-slate-500'}`}>
                                {member.role || "Operator"}
                            </p>
                        </div>

                        <div className="pt-1">
                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isTopOne ? 'text-slate-400' : 'text-slate-500'}`}>Mission Impact</p>
                            <span className={`text-3xl font-black tracking-tighter ${isTopOne ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'text-slate-950'}`}>
                                {(member as any).impactScore || 0}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT: High-Contrast Metrics Matrix */}
                    <div className="flex-1 p-6 flex flex-col justify-between space-y-5 bg-white">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 hover:bg-slate-100/50 transition-colors">
                                <GitPR width={16} fill="#334155" className="shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Merged</span>
                                    <p className="text-xl font-black text-slate-950 leading-none">{member.prsMerged || 0}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 hover:bg-slate-100/50 transition-colors">
                                <Shield width={16} fill="#334155" className="shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Reviews</span>
                                    <p className="text-xl font-black text-slate-950 leading-none">{member.reviewCount || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 px-1">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-green-700 uppercase tracking-widest leading-none mb-1">Integrated (+)</span>
                                    <span className="text-sm font-black text-slate-950 leading-none">+{ (member.additions || 0).toLocaleString() }</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-red-700 uppercase tracking-widest leading-none mb-1">Optimized (-)</span>
                                    <span className="text-sm font-black text-slate-950 leading-none">-{ (member.deletions || 0).toLocaleString() }</span>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                                <div className="h-full bg-green-500 w-[60%]" />
                                <div className="h-full bg-red-600 w-[40%]" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Response Latency</span>
                                <span className="text-xs font-black text-slate-950 leading-none">{member.responsiveness || "N/A"}</span>
                            </div>
                            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                                ${(member as any).style === 'Heavyweight' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                (member as any).style === 'Rapid Fire' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200'}
                            `}>
                                {(member as any).style || 'Velocity'}
                            </div>
                        </div>
                    </div>
                </motion.div>
                );
            })
            ) : (
            <div className="col-span-full py-10 text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No strategic data identified.</p>
            </div>
            )
        )}
      </div>

      {/* Strategic Briefing - High Legibility */}
      <section className="bg-slate-950 text-white rounded-[24px] p-8 border border-white/10 shadow-2xl flex items-center gap-8">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-black italic border border-white/20 shrink-0">!</div>
          <p className="text-sm text-slate-100 font-medium leading-relaxed max-w-3xl">
              Aggregating cross-functional signals from the GitHub Global Search Index to verify mission impact. Metrics are calculated using a rolling 30-day signal window to ensure data accuracy.
          </p>
      </section>
    </div>
  );
};

export default Team;
