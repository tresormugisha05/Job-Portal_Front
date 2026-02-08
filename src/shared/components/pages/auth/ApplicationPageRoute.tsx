import { useParams } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';

export default function ApplicationPageRoute() {
  const { jobId } = useParams<{ jobId: string }>();
  
  if (!jobId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Invalid Application</h2>
          <p className="text-gray-600">No job ID provided for application.</p>
        </div>
      </div>
    );
  }

  return <ApplicationForm jobId={jobId} />;
}
