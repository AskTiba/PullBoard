import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData, AnalyticsData } from "../services/api";
import LottieLoader from "../components/ui/LottieLoader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { useRepository } from "../context/RepositoryContext";

const Analytics: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["analytics-data", currentRepo],
    queryFn: () => fetchAnalyticsData(currentRepo),
  });

  if (isLoading || isLoadingRepo) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <LottieLoader />
        <p className="text-pb-muted font-bold animate-pulse">
            {isLoadingRepo ? "Synchronizing Context..." : "Aggregating Velocity Trends..."}
        </p>
      </div>
    );
  }

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b"];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 px-6 pt-8">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                Analytics Hub
            </span>
            <span className="text-blue-600 font-bold text-sm tracking-tight">{currentRepo}</span>
        </div>
        <h2 className="text-4xl font-extrabold text-pb-text tracking-tight">
          Performance Analytics
        </h2>
        <p className="text-pb-muted font-medium text-lg">
          High-fidelity data visualization of your team's throughput and repository health.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Velocity Trend */}
        <div className="lg:col-span-2 card-ios p-8 space-y-8 h-[450px]">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-pb-text">Velocity Trend</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
                +12.4% Increase
            </span>
          </div>
          <div className="h-[320px] w-full">
            {data?.velocityTrend && data.velocityTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.velocityTrend}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}}
                        />
                        <Tooltip 
                            contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#2563eb" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-300 font-bold uppercase tracking-widest text-xs">
                    Insufficient data for trend analysis
                </div>
            )}
          </div>
        </div>

        {/* Review Efficiency */}
        <div className="card-ios p-8 space-y-8">
            <h3 className="text-xl font-bold text-pb-text">Review Efficiency</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.reviewEfficiency} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="label" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            width={100}
                            tick={{fill: '#475569', fontSize: 9, fontWeight: 800}}
                        />
                        <Tooltip cursor={{fill: '#f8fafc'}} />
                        <Bar dataKey="hours" radius={[0, 10, 10, 0]} barSize={24}>
                            {data?.reviewEfficiency.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl text-xl font-black">4.2h</div>
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Avg. Initial Review</p>
                    <p className="text-xs font-bold text-slate-900">Optimized Performance</p>
                </div>
            </div>
        </div>
      </div>

      {/* Repo Health */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.repositoryHealth.map((repo, i) => (
              <div key={i} className="card-ios p-8 flex items-center gap-6 group hover:border-blue-200 transition-colors">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={175.9}
                            strokeDashoffset={175.9 - (repo.score / 100) * 175.9}
                            className={`${repo.status === 'healthy' ? 'text-green-500' : 'text-amber-500'} transition-all duration-1000`}
                        />
                    </svg>
                    <span className="absolute text-sm font-black text-slate-950">{repo.score}%</span>
                  </div>
                  <div className="space-y-1">
                      <h4 className="font-bold text-slate-950 truncate w-32">{repo.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{repo.status}</p>
                  </div>
              </div>
          ))}
      </section>
    </div>
  );
};

export default Analytics;
