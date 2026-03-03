import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AdminStats {
  totalNews: number;
  totalSpecialists: number;
  totalPages: number;
  recentNews: any[];
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // In a real app, you'd have a dedicated stats endpoint
      const [newsResponse, specialistsResponse, pagesResponse] = await Promise.all([
        api.get('/news?limit=5'),
        api.get('/contacts'),
        api.get('/pages')
      ]);

      setStats({
        totalNews: newsResponse.data.pagination?.total || newsResponse.data.length,
        totalSpecialists: specialistsResponse.data.length,
        totalPages: pagesResponse.data.length,
        recentNews: newsResponse.data.news || newsResponse.data
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="ml-4 text-sm text-gray-500">Auylga.kz</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">N</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total News
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totalNews || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => navigate('/admin/news')}
                  className="font-medium text-blue-700 hover:text-blue-900"
                >
                  Manage News
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">S</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Specialists
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totalSpecialists || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => navigate('/admin/contacts')}
                  className="font-medium text-green-700 hover:text-green-900"
                >
                  Manage Specialists
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold">P</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Pages
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totalPages || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => navigate('/admin/pages')}
                  className="font-medium text-purple-700 hover:text-purple-900"
                >
                  Manage Pages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent News
            </h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {stats?.recentNews?.slice(0, 5).map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {item.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.published_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => navigate(`/admin/news`)}
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/admin/news')}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all news
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/news')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h4 className="font-semibold text-gray-900">Add News</h4>
              <p className="text-sm text-gray-500 mt-1">Create new news article</p>
            </button>
            <button
              onClick={() => navigate('/admin/contacts')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h4 className="font-semibold text-gray-900">Add Specialist</h4>
              <p className="text-sm text-gray-500 mt-1">Add new specialist</p>
            </button>
            <button
              onClick={() => navigate('/admin/pages')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h4 className="font-semibold text-gray-900">Create Page</h4>
              <p className="text-sm text-gray-500 mt-1">Add new page</p>
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h4 className="font-semibold text-gray-900">View Site</h4>
              <p className="text-sm text-gray-500 mt-1">Go to main site</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
