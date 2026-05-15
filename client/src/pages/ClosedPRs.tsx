import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClosedPRs, PullRequest } from "../services/api";
import { GitPR, Filter, Export } from "../components/icons";
import LottieLoader from "../components/ui/LottieLoader";
import { useRepository } from "../context/RepositoryContext";

const ClosedPRs: React.FC = () => {
  const { currentRepo, isLoadingRepo } = useRepository();
  const { data, isLoading } = useQuery<PullRequest[]>({
    queryKey: ["closed-prs", currentRepo],
    queryFn: () => fetchClosedPRs(currentRepo),
  });

  if (isLoading || isLoadingRepo) {
    return (
      <div className="flex flex-col justify-center items-center py-40 space-y-4">
        <LottieLoader />
        <p className="text-hestia-muted font-bold animate-pulse text-xs uppercase tracking-widest">
            {isLoadingRepo ? "Synchronizing Context..." : "Fetching Historical Intelligence..."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 px-6 animate-in fade-in duration-500 pt-2">
      {/* /prs Blueprint Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                Mission History
            </span>
            <span className="text-purple-600 font-bold text-sm tracking-tight italic uppercase">{currentRepo}</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Merged History
          </h2>
          <p className="text-hestia-muted font-medium text-lg">
            A high-fidelity audit of successfully integrated mission objectives.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm hover:shadow-premium transition-all">
              <Export width={18} fill="#0f172a" />
              <span>Export Briefing</span>
          </button>
        </div>
      </section>

      {/* Filter Intelligence Bar */}
      <section className="bg-white p-4 rounded-[32px] border border-slate-200/50 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <Filter fill="#64748b" width={16} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter History</span>
        </div>
        <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block" />
        <div className="flex gap-2">
            {['All Time', 'This Month', 'Features', 'Stability'].map(tag => (
                <button key={tag} className="px-4 py-2 rounded-xl text-[11px] font-black text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all uppercase tracking-tighter">
                    {tag}
                </button>
            ))}
        </div>
      </section>

      {/* PR List Area */}
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((pr) => (
            <div 
              key={pr.id}
              className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-ios hover:shadow-premium hover:scale-[1.005] transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
                        {currentRepo}
                      </span>
                      <span className="text-slate-200">/</span>
                      <span className="text-xs font-black text-slate-950 text-[10px] uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">PR #{pr.id}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-950 group-hover:text-purple-600 transition-colors tracking-tight">
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

                <div className="flex items-center gap-5">
                    <div className="flex flex-col items-end text-right">
                      <span className="text-sm font-black text-gray-950">{pr.author}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Merged on {new Date(pr.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="w-14 h-14 bg-slate-950 rounded-[22px] border border-white/10 flex items-center justify-center font-black text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                      {pr.author[0]}
                    </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 bg-white/40 rounded-[40px] border border-dashed border-slate-200 flex flex-col items-center justify-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">The archives are empty. No historical missions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClosedPRs;
