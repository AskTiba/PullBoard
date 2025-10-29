import GraphicActivity from "../components/layout/GraphicActivity";
import TopContributers from "../components/layout/TopContributers";
import { useToken } from "../hooks/useToken";
import { useFetchAllPRsOfRepo } from "../hooks/useFetchAllPRsOfRepo";
import PRStatusStat from "../components/statistics/PRStatusStat";
import { PullRequest } from "../types/PullRequest.types";
import RepoForm from "../components/RepoForm";
import LottieLoader from "../components/ui/LottieLoader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRepo } from "../context/RepoContext";

export default function DashBoard() {
  const navigate = useNavigate();
  const { setRepoInfo } = useRepo();
  const [owner, setOwner] = useState<string | null>(null);
  const [repo, setRepo] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      setRepoInfo(owner, repo);
    }
  }, [owner, repo, setRepoInfo]);

  const url = owner && repo ? `${import.meta.env.VITE_API_URL}/api/prs/${owner}/${repo}` : null;
  const { data: token } = useToken();
  const { data, isLoading, error } = useFetchAllPRsOfRepo<{ data: PullRequest[] }>(url, token);



  const handleSubmit = (ownerInput: string, repoInput: string) => {
    setOwner(ownerInput);
    setRepo(repoInput);
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
          </div>

          <RepoForm handleSubmit={handleSubmit} />
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
            {isLoading && (
              <div className="flex justify-center items-center py-10">
                <LottieLoader />
              </div>
            )}
            {!isLoading && data &&
              <>
                <PRStatusStat allprs={data.data} />
                <GraphicActivity allprs={data.data} />
                <TopContributers allprs={data.data} />
              </>
            }
          </>
        }
      </main > {" "}
    </>
  );
}