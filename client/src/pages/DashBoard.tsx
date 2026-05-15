import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GitPR, Team, Filter } from "../components/icons";
import GraphicActivity from "../components/layout/GraphicActivity";
import CheckCircle from "../components/ui/checkCircle";
import { fetchDashboardStats, DashboardStats, fetchTeamData, fetchOpenPRs } from "../services/api";
import { useRepository } from "../context/RepositoryContext";
import { CardSkeleton, VolumeSkeleton, Skeleton } from "../components/ui/Skeleton";

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
  const isVolumePending = (stats as any)?.volumePending ?? false;
  const isVolumeUnsupported = (stats as any)?.volumeUnsupported ?? false;

  const statCards = [
    {
      icon: <GitPR width={16} fill="#2563eb" />,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      title: "Pull Requests",
      value: totalPRs,
    },
    {
      icon: <CheckCircle width={16} fill="#16a34a" />,
      bgColor: "bg-green-50",
      accentColor: "text-green-600",
      title: "Successfully Merged",
      value: mergedPRs,
    },
    {
      icon: <Filter width={16} fill="#9333ea" />,
      bgColor: "bg-purple-50",
      accentColor: "text-purple-600",
      title: "Weekly Churn",
      value: isVolumeUnsupported ? "Restricted" : isVolumePending ? "..." : `${(additions + deletions).toLocaleString()}`,
    },
    {
      icon: <Team width={16} fill="#0f172a" />,
      bgColor: "bg-slate-100",
      accentColor: "text-slate-900",
      title: "Contributors",
      value: stats?.contributors ?? 0,
    },
  ];

  const isLoading = isLoadingStats || isLoadingRepo;

  return (
    <main className="min-h-screen bg-hestia-bg pb-12 px-6 animate-in fade-in duration-500 pt-2 no-horizontal">
      <div className="max-w-7xl mx-auto space-y-8 no-horizontal">
        
        {/* Uniform Header Section - Always visible */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                Repository Intelligence
            </span>
            <span className="text-blue-600 font-bold text-sm tracking-tight italic">
                {isLoadingRepo ? "Loading Repository..." : currentRepo}
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight leading-none">Intelligence Dashboard</h2>
          <p className="text-hestia-muted font-medium text-lg">
            High-fidelity monitoring of mission velocity and development throughput.
          </p>
        </section>

        {/* Dense Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </>
          ) : (
            statCards.map((stat, index) => (
                <div key={index} className="card-ios p-5 bg-white border-slate-200/60 shadow-sm flex items-center gap-4">
                    <div className={`${stat.bgColor} w-10 h-10 rounded-xl shrink-0 flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-400 text-[9px] uppercase tracking-widest truncate">{stat.title}</h3>
                      <p className={`text-xl font-bold ${stat.accentColor} leading-none mt-1`}>
                        {stat.value}
                      </p>
                    </div>
                </div>
            ))
          )}
        </section>

        {/* Tight Churn Visuals */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
                <>
                    <VolumeSkeleton />
                    <VolumeSkeleton />
                </>
            ) : (
                <>
                    <div className="card-ios p-6 space-y-4 bg-white border-slate-200/60 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Additions Volume</h3>
                            <span className="text-xl font-bold text-green-600">
                                {isVolumeUnsupported ? "---" : isVolumePending ? "..." : `+${additions.toLocaleString()}`}
                            </span>
                        </div>
                        <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full bg-green-500 ${isVolumeUnsupported ? 'w-0' : isVolumePending ? 'w-[15%] animate-pulse' : 'w-[65%]'}`} />
                        </div>
                    </div>
                    <div className="card-ios p-6 space-y-4 bg-white border-slate-200/60 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Deletions Volume</h3>
                            <span className="text-xl font-bold text-red-600">
                                {isVolumeUnsupported ? "---" : isVolumePending ? "..." : `-${deletions.toLocaleString()}`}
                            </span>
                        </div>
                        <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full bg-red-500 ${isVolumeUnsupported ? 'w-0' : isVolumePending ? 'w-[15%] animate-pulse' : 'w-[30%]'}`} />
                        </div>
                    </div>
                </>
            )}
        </section>

        {/* Compact Velocity Chart */}
        <div className="card-ios p-6 bg-white border-slate-200/60 shadow-sm">
            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">Velocity Trend Intelligence</h3>
            {isLoading ? (
                <Skeleton className="w-full h-[200px]" />
            ) : (
                <GraphicActivity data={stats?.activityData} />
            )}
        </div>
      </div>
    </main>
  );
}
