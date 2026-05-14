/**
 * Hestia Unified API Service
 * 
 * Centralized service layer for all external data interactions.
 * Built for performance and strict type safety.
 */

export interface PullRequest {
  id: number;
  title: string;
  author: string;
  repository: string;
  status: 'open' | 'closed' | 'merged';
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  reviewsCount: number;
  labels: string[];
}

// Mock delay to simulate network latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchOpenPRs = async (): Promise<PullRequest[]> => {
  await sleep(1000); // Simulate network
  
  // Return mock data for initial UI/UX testing
  return [
    {
      id: 1,
      title: "feat(auth): implement biometric login for mobile",
      author: "AskTiba",
      repository: "PullBoard/Hestia",
      status: 'open',
      createdAt: "2026-05-14T10:00:00Z",
      updatedAt: "2026-05-14T12:00:00Z",
      commentsCount: 5,
      reviewsCount: 2,
      labels: ["feature", "high-priority", "auth"]
    },
    {
      id: 2,
      title: "refactor(ui): update design tokens to Hestia v2",
      author: "Mohamed-O",
      repository: "PullBoard/client",
      status: 'open',
      createdAt: "2026-05-13T15:30:00Z",
      updatedAt: "2026-05-14T09:00:00Z",
      commentsCount: 3,
      reviewsCount: 1,
      labels: ["ui/ux", "styling"]
    },
    {
      id: 3,
      title: "fix(api): resolve race condition in sales transaction",
      author: "Yusuf-M",
      repository: "ShopMaster/server",
      status: 'open',
      createdAt: "2026-05-14T08:00:00Z",
      updatedAt: "2026-05-14T11:45:00Z",
      commentsCount: 8,
      reviewsCount: 3,
      labels: ["bug", "critical"]
    }
  ];
};

export const fetchClosedPRs = async (): Promise<PullRequest[]> => {
  await sleep(800);
  return [
    {
      id: 101,
      title: "docs: update API documentation for v1 release",
      author: "bantoklara",
      repository: "PullBoard/docs",
      status: 'merged',
      createdAt: "2026-05-10T09:00:00Z",
      updatedAt: "2026-05-11T14:00:00Z",
      commentsCount: 2,
      reviewsCount: 2,
      labels: ["documentation"]
    },
    {
      id: 102,
      title: "feat: add support for dark mode theme",
      author: "henokkhm",
      repository: "PullBoard/client",
      status: 'merged',
      createdAt: "2026-05-08T11:30:00Z",
      updatedAt: "2026-05-09T10:00:00Z",
      commentsCount: 12,
      reviewsCount: 4,
      labels: ["feature", "ui/ux"]
    }
  ];
};

export interface DashboardStats {
  totalPRs: number;
  mergedPRs: number;
  avgMergeTime: string;
  contributors: number;
  activityData: { name: string; prs: number }[];
  topContributors: { name: string; count: number; avatar: string }[];
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  await sleep(1200);
  return {
    totalPRs: 154,
    mergedPRs: 142,
    avgMergeTime: "1.2d",
    contributors: 8,
    activityData: [
      { name: "Mon", prs: 4 },
      { name: "Tue", prs: 7 },
      { name: "Wed", prs: 5 },
      { name: "Thu", prs: 9 },
      { name: "Fri", prs: 12 },
      { name: "Sat", prs: 3 },
      { name: "Sun", prs: 2 },
    ],
    topContributors: [
      { name: "AskTiba", count: 42, avatar: "A" },
      { name: "Mohamed-O", count: 38, avatar: "M" },
      { name: "Yusuf-M", count: 31, avatar: "Y" },
      { name: "Banto-K", count: 25, avatar: "B" },
    ]
  };
};
