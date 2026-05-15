import React, { useState } from "react";
import { Search } from "../icons";
import { useRepository } from "../../context/RepositoryContext";

export default function Header() {
  const { currentRepo, setRepo } = useRepository();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setRepo(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <header className="h-[80px] border-b border-slate-200/60 flex items-end pb-4 px-8 sticky top-0 bg-white/80 backdrop-blur-3xl z-40 transition-all duration-500 pt-4">
      <div className="flex items-center justify-between w-full">
        {/* Compressed & Defined Tactical Search */}
        <form onSubmit={handleSubmit} className="relative group w-full max-w-sm">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search width={16} fill="currentColor" />
          </div>
          <input
            type="text"
            placeholder="Search Intelligence Sector..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-[42px] bg-white border border-slate-300/80 rounded-xl pl-11 pr-5 text-[14px] font-bold text-slate-950 placeholder:text-slate-400 focus:border-blue-500/40 transition-all outline-none shadow-sm"
          />
        </form>

        {/* EXPANDED SECTOR CONTEXT - HIGH LEGIBILITY */}
        <div className="flex items-center gap-4 ml-8">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] leading-none mb-1.5">Active Mission Sector</span>
                <span className="text-sm font-black text-slate-950 tracking-tight italic truncate max-w-md lg:max-w-xl">
                    {currentRepo}
                </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
        </div>
      </div>
    </header>
  );
}
