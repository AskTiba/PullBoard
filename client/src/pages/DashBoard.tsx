import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GitPR, Team } from "../components/icons";
import GraphicActivity from "../components/layout/GraphicActivity";
import TopContributers from "../components/layout/TopContributers";
import { Clock } from "../components/ui";
import CheckCircle from "../components/ui/checkCircle";
import { fetchDashboardStats, DashboardStats } from "../services/api";
import LottieLoader from "../components/ui/LottieLoader";

export default function DashBoard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  const statCards = [
    {
      icon: <GitPR width={24} fill="#2563eb" />,
      bgColor: "bg-blue-50",
      accentColor: "text-blue-600",
      title: "Total Requests",
      value: stats?.totalPRs || 0,
    },
    {
      icon: <CheckCircle width={24} fill="#16a34a" />,
      bgColor: "bg-green-50",
      accentColor: "text-green-600",
      title: "Successfully Merged",
      value: stats?.mergedPRs || 0,
    },
    {
      icon: <Clock width={24} fill="#dc2626" />,
      bgColor: "bg-red-50",
      accentColor: "text-red-600",
      title: "Avg. Merge Velocity",
      value: stats?.avgMergeTime || "0d",
    },
    {
      icon: <Team width={24} fill="#9333ea" />,
      bgColor: "bg-purple-50",
      accentColor: "text-purple-600",
      title: "Active Contributors",
      value: stats?.contributors || 0,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-hestia-bg space-y-4">
        <LottieLoader />
        <p className="text-hestia-muted font-bold animate-pulse">Computing Real-time Analytics...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-hestia-bg pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <section className="space-y-2">
          <h2 className="text-4xl font-extrabold text-hestia-text tracking-tight">
            Repository Intelligence
          </h2>
          <p className="text-hestia-muted font-medium text-lg">
            High-fidelity insights into your team's development velocity.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[32px] border border-white shadow-ios hover:shadow-ios-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                <div className={`${stat.bgColor} w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner`}>
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-hestia-muted text-sm uppercase tracking-wider">{stat.title}</h3>
                  <span className={`text-4xl font-black ${stat.accentColor} tracking-tighter`}>
                    {stat.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <GraphicActivity data={stats?.activityData} />

        {/* Contributors Section */}
        <TopContributers contributors={stats?.topContributors} />
      </div>
    </main>
  );
}
