import apiClient from './client';

export interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  activeEmployers: number;
  activeJobSeekers: number;
  recentSignups: Array<{
    id: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
  recentJobs: Array<{
    id: string;
    title: string;
    company: string;
    createdAt: string;
  }>;
  applicationStats: Array<{
    status: string;
    count: number;
  }>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  isActive: boolean;
  createdAt: string;
  applicationCount: number;
  employerId: string;
}

export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  status: string;
  appliedDate: string;
  resumeUrl?: string;
}

export const adminService = {
  // Dashboard Stats
  getDashboardStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  // User Management
  getUsers: async (page = 1, limit = 10): Promise<{ users: User[], total: number }> => {
    const response = await apiClient.get(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  updateUserStatus: async (userId: string, isActive: boolean): Promise<User> => {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
  },

  // Job Management
  getJobs: async (page = 1, limit = 10): Promise<{ jobs: Job[], total: number }> => {
    const response = await apiClient.get(`/admin/jobs?page=${page}&limit=${limit}`);
    return response.data;
  },

  updateJobStatus: async (jobId: string, isActive: boolean): Promise<Job> => {
    const response = await apiClient.patch(`/admin/jobs/${jobId}/status`, { isActive });
    return response.data;
  },

  deleteJob: async (jobId: string): Promise<void> => {
    await apiClient.delete(`/admin/jobs/${jobId}`);
  },

  // Application Management
  getApplications: async (page = 1, limit = 10): Promise<{ applications: Application[], total: number }> => {
    const response = await apiClient.get(`/admin/applications?page=${page}&limit=${limit}`);
    return response.data;
  },

  updateApplicationStatus: async (applicationId: string, status: string): Promise<Application> => {
    const response = await apiClient.patch(`/admin/applications/${applicationId}/status`, { status });
    return response.data;
  },

  // Analytics
  getAnalytics: async (period: '7d' | '30d' | '90d' = '30d'): Promise<{
    userGrowth: Array<{ date: string; count: number }>;
    jobPostingTrends: Array<{ date: string; count: number }>;
    applicationTrends: Array<{ date: string; count: number }>;
    topEmployers: Array<{ employerId: string; companyName: string; jobCount: number }>;
    popularCategories: Array<{ category: string; count: number }>;
  }> => {
    const response = await apiClient.get(`/admin/analytics?period=${period}`);
    return response.data;
  },

  // System Health
  getSystemHealth: async (): Promise<{
    database: { status: string; responseTime: number };
    api: { status: string; responseTime: number };
    storage: { status: string; used: number; total: number };
  }> => {
    const response = await apiClient.get('/admin/health');
    return response.data;
  }
};
