import React, { createContext, useContext, useState, useEffect } from "react";

interface RepositoryContextType {
  currentRepo: string;
  recentRepos: string[];
  setRepo: (repo: string) => void;
  removeRecentRepo: (repo: string) => void;
  isLoadingRepo: boolean;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const extractRepoContext = (input: string): string => {
    let cleanInput = input.trim().replace(/\/$/, "").replace(/\.git$/, "");
    const githubUrlPattern = /github\.com\/([^/]+\/[^/]+)/;
    const match = cleanInput.match(githubUrlPattern);
    
    if (match && match[1]) {
      return match[1].replace(/\.git$/, "");
    }
    return cleanInput;
  };

  const [currentRepo, setCurrentRepo] = useState(() => {
    const saved = localStorage.getItem("pb_current_repo") || "facebook/react";
    return extractRepoContext(saved);
  });

  const [recentRepos, setRecentRepos] = useState<string[]>(() => {
    const saved = localStorage.getItem("pb_recent_repos");
    return saved ? JSON.parse(saved) : ["facebook/react"];
  });

  const [isLoadingRepo, setIsLoadingRepo] = useState(false);

  const setRepo = (repoInput: string) => {
    const repo = extractRepoContext(repoInput);
    if (!repo) return;

    setIsLoadingRepo(true);
    setCurrentRepo(repo);
    localStorage.setItem("pb_current_repo", repo);
    
    setRecentRepos(prev => {
      const filtered = prev.filter(r => r !== repo);
      const updated = [repo, ...filtered].slice(0, 5);
      localStorage.setItem("pb_recent_repos", JSON.stringify(updated));
      return updated;
    });

    setTimeout(() => {
      setIsLoadingRepo(false);
    }, 800);
  };

  const removeRecentRepo = (repo: string) => {
    setRecentRepos(prev => {
      const updated = prev.filter(r => r !== repo);
      localStorage.setItem("pb_recent_repos", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RepositoryContext.Provider value={{ currentRepo, recentRepos, setRepo, removeRecentRepo, isLoadingRepo }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => {
  const context = useContext(RepositoryContext);
  if (context === undefined) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }
  return context;
};
