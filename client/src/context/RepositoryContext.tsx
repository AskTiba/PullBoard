import React, { createContext, useContext, useState, useEffect } from "react";

interface RepositoryContextType {
  currentRepo: string;
  setRepo: (repo: string) => void;
  isLoadingRepo: boolean;
}

const RepositoryContext = createContext<RepositoryContextType | undefined>(undefined);

export const RepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sanitizes URL or raw input into 'owner/repo' format
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
    return extractRepoContext(saved); // Sanitize on load
  });
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);

  const setRepo = (repoInput: string) => {
    const repo = extractRepoContext(repoInput);
    setIsLoadingRepo(true);
    setCurrentRepo(repo);
    localStorage.setItem("pb_current_repo", repo);
    
    setTimeout(() => {
      setIsLoadingRepo(false);
    }, 800);
  };

  return (
    <RepositoryContext.Provider value={{ currentRepo, setRepo, isLoadingRepo }}>
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
