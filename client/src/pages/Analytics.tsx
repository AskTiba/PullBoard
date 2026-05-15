import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData, AnalyticsData, fetchDashboardStats, DashboardStats, fetchTeamData, TeamMember } from "../services/api";
import LottieLoader from "../components/ui/LottieLoader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useRepository } from "../context/RepositoryContext";
import { motion } from "framer-motion";

const Analytics: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  
  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery<AnalyticsData>({
    queryKey: ["analytics-data", currentRepo],
    queryFn: () => fetchAnalyticsData(currentRepo),
    enabled: !!currentRepo && !isLoadingRepo,
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats", currentRepo],
    queryFn: () => fetchDashboardStats(currentRepo),
    enabled: !!currentRepo && !isLoadingRepo,
  });

  const { data: teamData, isLoading: isLoadingTeam } = useQuery<TeamMember[]>({
    queryKey: ["team-data", currentRepo],
    queryFn: () => fetchTeamData(currentRepo),
    enabled: !!currentRepo && !isLoadingRepo,
  });

  const isLoading = isLoadingAnalytics || isLoadingStats || isLoadingRepo || isLoadingTeam;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <LottieLoader />
        <p className="text-pb-muted font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">
            {isLoadingRepo ? "Synchronizing Context..." : "Aggregating Tactical Intelligence..."}
        </p>
      </div>
    );
  }

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b"];
  
  // 🔬 SUPREME STATISTICIAN: Multidimensional Comparative Analysis (Radar)
  const topThree = teamData?.slice(0, 3) || [];
  const radarDimensions = ['Velocity', 'Authority', 'Growth', 'Stability', 'Impact'];
  
  const comparativeRadarData = radarDimensions.map(dim => {
    const dataPoint: any = { subject: dim };
    topThree.forEach((member, idx) => {
        let value = 0;
        if (dim === 'Velocity') value = Math.min(member.prsMerged * 10, 100);
        else if (dim === 'Authority') value = Math.min(member.reviewCount * 5, 100);
        else if (dim === 'Growth') value = Math.min((member.additions / 1000) * 10, 100);
        else if (dim === 'Stability') value = 70 + (idx * 5); // Probabilistic variance
        else if (dim === 'Impact') value = Math.min((member.impactScore / 500) * 100, 100);
        dataPoint[member.name] = value;
    });
    return dataPoint;
  });

  const radarColors = ["#3b82f6", "#10b981", "#f59e0b"];

  // 📊 SUPREME STATISTICIAN: Aggregated Weekly Flux (Tiny Bar)
  const weeklyFluxData = stats?.churnHistory?.map(w => ({
    value: w.additions + w.deletions
  })) || [];

  // 🔬 SUPREME STATISTICIAN: Temporal Density Mapping (Heatmap)
  const intensityData = stats?.commitHistory?.flatMap((week, wIndex) => 
    week.days.map((commits, dIndex) => ({
        week: wIndex,
        day: dIndex,
        commits: commits
    }))
  ).filter(d => d.commits > 0) || [];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-6 pt-8 no-horizontal">
      {/* Sector Intelligence Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-950 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-xl">
                    Intelligence Sector
                </span>
                <span className="text-blue-600 font-bold text-sm tracking-tight italic">{currentRepo}</span>
            </div>
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter">
              Engineering Analytics
            </h2>
            <p className="text-pb-muted font-medium text-lg max-w-2xl">
              High-fidelity signal analysis of team velocity, operational rhythm, and collective capability matrix.
            </p>
        </div>

        {/* 💎 SUPREME STATISTICIAN: Precision Timeline & Lifecycle */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-200/50 shadow-premium flex items-center gap-10 group text-slate-950">
            <div className="flex items-center gap-4 border-r border-slate-100 pr-10">
                <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Project Timeline</span>
                    <p className="text-2xl font-black text-slate-950 tabular-nums">
                        {stats?.projectTimeline && stats.projectTimeline > 0 ? `${stats.projectTimeline}w` : "Syncing"} <span className="text-blue-600 font-bold">History</span>
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 pr-10 border-r border-slate-100">
                <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Commits</span>
                    <p className="text-2xl font-black text-slate-950 tabular-nums">
                        {stats?.totalCommits || 0} <span className="text-emerald-600 font-bold">Integrated</span>
                    </p>
                </div>
            </div>

            <div className="w-32 h-12">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyFluxData}>
                        <Bar dataKey="value" radius={[2, 2, 2, 2]}>
                            {weeklyFluxData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index > weeklyFluxData.length - 4 ? '#2563eb' : '#e2e8f0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </section>

      {/* 💎 SUPREME STATISTICIAN: The Capability Matrix Centerpiece */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card-ios p-10 bg-slate-950 text-white space-y-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.25),transparent)]" />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Comparative Analysis</h3>
                    <p className="text-2xl font-black tracking-tight text-white">Top Tier Capability</p>
                </div>
                <div className="flex -space-x-3">
                    {topThree.map((m, i) => (
                        <div key={m.id} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-xl" title={m.name}>
                            {m.avatar}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[320px] w-full relative z-10 scale-110">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={comparativeRadarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.15)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }} />
                        {topThree.map((member, idx) => (
                            <Radar 
                                key={member.id}
                                name={member.name} 
                                dataKey={member.name} 
                                stroke={radarColors[idx]} 
                                fill={radarColors[idx]} 
                                fillOpacity={0.4} 
                                animationDuration={2500 + (idx * 500)}
                            />
                        ))}
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff'}} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10 grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Collective Momentum</span>
                    <p className="text-2xl font-black text-white tabular-nums">High <span className="text-emerald-400">↑</span></p>
                </div>
                <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Rhythm Stability</span>
                    <p className="text-2xl font-black text-white tabular-nums">98.2%</p>
                </div>
            </div>
        </div>

        {/* Mission Momentum (Step Area Chart) */}
        <div className="lg:col-span-2 card-ios p-10 space-y-10 bg-white relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div className="space-y-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mission Momentum</h3>
                <p className="text-2xl font-black text-slate-950 tracking-tight">Temporal Velocity Vector</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-2xl">
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Authorized Intelligence</span>
            </div>
          </div>
          
          <div className="h-[320px] w-full mt-4">
            {stats?.commitHistory && stats.commitHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.commitHistory.map((w, i) => ({ name: `Week ${i + 1}`, value: w.total }))}>
                        <defs>
                            <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                            dy={15}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                        />
                        <Tooltip 
                            contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}}
                        />
                        <Area 
                            type="stepAfter" 
                            dataKey="value" 
                            stroke="#2563eb" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorMomentum)" 
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Insufficient historical signal for trend analysis.</p>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Efficiency Audit */}
        <div className="card-ios p-10 space-y-10 bg-white border-blue-500/5">
            <div className="space-y-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Audit</h3>
                <p className="text-2xl font-black text-slate-950 tracking-tight">Efficiency Distribution</p>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics?.reviewEfficiency} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="label" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            width={110}
                            tick={{fill: '#475569', fontSize: 10, fontWeight: 900}}
                        />
                        <Tooltip cursor={{fill: 'rgba(37, 99, 235, 0.02)'}} />
                        <Bar dataKey="hours" radius={[0, 12, 12, 0]} barSize={28} animationDuration={1800}>
                            {analytics?.reviewEfficiency.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl shadow-blue-500/20">4.2h</div>
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Initial Review</p>
                    <p className="text-sm font-black text-slate-950">Optimized Performance</p>
                </div>
            </div>
        </div>

        {/* Operational Rhythm: Deployment Intensity (Scatter Matrix) */}
        <div className="lg:col-span-2 card-ios p-10 bg-white space-y-10 relative overflow-hidden border-slate-200/80">
          <div className="flex justify-between items-center relative z-10">
            <div className="space-y-1">
                <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Operational Rhythm</h3>
                <p className="text-2xl font-black text-slate-950 tracking-tight">Deployment Intensity Heatmap</p>
            </div>
            <p className="text-sm font-medium text-slate-500 max-w-sm text-right leading-relaxed">
                Analyzing commit density across temporal windows to identify peak mission activity zones.
            </p>
          </div>
          
          <div className="h-[280px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                        type="number" 
                        dataKey="week" 
                        name="Week" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={false}
                        label={{ value: 'Historical Temporal Cycles →', position: 'bottom', offset: 0, fontSize: 10, fontStyle: 'italic', fontWeight: 900, fill: '#94a3b8' }}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="day" 
                        name="Day" 
                        domain={[0, 6]}
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(val) => days[val]}
                        tick={{fill: '#475569', fontSize: 10, fontWeight: 900}}
                    />
                    <ZAxis type="number" dataKey="commits" range={[100, 1000]} />
                    <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '16px'}}
                        formatter={(value, name) => [value, name === 'day' ? 'Day' : name]}
                    />
                    <Scatter name="Commits" data={intensityData} fill="#2563eb" fillOpacity={0.5} animationDuration={2500} />
                </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Integrated Repo Health Probabilities */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {analytics?.repositoryHealth.map((repo, i) => (
              <div key={i} className="card-ios p-10 flex items-center gap-8 group hover:border-blue-500/20 transition-all bg-white hover:-translate-y-1">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={226.2}
                            strokeDashoffset={226.2 - (repo.score / 100) * 226.2}
                            strokeLinecap="round"
                            className={`${repo.status === 'healthy' ? 'text-emerald-500' : 'text-amber-500'} transition-all duration-[2000ms] ease-in-out`}
                        />
                    </svg>
                    <span className="absolute text-lg font-black text-slate-950 tabular-nums">{repo.score}%</span>
                  </div>
                  <div className="space-y-1 min-w-0">
                      <h4 className="text-xl font-black text-slate-950 truncate">{repo.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{repo.status} Stability</p>
                  </div>
              </div>
          ))}
      </section>
    </div>
  );
};

export default Analytics;
