import { useState, useEffect } from 'react';
import { jobService, type Job, type JobFilters } from '../services/api/jobs';

export const useJobs = (filters: JobFilters = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await jobService.getJobs(filters);
        setJobs(data.data || data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error('Jobs fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [JSON.stringify(filters)]);

  return { jobs, loading, error };
};
