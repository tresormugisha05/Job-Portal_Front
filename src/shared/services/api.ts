import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('job_portal_user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const jobsAPI = {
  createJob: (jobData: any) => api.post('/jobs', jobData),
  getAllJobs: () => api.get('/jobs'),
  getJobById: (id: string) => api.get(`/jobs/${id}`),
  updateJob: (id: string, jobData: any) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`),
  getJobsByEmployer: (employerId: string) => api.get(`/jobs/employer/${employerId}`),
  searchJobs: (params: any) => api.get('/jobs/search', { params }),
};

export default api;
