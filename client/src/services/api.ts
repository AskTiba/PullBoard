/**
 * PullBoard Unified API Service
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface User {
  id: string;
  githubId: string;
  username: string;
  email?: string;
  avatarUrl?: string;
}

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

export interface DashboardStats {
  totalPRs: number;
  mergedPRs: number;
  avgMergeTime: string;
  contributors: number;
  additions: number;
  deletions: number;
  volumePending: boolean;
  volumeUnsupported: boolean;
  activityData: { name: string; prs: number }[];
  churnHistory: { timestamp: number; additions: number; deletions: number }[];
  commitHistory: { week: number; total: number; days: number[] }[];
  projectTimeline?: number;
  totalCommits?: number;
}

export interface AnalyticsData {
  velocityTrend: { date: string; value: number }[];
  repositoryHealth: { name: string; score: number; status: 'healthy' | 'warning' | 'critical' }[];
  reviewEfficiency: { label: string; hours: number }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  style: string;
  impactScore: number;
  avatar: string;
  prsMerged: number;
  reviewCount: number;
  additions: number;
  deletions: number;
  responsiveness: string;
  status: 'online' | 'busy' | 'offline';
  auditVersion?: string;
  weeklyHistory?: { w: number; a: number; d: number; c: number }[];
}

const getHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Failed to resolve identity");
  return response.json();
};

export const fetchOpenPRs = async (repo: string): Promise<PullRequest[]> => {
  const response = await fetch(`${API_BASE_URL}/prs/repo?repo=${repo}&state=open`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Failed to fetch PRs");
  return response.json();
};

export const fetchClosedPRs = async (repo: string): Promise<PullRequest[]> => {
  const response = await fetch(`${API_BASE_URL}/prs/repo?repo=${repo}&state=closed`, { headers: getHeaders() });
  if (!response.ok) throw new Error("Failed to fetch history");
  return response.json();
};

export const fetchDashboardStats = async (repo: string): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/repos/stats?repo=${repo}`, { headers: getHeaders() });
  
  if (!response.ok) {
      console.error("Dashboard Stats Fetch Failed:", response.status);
      throw new Error("Failed to fetch stats");
  }
  
  const data = await response.json();
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const latestActivity = data.commitHistory?.[data.commitHistory.length - 1];
  const dynamicActivityData = latestActivity ? latestActivity.days.map((prs: number, i: number) => ({
    name: days[i],
    prs: prs
  })) : [
    { name: "Mon", prs: 0 }, { name: "Tue", prs: 0 }, { name: "Wed", prs: 0 },
    { name: "Thu", prs: 0 }, { name: "Fri", prs: 0 }, { name: "Sat", prs: 0 }, { name: "Sun", prs: 0 },
  ];
  
  return {
    totalPRs: data.totalPRs || 0,
    mergedPRs: data.mergedPRs || 0,
    avgMergeTime: "1.2d",
    contributors: data.contributors || 0,
    additions: data.additions || 0,
    deletions: data.deletions || 0,
    volumePending: data.volumePending || false,
    volumeUnsupported: data.volumeUnsupported || false,
    churnHistory: data.churnHistory || [],
    commitHistory: data.commitHistory || [],
    activityData: dynamicActivityData,
    projectTimeline: data.projectTimeline || 0,
    totalCommits: data.totalCommits || 0
  };
};

export const fetchTeamData = async (repo: string): Promise<TeamMember[]> => {
  const timestamp = new Date().getTime();
  const response = await fetch(`${API_BASE_URL}/repos/contributors?repo=${repo}&t=${timestamp}`, { headers: getHeaders() });
  
  if (!response.ok) throw new Error("Failed to fetch team data");
  return response.json();
};

export const fetchAnalyticsData = async (repo: string): Promise<AnalyticsData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    velocityTrend: [
      { date: "May 08", value: 4.2 }, { date: "May 09", value: 3.8 }, { date: "May 10", value: 4.5 },
      { date: "May 11", value: 5.2 }, { date: "May 12", value: 4.8 }, { date: "May 13", value: 6.1 }, { date: "May 14", value: 5.5 },
    ],
    repositoryHealth: [
      { name: repo || "System/Main", score: 94, status: 'healthy' },
      { name: "PullBoard/client", score: 82, status: 'healthy' },
    ],
    reviewEfficiency: [
      { label: "Initial Review", hours: 4.2 },
      { label: "Revision Time", hours: 12.8 },
      { label: "Approval Latency", hours: 2.1 },
    ]
  };
};
