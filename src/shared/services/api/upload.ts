import apiClient from './client';

export interface UploadResponse {
  url: string;
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  etag: string;
}

export const uploadService = {
  uploadResume: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await apiClient.post('/upload/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${progress}%`);
        }
      },
    });
    return response.data;
  },
  
  uploadProfilePicture: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('profile', file);
    
    const response = await apiClient.post('/upload/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  uploadDocument: async (file: File, documentType: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);
    
    const response = await apiClient.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
