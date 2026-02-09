import { useState, useEffect } from 'react';
import { applicationService, type Application } from '../services/api/applications';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getMyApplications();
      setApplications(data.data || data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Applications fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const submitApplication = async (jobId: string, formData: FormData) => {
    try {
      const result = await applicationService.submitApplication(jobId, formData);
      await fetchApplications(); // Refresh the list
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      await fetchApplications(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  return { 
    applications, 
    loading, 
    error, 
    submitApplication, 
    updateApplicationStatus,
    refetch: fetchApplications 
  };
};
