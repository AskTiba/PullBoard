import { useMemo } from "react";
import { FormattedPullRequest, FormattedReview } from "../../types/formatted.types";

interface Contributor {
  name: string;
  prsCreated: number;
  prsMerged: number;
  prsClosedNotMerged: number;
  successRate: string;
  reviewsGiven: number;
  approvedReviewsGiven: number;
  changesRequestedReviewsGiven: number;
  commitsMade: number;
  totalCommitsMade: number;
  totalPRs: number;
  contributorScore: number;
}

export default function TopContributers({ allprs, commitsByAuthor }: { allprs: FormattedPullRequest[], commitsByAuthor: Record<string, number> }) {
  const stats = useMemo(() => {
    const map: Record<string, Contributor> = {};

    allprs.forEach((pr) => {
      if (!map[pr.author.username]) {
        map[pr.author.username] = {
          name: pr.author.username,
          prsCreated: 0,
          prsMerged: 0,
          prsClosedNotMerged: 0,
          successRate: "0%",
          reviewsGiven: 0,
          approvedReviewsGiven: 0,
          changesRequestedReviewsGiven: 0,
          commitsMade: 0,
          totalCommitsMade: 0,
          totalPRs: 0,
          contributorScore: 0,
        };
      }

      map[pr.author.username].prsCreated += 1;
      if (pr.merged_at) {
        map[pr.author.username].prsMerged += 1;
      } else if (pr.state === "closed") {
        map[pr.author.username].prsClosedNotMerged += 1;
      }
      if (pr.commits_count) {
        map[pr.author.username].commitsMade += pr.commits_count;
      }

      if (pr.last_review && pr.last_review.reviewer) {
        const reviewerUsername = pr.last_review.reviewer.username;
        if (!map[reviewerUsername]) {
          map[reviewerUsername] = {
            name: reviewerUsername,
            prsCreated: 0,
            prsMerged: 0,
            prsClosedNotMerged: 0,
            successRate: "0%",
            reviewsGiven: 0,
            approvedReviewsGiven: 0,
            changesRequestedReviewsGiven: 0,
            commitsMade: 0,
            totalCommitsMade: 0,
            totalPRs: 0,
            contributorScore: 0,
          };
        }
        map[reviewerUsername].reviewsGiven += 1;
        if (pr.last_review.state === "APPROVED") {
          map[reviewerUsername].approvedReviewsGiven += 1;
        } else if (pr.last_review.state === "CHANGES_REQUESTED") {
          map[reviewerUsername].changesRequestedReviewsGiven += 1;
        }
      }
    });

    // Add total commits made by each author
    for (const author in commitsByAuthor) {
      if (map[author]) {
        map[author].totalCommitsMade = commitsByAuthor[author];
      } else {
        // If an author has only commits but no PRs or reviews
        map[author] = {
          name: author,
          prsCreated: 0,
          prsMerged: 0,
          prsClosedNotMerged: 0,
          successRate: "0%",
          reviewsGiven: 0,
          approvedReviewsGiven: 0,
          changesRequestedReviewsGiven: 0,
          commitsMade: 0,
          totalCommitsMade: commitsByAuthor[author],
          totalPRs: 0,
          contributorScore: 0,
        };
      }
    }

    const contributorsArray = Object.values(map);

    contributorsArray.forEach((contributor) => {
      contributor.totalPRs = contributor.prsCreated + contributor.prsClosedNotMerged;
      contributor.successRate = `${((contributor.prsMerged / contributor.prsCreated) * 100 || 0).toFixed(2)}%`;
      // Simple composite score: (merged PRs * 2) + created PRs + (approved reviews * 0.5) + (total commits * 0.1)
      contributor.contributorScore = (
        contributor.prsMerged * 2 +
        contributor.prsCreated +
        contributor.approvedReviewsGiven * 0.5 +
        contributor.totalCommitsMade * 0.1
      );
    });

    // Sort contributors by score in descending order
    contributorsArray.sort((a, b) => b.contributorScore - a.contributorScore);

    return { contributors: contributorsArray };

  }, [allprs, commitsByAuthor]);
  return (
    <main className="max-w-screen-xl mx-auto py-8 px-4">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Top Contributors</h3>
      <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto"> {/* Responsive table container */}
        {stats.contributors.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contributor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contributor Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total PRs
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Commits Made
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Reviews Given
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.contributors.map((contributor, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contributor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contributor.contributorScore.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contributor.totalPRs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contributor.successRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contributor.totalCommitsMade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contributor.reviewsGiven}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-gray-500">No data available</div>
        )}
      </div>
    </main>
  );
}