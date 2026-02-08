import apiClient from './client';

export interface ApplicationData {
  jobId: string;
  coverLetter?: string;
  resume?: File;
  phone?: string;
  experience?: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  coverLetter?: string;
  resumeUrl?: string;
  appliedDate: string;
  job: {
    title: string;
    company: string;
  };
}

export const applicationService = {
  submitApplication: async (jobId: string, data: FormData) => {
    const response = await apiClient.post(`/applications/${jobId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getMyApplications: async () => {
    const response = await apiClient.get('/applications/user/me');
    return response.data;
  },
  
  getApplicationsByJob: async (jobId: string) => {
    const response = await apiClient.get(`/applications/job/${jobId}`);
    return response.data;
  },
  
  getApplicationById: async (id: string) => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },
  
  updateApplicationStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/applications/${id}/status`, { status });
    return response.data;
  },
  
  deleteApplication: async (id: string) => {
    const response = await apiClient.delete(`/applications/${id}`);
    return response.data;
  }
};
