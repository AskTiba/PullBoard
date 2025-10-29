import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RepoContextType {
  owner: string | null;
  repo: string | null;
  setRepoInfo: (owner: string, repo: string) => void;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const RepoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [owner, setOwner] = useState<string | null>(null);
  const [repo, setRepo] = useState<string | null>(null);

  const setRepoInfo = (newOwner: string, newRepo: string) => {
    setOwner(newOwner);
    setRepo(newRepo);
  };

  return (
    <RepoContext.Provider value={{ owner, repo, setRepoInfo }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error('useRepo must be used within a RepoProvider');
  }
  return context;
};
