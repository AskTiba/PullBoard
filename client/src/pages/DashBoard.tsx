import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GitPR, Team, Filter } from "../components/icons";
import CheckCircle from "../components/ui/checkCircle";
import { fetchDashboardStats, DashboardStats, fetchTeamData, fetchOpenPRs } from "../services/api";
import { useRepository } from "../context/RepositoryContext";
import { CardSkeleton, VolumeSkeleton, Skeleton } from "../components/ui/Skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { motion } from "framer-motion";

export default function DashBoard() {
  const { currentRepo, isLoadingRepo } = useRepository();
  const queryClient = useQueryClient();
  
  const { data: stats, isLoading: isLoadingStats } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats", currentRepo],
    queryFn: () => fetchDashboardStats(currentRepo),
    staleTime: 60000,
    enabled: !!currentRepo && !isLoadingRepo,
  });

  useEffect(() => {
    if (currentRepo && !isLoadingRepo) {
      queryClient.prefetchQuery({
        queryKey: ["team-data", currentRepo],
        queryFn: () => fetchTeamData(currentRepo),
        staleTime: 60000,
      });

      queryClient.prefetchQuery({
        queryKey: ["prs", "open", currentRepo],
        queryFn: () => fetchOpenPRs(currentRepo),
        staleTime: 60000,
      });
    }
  }, [currentRepo, isLoadingRepo, queryClient]);

  const totalPRs = stats?.totalPRs ?? 0;
  const mergedPRs = stats?.mergedPRs ?? 0;
  const additions = stats?.additions ?? 0;
  const deletions = stats?.deletions ?? 0;
  const isVolumePending = stats?.volumePending ?? false;
  const isVolumeUnsupported = stats?.volumeUnsupported ?? false;

  const statCards = [
    {
      icon: <GitPR width={16} fill="#2563eb" />,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      title: "Active Sector PRs",
      value: totalPRs,
    },
    {
      icon: <CheckCircle width={16} fill="#16a34a" />,
      bgColor: "bg-green-50",
      accentColor: "text-green-600",
      title: "Integrated Objectives",
      value: mergedPRs,
    },
    {
      icon: <Filter width={16} fill="#9333ea" />,
      bgColor: "bg-purple-50",
      accentColor: "text-purple-600",
      title: "Tactical Churn",
      value: isVolumeUnsupported ? "Restricted" : isVolumePending ? "..." : `${(additions + deletions).toLocaleString()}`,
    },
    {
      icon: <Team width={16} fill="#0f172a" />,
      bgColor: "bg-slate-100",
      accentColor: "text-slate-900",
      title: "Authorized Operators",
      value: stats?.contributors ?? 0,
    },
  ];

  const isLoading = isLoadingStats || isLoadingRepo;

  // 📈 SUPREME STATISTICIAN: Summation Vector Mapping
  const churnData = stats?.churnHistory?.map(w => ({
    name: new Date(w.timestamp * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    growth: w.additions,
    maintenance: w.deletions,
  })) || [];

  // 📊 SUPREME STATISTICIAN: Discrete Flux Mapping
  const activityData = stats?.activityData || [];

  return (
    <main className="min-h-screen bg-pb-bg pb-12 px-6 animate-in fade-in duration-500 pt-8 no-horizontal">
      <div className="max-w-7xl mx-auto space-y-8 no-horizontal">
        
        {/* Unified Header Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-blue-500/20">
                Command Center Intelligence
            </span>
            <span className="text-blue-600 font-bold text-sm tracking-tight italic">
                {isLoadingRepo ? "Synchronizing..." : currentRepo}
            </span>
          </div>
          <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-none">Sector Dashboard</h2>
          <p className="text-pb-muted font-medium text-lg max-w-2xl">
            Surgical analysis of engineering throughput and operational momentum.
          </p>
        </section>

        {/* Tactical Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
                <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
            </>
          ) : (
            statCards.map((stat, index) => (
                <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-ios p-6 bg-white border-slate-200/60 shadow-premium flex items-center gap-5 hover:border-blue-500/30 transition-all group"
                >
                    <div className={`${stat.bgColor} w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {stat.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-widest truncate">{stat.title}</h3>
                      <p className={`text-2xl font-black ${stat.accentColor} leading-none mt-1.5 tabular-nums`}>
                        {stat.value}
                      </p>
                    </div>
                </motion.div>
            ))
          )}
        </section>

        {/* Strategic Visual Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* The Pulse: Code Frequency Vector (Area Chart) */}
            <div className="lg:col-span-2 card-ios p-8 bg-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 flex gap-4 opacity-40 grayscale">
                    <div className="w-1 h-12 bg-slate-100 rounded-full" />
                    <div className="w-1 h-20 bg-slate-100 rounded-full" />
                    <div className="w-1 h-14 bg-slate-100 rounded-full" />
                </div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">The Pulse</h3>
                        <p className="text-2xl font-black text-slate-950 tracking-tight">Mission Accretion Vector</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth (+)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Maintenance (-)</span>
                        </div>
                    </div>
                </div>

                <div className="h-[320px] w-full mt-4">
                    {isLoading ? (
                        <Skeleton className="w-full h-full rounded-[32px]" />
                    ) : churnData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={churnData}>
                                <defs>
                                    <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradMaint" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}}
                                    dy={15}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}}
                                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                                />
                                <Tooltip 
                                    contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'}}
                                    itemStyle={{fontWeight: 900, fontSize: '12px'}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="growth" 
                                    stroke="#10b981" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#gradGrowth)" 
                                    animationDuration={1500}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="maintenance" 
                                    stroke="#f43f5e" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#gradMaint)" 
                                    animationDuration={1800}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                             <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Awaiting historical signal acquisition.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Operational Rhythm (Bar Chart) */}
            <div className="card-ios p-8 bg-white flex flex-col justify-between border-blue-500/5 ring-1 ring-blue-500/5">
                <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Rhythm</h3>
                    <p className="text-2xl font-black text-slate-950 tracking-tight">Weekly Flux</p>
                </div>
                
                <div className="flex-1 py-8 w-full">
                    {isLoading ? (
                        <Skeleton className="w-full h-full rounded-[24px]" />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <Tooltip 
                                    cursor={{fill: 'rgba(37, 99, 235, 0.03)'}}
                                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                                />
                                <Bar dataKey="prs" radius={[8, 8, 8, 8]} animationDuration={2000}>
                                    {activityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#e2e8f0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="pt-8 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Output Signal</p>
                            <p className="text-2xl font-black text-blue-600 leading-none tabular-nums">8.4 <span className="text-[10px] text-slate-400">PRs/Day</span></p>
                        </div>
                        <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter italic">High Performance</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Volume Matrix Distribution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
                <> <VolumeSkeleton /> <VolumeSkeleton /> </>
            ) : (
                <>
                    <div className="card-ios p-8 space-y-6 bg-white border-slate-200/60 shadow-premium group relative overflow-hidden">
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Distribution</h3>
                            </div>
                            <div className="flex items-center gap-6">
                                {/* 📈 SUPREME STATISTICIAN: Growth Sparkline */}
                                <div className="w-16 h-8 hidden sm:block">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={churnData.slice(-8)}>
                                            <Bar dataKey="growth" fill="#10b981" fillOpacity={0.2} radius={[1, 1, 1, 1]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <span className="text-2xl font-black text-emerald-600 tabular-nums">
                                    {isVolumeUnsupported ? "---" : isVolumePending ? "..." : `+${additions.toLocaleString()}`}
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner relative z-10">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: isVolumeUnsupported ? 0 : isVolumePending ? '15%' : '75%' }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className={`h-full bg-emerald-500 rounded-full ${isVolumePending ? 'animate-pulse' : ''}`} 
                            />
                        </div>
                    </div>

                    <div className="card-ios p-8 space-y-6 bg-white border-slate-200/60 shadow-premium group relative overflow-hidden">
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-rose-500 rounded-full" />
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entropy Mitigation</h3>
                            </div>
                            <div className="flex items-center gap-6">
                                {/* 📉 SUPREME STATISTICIAN: Entropy Sparkline */}
                                <div className="w-16 h-8 hidden sm:block">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={churnData.slice(-8)}>
                                            <Bar dataKey="maintenance" fill="#f43f5e" fillOpacity={0.2} radius={[1, 1, 1, 1]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <span className="text-2xl font-black text-rose-600 tabular-nums">
                                    {isVolumeUnsupported ? "---" : isVolumePending ? "..." : `-${deletions.toLocaleString()}`}
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner relative z-10">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: isVolumeUnsupported ? 0 : isVolumePending ? '15%' : '35%' }}
                                transition={{ duration: 2.2, ease: "easeOut" }}
                                className={`h-full bg-rose-500 rounded-full ${isVolumePending ? 'animate-pulse' : ''}`} 
                            />
                        </div>
                    </div>
                </>
            )}
        </section>
      </div>
    </main>
  );
}
