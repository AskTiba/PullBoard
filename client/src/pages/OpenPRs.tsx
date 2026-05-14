import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Export, Filter, GitPR, Refresh, X } from "../components/icons";
import LottieLoader from "../components/ui/LottieLoader";
import LottieEmptyState from "../components/ui/LottieEmptyState";
import { fetchOpenPRs, PullRequest } from "../services/api";

const OpenPRs: React.FC = () => {
  const { data: prs, isLoading, refetch, isFetching } = useQuery<PullRequest[]>({
    queryKey: ["open-prs"],
    queryFn: fetchOpenPRs,
  });

  return (
    <main className="min-h-screen bg-hestia-bg pt-8 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-hestia-text tracking-tight">
              Open Pull Requests
            </h2>
            <p className="text-hestia-muted font-medium text-lg">
              Manage your team's active development branch activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()}
              disabled={isFetching}
              className="p-3 bg-white rounded-2xl shadow-ios border border-white hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
            >
              <Refresh width={20} className={isFetching ? "animate-spin" : ""} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-hestia-text text-white rounded-2xl font-bold shadow-ios-lg hover:scale-[1.02] transition-all active:scale-95">
              <Export width={18} fill="#fff" />
              <span>Export Dashboard</span>
            </button>
          </div>
        </section>

        {/* Action/Filter Bar */}
        <section className="p-4 bg-white/60 rounded-[32px] border border-white shadow-ios-lg backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Author username..."
                className="px-5 py-3 bg-white rounded-2xl border border-white shadow-ios focus:outline-none focus:ring-2 focus:ring-hestia-accent/20 placeholder:text-hestia-muted/50 font-medium"
              />
              <select className="px-5 py-3 bg-white rounded-2xl border border-white shadow-ios focus:outline-none focus:ring-2 focus:ring-hestia-accent/20 font-medium text-hestia-muted">
                <option>All Repositories</option>
                <option>Hestia Core</option>
                <option>PullBoard</option>
                <option>ShopMaster</option>
              </select>
              <select className="px-5 py-3 bg-white rounded-2xl border border-white shadow-ios focus:outline-none focus:ring-2 focus:ring-hestia-accent/20 font-medium text-hestia-muted">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Priority (High)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 bg-hestia-accent text-white rounded-2xl shadow-ios hover:bg-blue-600 transition-all active:scale-95">
                <Filter fill="#fff" width={20} />
              </button>
              <button className="p-3 bg-white text-hestia-muted rounded-2xl shadow-ios border border-white hover:text-hestia-text transition-all active:scale-95">
                <X width={20} />
              </button>
            </div>
          </div>
        </section>

        {/* PRs List Area */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-green-100 rounded-xl">
              <GitPR fill="#16a34a" width={18} />
            </div>
            <span className="text-xl font-bold text-hestia-text">
              {prs?.length || 0} Active Requests
            </span>
          </div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-32 space-y-4">
              <LottieLoader />
              <p className="text-hestia-muted font-bold animate-pulse">Syncing with GitHub...</p>
            </div>
          ) : prs && prs.length > 0 ? (
            <div className="grid gap-4">
              {prs.map((pr) => (
                <div 
                  key={pr.id} 
                  className="group p-6 bg-white rounded-[32px] border border-white shadow-ios hover:shadow-ios-lg hover:scale-[1.005] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-hestia-accent uppercase tracking-widest">{pr.repository}</span>
                          <span className="text-hestia-muted/30">•</span>
                          <span className="text-xs font-semibold text-hestia-muted">#{pr.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-hestia-text group-hover:text-hestia-accent transition-colors">
                          {pr.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {pr.labels.map(label => (
                          <span key={label} className="px-3 py-1 bg-hestia-bg rounded-full text-[11px] font-bold text-hestia-muted border border-white/50">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-hestia-text">{pr.author}</span>
                          <span className="text-xs font-medium text-hestia-muted">Opened 2h ago</span>
                        </div>
                        <div className="w-10 h-10 bg-hestia-bg rounded-2xl border border-white shadow-ios flex items-center justify-center font-bold text-hestia-accent">
                          {pr.author[0]}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-hestia-muted">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-xs font-bold uppercase tracking-tighter">{pr.commentsCount} Comments</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-xs font-bold uppercase tracking-tighter">{pr.reviewsCount} Reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 bg-white/40 rounded-[40px] border border-dashed border-white/60">
              <LottieEmptyState message="Your mission control is clear. No active PRs found." />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default OpenPRs;
