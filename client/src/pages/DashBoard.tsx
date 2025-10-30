import GraphicActivity from "../components/layout/GraphicActivity";
import TopContributers from "../components/layout/TopContributers";
import { useToken } from "../hooks/useToken";
import { useFetchAllPRsOfRepo } from "../hooks/useFetchAllPRsOfRepo";
import { useFetchAllCommitsOfRepo } from "../hooks/useFetchAllCommitsOfRepo";
import PRStatusStat from "../components/statistics/PRStatusStat";
import { PullRequest } from "../types/PullRequest.types";
import RepoForm from "../components/RepoForm";
import LottieLoader from "../components/ui/LottieLoader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRepo } from "../context/RepoContext";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default function DashBoard() {
  const navigate = useNavigate();
  const { owner, repo, setRepoInfo } = useRepo();
  const queryClient = useQueryClient();

  const prsUrl = owner && repo ? `${import.meta.env.VITE_API_URL}/api/prs/${owner}/${repo}` : null;
  const commitsUrl = owner && repo ? `${import.meta.env.VITE_API_URL}/api/repos/${owner}/${repo}/commits` : null;
  const dependencyHistoryUrl = owner && repo ? `${import.meta.env.VITE_API_URL}/api/${owner}/${repo}/dependency-history` : null;

  const { data: token } = useToken();
  const { data: prsData, isLoading: isLoadingPrs, isFetching: isFetchingPrs, error: prsError } = useFetchAllPRsOfRepo<{ data: PullRequest[] }>(prsUrl, token);
  const { data: commitsByAuthor, isLoading: isLoadingCommits, isFetching: isFetchingCommits, error: commitsError } = useFetchAllCommitsOfRepo<Record<string, number>>(commitsUrl, token);

  const isLoading = isLoadingPrs || isLoadingCommits;
  const isFetching = isFetchingPrs || isFetchingCommits;
  const error = prsError || commitsError;

  useEffect(() => {
    if (owner && repo && token && dependencyHistoryUrl) {
      queryClient.prefetchQuery({
        queryKey: ["dependencyHistory", owner, repo, "react"], // Pre-fetch for 'react' as a default
        queryFn: async () => {
          const response = await api.get(dependencyHistoryUrl, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          return response.data;
        },
        staleTime: 1000 * 60 * 10, // Match staleTime with DependencyTimeMachine page
      });
    }
  }, [owner, repo, token, dependencyHistoryUrl, queryClient]);

  const handleSubmit = (ownerInput: string, repoInput: string) => {
    setRepoInfo(ownerInput, repoInput);
  }

  return (
    <>
      {" "}
      <main className="max-w-screen-xl mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-8">
          <div>
            <h2 className="font-bold text-3xl text-gray-800 mb-2">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600">
              Insight into your team's pull request performance.
            </p>
            {isFetching && !isLoading && (
              <span className="text-sm text-gray-500 animate-pulse">(Updating data in background...)</span>
            )}
          </div>

          <RepoForm handleSubmit={handleSubmit} initialOwner={owner || ''} initialRepo={repo || ''} />
        </div>
        {owner && repo && (
          <div className="flex justify-end mb-8">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              onClick={() => navigate(`/pull-requests/${owner}/${repo}`)}
            >
              View All Pull Requests
            </button>
          </div>
        )}
        {error ?
          <div className="flex justify-center items-center py-10" style={{ width: 300, height: 300 }}>
            <p>Somthing went wrong</p>
          </div>
          :
          <>
            {isLoading && (!prsData || !commitsByAuthor) && (
              <div className="flex justify-center items-center py-10">
                <LottieLoader />
              </div>
            )}
            {prsData && commitsByAuthor &&
              <>
                <PRStatusStat allprs={prsData.data} />
                <GraphicActivity allprs={prsData.data} />
                <TopContributers allprs={prsData.data} commitsByAuthor={commitsByAuthor} />
              </>
            }
          </>
        }
      </main > {" "}
    </>
  );
}