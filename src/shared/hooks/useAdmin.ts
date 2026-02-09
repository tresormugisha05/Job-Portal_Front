import { useState, useEffect } from 'react';
import { adminService, type AdminStats, type User, type Job, type Application } from '../services/api/admin';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch admin stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useAdminUsers(page = 1, limit = 10) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await adminService.getUsers(page, limit);
        setUsers(data.users);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const updatedUser = await adminService.updateUserStatus(userId, isActive);
      setUsers(users.map(user => 
        user.id === userId ? updatedUser : user
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user status');
      throw err;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await adminService.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setTotal(total - 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user');
      throw err;
    }
  };

  return { users, total, loading, error, updateUserStatus, deleteUser };
}

export function useAdminJobs(page = 1, limit = 10) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await adminService.getJobs(page, limit);
        setJobs(data.jobs);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, limit]);

  const updateJobStatus = async (jobId: string, isActive: boolean) => {
    try {
      const updatedJob = await adminService.updateJobStatus(jobId, isActive);
      setJobs(jobs.map(job => 
        job.id === jobId ? updatedJob : job
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update job status');
      throw err;
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      await adminService.deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
      setTotal(total - 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete job');
      throw err;
    }
  };

  return { jobs, total, loading, error, updateJobStatus, deleteJob };
}

export function useAdminApplications(page = 1, limit = 10) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await adminService.getApplications(page, limit);
        setApplications(data.applications);
        setTotal(data.total);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [page, limit]);

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const updatedApplication = await adminService.updateApplicationStatus(applicationId, status);
      setApplications(applications.map(app => 
        app.id === applicationId ? updatedApplication : app
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update application status');
      throw err;
    }
  };

  return { applications, total, loading, error, updateApplicationStatus };
}

export function useAdminAnalytics(period: '7d' | '30d' | '90d' = '30d') {
  const [analytics, setAnalytics] = useState<{
    userGrowth: Array<{ date: string; count: number }>;
    jobPostingTrends: Array<{ date: string; count: number }>;
    applicationTrends: Array<{ date: string; count: number }>;
    topEmployers: Array<{ employerId: string; companyName: string; jobCount: number }>;
    popularCategories: Array<{ category: string; count: number }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAnalytics(period);
        setAnalytics(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  return { analytics, loading, error };
}
