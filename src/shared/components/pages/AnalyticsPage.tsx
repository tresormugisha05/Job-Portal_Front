import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAdminAnalytics } from '../../hooks/useAdmin';
import Loader from '../ui/Loader';

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

export default function AnalyticsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeChart, setActiveChart] = useState<'users' | 'jobs' | 'applications'>('users');
  
  const { analytics, loading } = useAdminAnalytics(period);

  // Check if user is admin
  useEffect(() => {
    if (user?.role !== 'Admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const getChartData = (): ChartData => {
    if (!analytics) return { labels: [], datasets: [] };

    switch (activeChart) {
      case 'users':
        return {
          labels: analytics.userGrowth.map(item => item.date),
          datasets: [{
            label: 'New Users',
            data: analytics.userGrowth.map(item => item.count),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }]
        };
      case 'jobs':
        return {
          labels: analytics.jobPostingTrends.map(item => item.date),
          datasets: [{
            label: 'Job Postings',
            data: analytics.jobPostingTrends.map(item => item.count),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }]
        };
      case 'applications':
        return {
          labels: analytics.applicationTrends.map(item => item.date),
          datasets: [{
            label: 'Applications',
            data: analytics.applicationTrends.map(item => item.count),
            borderColor: 'rgb(245, 158, 11)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
          }]
        };
      default:
        return { labels: [], datasets: [] };
    }
  };

  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track platform performance and trends</p>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod('7d')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === '7d'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setPeriod('30d')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === '30d'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setPeriod('90d')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === '90d'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Last 90 Days
              </button>
            </div>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trends</h3>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveChart('users')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeChart === 'users'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveChart('jobs')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeChart === 'jobs'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => setActiveChart('applications')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeChart === 'applications'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Applications
                </button>
              </div>
            </div>

            {/* Simple Chart Visualization */}
            <div className="h-64 flex items-end justify-between border-b border-gray-200 pb-4">
              {chartData.labels.map((label, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${Math.max(10, (chartData.datasets[0]?.data[index] || 0) / Math.max(...chartData.datasets[0]?.data) * 200)}px`
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    {new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              {chartData.datasets.map((dataset, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dataset.borderColor }}
                  />
                  <span className="text-sm text-gray-600">{dataset.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Employers */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Employers</h3>
            <div className="space-y-3">
              {analytics?.topEmployers.slice(0, 10).map((employer, index) => (
                <div key={employer.employerId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{employer.companyName}</p>
                    <p className="text-sm text-gray-500">{employer.jobCount} jobs</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics?.popularCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{category.category}</span>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(category.count / Math.max(...analytics.popularCategories.map(c => c.count))) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Growth</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Users</span>
                <span className="font-medium text-gray-900">
                  {analytics?.userGrowth.reduce((sum, item) => sum + item.count, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jobs</span>
                <span className="font-medium text-gray-900">
                  {analytics?.jobPostingTrends.reduce((sum, item) => sum + item.count, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-medium text-gray-900">
                  {analytics?.applicationTrends.reduce((sum, item) => sum + item.count, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Daily</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">New Users</span>
                <span className="font-medium text-gray-900">
                  {analytics?.userGrowth.length ? 
                    Math.round(analytics.userGrowth.reduce((sum, item) => sum + item.count, 0) / analytics.userGrowth.length) : 0
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Jobs</span>
                <span className="font-medium text-gray-900">
                  {analytics?.jobPostingTrends.length ? 
                    Math.round(analytics.jobPostingTrends.reduce((sum, item) => sum + item.count, 0) / analytics.jobPostingTrends.length) : 0
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-medium text-gray-900">
                  {analytics?.applicationTrends.length ? 
                    Math.round(analytics.applicationTrends.reduce((sum, item) => sum + item.count, 0) / analytics.applicationTrends.length) : 0
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Peak Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Most Active Day</span>
                <span className="font-medium text-gray-900">
                  {analytics?.userGrowth.length ? 
                    new Date(Math.max(...analytics.userGrowth.map(d => new Date(d.date).getTime()))).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Peak Users</span>
                <span className="font-medium text-gray-900">
                  {analytics?.userGrowth.length ? 
                    Math.max(...analytics.userGrowth.map(d => d.count))
                    : 0
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Peak Jobs</span>
                <span className="font-medium text-gray-900">
                  {analytics?.jobPostingTrends.length ? 
                    Math.max(...analytics.jobPostingTrends.map(d => d.count))
                    : 0
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
