import React, { useState } from 'react';

interface RepoFormProps {
  handleSubmit: (owner: string, repo: string) => void;
}

const RepoForm: React.FC<RepoFormProps> = ({ handleSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(githubUrlRegex);

    if (match && match[1] && match[2]) {
      const owner = match[1];
      let repo = match[2];
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      handleSubmit(owner, repo);
    } else {
      alert('Please enter a valid GitHub repository URL.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex space-x-2 p-4 bg-gray-100 rounded">
      <input
        type="text"
        placeholder="GitHub Repository URL (e.g., https://github.com/owner/repo)"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border p-2 rounded w-96"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Fetch PRs
      </button>
    </form>
  );
};

export default RepoForm;
