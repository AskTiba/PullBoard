import React, { useState, useMemo, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { DependencyHistory } from '../types/formatted.types';
import { useAuth } from '../context/AuthContext';
import { useRepo } from '../context/RepoContext';
import TimelineView from '../components/TimelineView'; // Import the new component

const DependencyTimeMachine: React.FC = () => {
    const { owner: contextOwner, repo: contextRepo } = useRepo();
    const [owner, setOwner] = useState(contextOwner || '');
    const [repo, setRepo] = useState(contextRepo || '');
    const [dependencyName, setDependencyName] = useState('react');
    const { token } = useAuth();

    // Track if a fetch has been attempted
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    useEffect(() => {
        if (contextOwner) setOwner(contextOwner);
        if (contextRepo) setRepo(contextRepo);
    }, [contextOwner, contextRepo]);

    const { data, isLoading, isFetching, error } = useFetch<DependencyHistory[]>(
        ['dependencyHistory', owner, repo, dependencyName],
        `/api/${owner}/${repo}/dependency-history`,
        { method: 'GET' },
        { enabled: !!(owner && repo && token), staleTime: Infinity }, // Set staleTime to Infinity
        token || undefined
    );

    // Set hasAttemptedFetch to true once the fetch is enabled and data is being loaded or an error occurs
    useEffect(() => {
        if (owner && repo && token) {
            setHasAttemptedFetch(true);
        }
    }, [owner, repo, token]);

    const timelineSnapshots = useMemo(() => {
        if (!data) return [];

        const snapshots = [];
        let previousDependencies: Record<string, string> = {};
        let previousDevDependencies: Record<string, string> = {};

        // Iterate through data in chronological order (data is reversed, so iterate from end)
        for (let i = data.length - 1; i >= 0; i--) {
            const entry = data[i];
            const currentDependencies = entry.dependencies;
            const currentDevDependencies = entry.devDependencies;

            const added: string[] = [];
            const updated: { name: string; from: string; to: string; type?: string }[] = [];
            const removed: string[] = [];

            // Compare current dependencies with previous ones
            // Check for added and updated dependencies
            for (const depName in currentDependencies) {
                const currentVersion = currentDependencies[depName];
                const previousVersion = previousDependencies[depName];

                if (!previousVersion) {
                    added.push(`${depName}@${currentVersion}`);
                } else if (previousVersion !== currentVersion) {
                    updated.push({ name: depName, from: previousVersion, to: currentVersion });
                }
            }
            for (const depName in currentDevDependencies) {
                const currentVersion = currentDevDependencies[depName];
                const previousVersion = previousDevDependencies[depName];

                if (!previousVersion) {
                    added.push(`${depName}@${currentVersion} (dev)`);
                } else if (previousVersion !== currentVersion) {
                    updated.push({ name: depName, from: previousVersion, to: currentVersion, type: 'dev' });
                }
            }

            // Check for removed dependencies
            for (const depName in previousDependencies) {
                if (!currentDependencies[depName]) {
                    removed.push(depName);
                }
            }
            for (const depName in previousDevDependencies) {
                if (!currentDevDependencies[depName]) {
                    removed.push(`${depName} (dev)`);
                }
            }

            if (added.length > 0 || updated.length > 0 || removed.length > 0) {
                snapshots.push({
                    date: new Date(entry.commit.date).toLocaleDateString(),
                    added,
                    updated,
                    removed,
                    commitMessage: entry.commit.message,
                    commitAuthor: entry.commit.author,
                    commitSha: entry.commit.sha,
                });
            }

            previousDependencies = currentDependencies;
            previousDevDependencies = currentDevDependencies;
        }

        // The data comes in newest first, but we processed it backwards to get previous versions.
        // Now reverse the snapshots to display oldest first in the timeline.
        return snapshots.reverse();
    }, [data]);

    const showInitialGuidance = !owner || !repo;
    const showNoDataMessage = hasAttemptedFetch && !isLoading && !error && (!timelineSnapshots || timelineSnapshots.length === 0) && owner && repo;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dependency Time Machine</h1>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Repository Owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Repository Name"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Dependency Name (e.g., react)"
                    value={dependencyName}
                    onChange={(e) => setDependencyName(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>

            {showInitialGuidance && (
                <p className="text-gray-600">Please enter repository owner and name to view dependency history.</p>
            )}

            {isLoading && !data && <p>Loading dependency history...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}

            {timelineSnapshots.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Dependency Changes for {owner}/{repo}</h2>
                    {isFetching && !isLoading && (
                        <span className="text-sm text-gray-500 animate-pulse ml-2">(Updating data in background...)</span>
                    )}
                    <TimelineView snapshots={timelineSnapshots} />
                </div>
            )}
            {showNoDataMessage && (
                <p>No dependency changes found for {owner}/{repo}.</p>
            )}
        </div>
    );
};

export default DependencyTimeMachine;
