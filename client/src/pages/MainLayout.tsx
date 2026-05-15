import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ScrollToTop from "../ScrollToTop";
import { useRepository } from "../context/RepositoryContext";
import { fetchTeamData, fetchOpenPRs, fetchClosedPRs, fetchAnalyticsData, fetchDashboardStats } from "../services/api";

export default function MainLayout() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { currentRepo, isLoadingRepo } = useRepository();

  const isAuthPage = location.pathname.startsWith("/auth");
  const isHomePage = location.pathname === "/";
  const isCommandCenter = !isAuthPage && !isHomePage;

  // 🛡️ UNIVERSAL INTELLIGENCE WARM-UP (Synchronized Keys)
  useEffect(() => {
    if (currentRepo && !isLoadingRepo && isCommandCenter) {
      console.log(`🌐 [GLOBAL WARM-UP] Aligning intelligence for ${currentRepo}...`);
      
      const prefetchParams = {
        staleTime: 60000, // 60s cache-lock for rock-solid UI
      };

      // 1. Dashboard Stats (Critical for Home)
      queryClient.prefetchQuery({
        queryKey: ["dashboard-stats", currentRepo],
        queryFn: () => fetchDashboardStats(currentRepo),
        ...prefetchParams
      });

      // 2. Team Intelligence (Deep Audit)
      queryClient.prefetchQuery({
        queryKey: ["team-data", currentRepo],
        queryFn: () => fetchTeamData(currentRepo),
        ...prefetchParams
      });

      // 3. PR Board (Open & Merged)
      queryClient.prefetchQuery({
        queryKey: ["prs", "open", currentRepo],
        queryFn: () => fetchOpenPRs(currentRepo),
        ...prefetchParams
      });

      queryClient.prefetchQuery({
        queryKey: ["closed-prs", currentRepo],
        queryFn: () => fetchClosedPRs(currentRepo),
        ...prefetchParams
      });

      // 4. Analytics
      queryClient.prefetchQuery({
        queryKey: ["analytics-data", currentRepo],
        queryFn: () => fetchAnalyticsData(currentRepo),
        ...prefetchParams
      });
    }
  }, [currentRepo, isLoadingRepo, isCommandCenter, queryClient]);

  if (isCommandCenter) {
    return (
      <div className="flex min-h-screen bg-pb-bg">
        <ScrollToTop />
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className={`${!isHomePage && !isAuthPage ? "pt-28 pb-20" : ""}`}>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
