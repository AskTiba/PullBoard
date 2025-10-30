import React, { useState, useEffect, useMemo } from "react";
import { Export, Filter, GitPR, Refresh, X } from "../components/icons";
import LottieLoader from "../components/ui/LottieLoader";
import LottieEmptyState from "../components/ui/LottieEmptyState";
import { FormattedPullRequest } from "../types/formatted.types";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchAllPRsOfRepo } from "../hooks/useFetchAllPRsOfRepo";
import { useToken } from "../hooks/useToken";

const PullRequests: React.FC = () => {
  const { owner: urlOwner, repo: urlRepo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();

  const [owner, setOwner] = useState<string>(urlOwner || "");
  const [repo, setRepo] = useState<string>(urlRepo || "");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "closed">("all");
  const [filterAuthor, setFilterAuthor] = useState<string>("");

  const { data: token } = useToken();
  const prsUrl = owner && repo ? `${import.meta.env.VITE_API_URL}/api/prs/${owner}/${repo}` : null;
  const { data: fetchedPrs, isLoading, isFetching, error } = useFetchAllPRsOfRepo<{ data: FormattedPullRequest[] }>(prsUrl, token);

  const uniqueAuthors = useMemo(() => {
    if (!fetchedPrs?.data) return [];
    const authors = fetchedPrs.data.map((pr) => pr.author?.username).filter(Boolean) as string[];
    return Array.from(new Set(authors));
  }, [fetchedPrs]);

  useEffect(() => {
    if (urlOwner) setOwner(urlOwner);
    if (urlRepo) setRepo(urlRepo);
  }, [urlOwner, urlRepo]);

  useEffect(() => {
    if (owner && repo) {
      navigate(`/pull-requests/${owner}/${repo}`);
    }
  }, [owner, repo, navigate]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as "all" | "open" | "closed");
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterAuthor(e.target.value);
  };

  const filteredPrs = useMemo(() => {
    if (!fetchedPrs?.data) return [];

    let tempPrs = fetchedPrs.data;

    if (filterStatus !== "all") {
      tempPrs = tempPrs.filter((pr) => pr.state === filterStatus);
    }

    if (filterAuthor) {
      tempPrs = tempPrs.filter((pr) =>
        pr.author?.username.toLowerCase().includes(filterAuthor.toLowerCase())
      );
    }
    return tempPrs;
  }, [fetchedPrs, filterStatus, filterAuthor]);

  const [sortOption, setSortOption] = useState<string>("newest");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const sortedPrs = useMemo(() => {
    let tempPrs = [...filteredPrs];

    if (sortOption === "newest") {
      tempPrs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortOption === "oldest") {
      tempPrs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOption === "updated") {
      tempPrs.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }
    // "comments" sorting is not implemented as comment count is not directly available.

    return tempPrs;
  }, [filteredPrs, sortOption]);

  const pageTitle = filterStatus === "open" ? "Open Pull Requests" : filterStatus === "closed" ? "Closed Pull Requests" : "All Pull Requests";
  const prCountText = `${sortedPrs.length} ${pageTitle}`;

  const handleClearFilters = () => {
    setFilterStatus("all");
    setFilterAuthor("");
  };

  return (
    <main className="max-w-screen-xl mx-auto py-8 px-4">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800">
            {pageTitle}
          </h2>
          <p className="text-gray-600">
            Track and manage all pull requests
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
            <Refresh width={20} fill="#fff" />
            <span>Refresh</span>
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
            <Export width={20} fill="#000" />
            <span>Export JSON</span>
          </button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label
              htmlFor="owner"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Owner
            </label>
            <input
              type="text"
              id="owner"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Owner Username"
              value={owner}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="repository"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Repository
            </label>
            <input
              type="text"
              id="repository"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Repository Name"
              value={repo}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="author"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Author
            </label>
            <select
              id="author"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterAuthor}
              onChange={handleAuthorChange}
            >
              <option value="">All Authors</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Status
            </label>
            <select
              id="status"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={handleStatusChange}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex sm:flex-row gap-4 lg:col-span-1 justify-end">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200">
              <Filter fill="#fff" width={20} />
              <span>Apply</span>
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={handleClearFilters}
            >
              <X fill="#fff" width={20} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </section>

      {/* PRs Summary and List */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitPR fill="#28a745" width={20} />
            <span className="text-lg font-semibold text-gray-800">
              {prCountText}
            </span>
            {isFetching && !isLoading && (
              <span className="text-sm text-gray-500 animate-pulse">(Updating...)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort-by"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="updated">Last Updated</option>
              <option value="comments">Most Comments (Not Implemented)</option>
            </select>
          </div>
        </div>
        {isLoading && !fetchedPrs ? (
          <div className="flex justify-center items-center py-10">
            <LottieLoader />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error.message}</div>
        ) : sortedPrs.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <LottieEmptyState message={`No ${filterStatus} pull requests found.`} />
          </div>
        ) : (
          <div className="p-20 text-center text-gray-500">
            {/* Render your PRs list here */}
            List of {pageTitle}
            <ul>
              {sortedPrs.map((pr: FormattedPullRequest) => (
                <li key={pr.id} className="text-left mb-2">
                  <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    #{pr.number} - {pr.title} ({pr.state})
                  </a>
                  by {pr.author?.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default PullRequests;
