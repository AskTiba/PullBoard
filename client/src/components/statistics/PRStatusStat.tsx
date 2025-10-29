import React from 'react';
import { PullRequest } from '../../types/PullRequest.types';

interface PRStatusStatProps {
  allprs: PullRequest[];
}

const PRStatusStat: React.FC<PRStatusStatProps> = ({ allprs }) => {
  return (
    <div>
      <h2>PR Status Statistics</h2>
      <p>Total PRs: {allprs.length}</p>
      {/* Further implementation for statistics will go here */}
    </div>
  );
};

export default PRStatusStat;
