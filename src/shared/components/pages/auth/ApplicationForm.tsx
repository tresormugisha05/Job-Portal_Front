import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useApplications } from '../../../hooks/useApplications';
import { jobService, type Job } from '../../../services/api/jobs';
import { uploadService } from '../../../services/api/upload';
import Loader from '../../ui/Loader';

interface ApplicationFormProps {
  jobId: string;
  job?: Job;
  onClose?: () => void;
}

export default function ApplicationForm({ jobId, job, onClose }: ApplicationFormProps) {
  const { isAuthenticated } = useAuth();
  const { submitApplication } = useApplications();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    coverLetter: '',
    phone: '',
    experience: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(job || null);
  const [loadingJob, setLoadingJob] = useState(!job);

  // Fetch job details if not provided
  useState(() => {
    if (!job && jobId) {
      const fetchJob = async () => {
        try {
          const jobData = await jobService.getJobById(jobId);
          setCurrentJob(jobData);
        } catch (err) {
          setError('Failed to load job details');
        } finally {
          setLoadingJob(false);
        }
      };
      fetchJob();
    }
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loadingJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Job Not Found</h2>
          <p className="text-gray-600">The job you're trying to apply for is not available.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!resumeFile) {
      setError('Please upload your resume');
      return;
    }

    setIsLoading(true);

    try {
      // Upload resume first if provided
      let resumeUrl = '';
      if (resumeFile) {
        const uploadResult = await uploadService.uploadResume(resumeFile);
        resumeUrl = uploadResult.url;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('resumeUrl', resumeUrl);

      await submitApplication(jobId, formDataToSend);
      
      // Success - redirect or show success message
      navigate('/applications?success=true');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Application failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a PDF or Word document');
        return;
      }

      if (file.size > maxSize) {
        setError('File size must be less than 5MB');
        return;
      }

      setResumeFile(file);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Apply for {currentJob.title}</h1>
            <p className="text-blue-100 mt-1">{currentJob.company} • {currentJob.location}</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Position Summary</h3>
                <p className="text-sm text-gray-600">{currentJob.description}</p>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 3 years"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume * (PDF or Word, max 5MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Choose File
                  </label>
                  {resumeFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {resumeFile.name}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
