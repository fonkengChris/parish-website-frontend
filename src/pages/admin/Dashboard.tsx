import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { announcementsAPI, eventsAPI } from '../../services/api';
import { getStoredUser, clearStoredAuth } from '../../utils/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
  });
  const hasFetchedRef = useRef(false);

  const fetchStats = useCallback(async () => {
    try {
      const [announcements, events] = await Promise.all([
        announcementsAPI.getAllAdmin(),
        eventsAPI.getAllAdmin(),
      ]);
      setStats({
        announcements: announcements.length,
        events: events.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    // Only fetch once on mount
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchStats();
    }
  }, [navigate, fetchStats]);

  const handleLogout = () => {
    clearStoredAuth();
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Link
                to="/"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Announcements</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.announcements}</p>
            <Link
              to="/admin/announcements"
              className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block"
            >
              Manage →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Events</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.events}</p>
            <Link
              to="/admin/events"
              className="text-primary-600 hover:text-primary-700 text-sm mt-2 inline-block"
            >
              Manage →
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/announcements"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">📢</div>
              <div className="font-medium">Announcements</div>
            </Link>
            <Link
              to="/admin/events"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Events</div>
            </Link>
            <Link
              to="/admin/mass-schedule"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">⛪</div>
              <div className="font-medium">Mass Schedule</div>
            </Link>
            <Link
              to="/admin/ministries"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Ministries</div>
            </Link>
            <Link
              to="/admin/gallery"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">🖼️</div>
              <div className="font-medium">Gallery</div>
            </Link>
            <Link
              to="/admin/prayers"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">🙏</div>
              <div className="font-medium">Prayers</div>
            </Link>
            <Link
              to="/admin/sermons"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">📖</div>
              <div className="font-medium">Sermons</div>
            </Link>
            <Link
              to="/admin/mission-stations"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">📍</div>
              <div className="font-medium">Mission Stations</div>
            </Link>
            <Link
              to="/admin/liturgical-colors"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium">Liturgical Colors</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

