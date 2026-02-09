import apiClient from './client';

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  logo: string;
  logoBg: string;
  tags: string[];
}

export const jobService = {
  getJobs: async (filters: JobFilters = {}) => {
    const response = await apiClient.get('/jobs', { params: filters });
    return response.data;
  },
  
  getJobById: async (id: string) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },
  
  searchJobs: async (query: string) => {
    const response = await apiClient.get('/jobs/search', { 
      params: { q: query } 
    });
    return response.data;
  },
  
  createJob: async (jobData: Partial<Job>) => {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  },
  
  updateJob: async (id: string, jobData: Partial<Job>) => {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },
  
  deleteJob: async (id: string) => {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  }
};
