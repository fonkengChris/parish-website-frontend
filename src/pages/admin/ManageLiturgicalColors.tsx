import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { liturgicalColorAPI } from '../../services/api';
import { getStoredUser } from '../../utils/auth';
import { useTheme } from '../../contexts/ThemeContext';
import type { LiturgicalColorResponse } from '../../services/api';

interface ColorOverride {
  _id?: string;
  date: string;
  color: 'white' | 'red' | 'green' | 'purple' | 'rose' | 'gold';
  reason?: string;
  createdBy?: {
    username?: string;
    email?: string;
  };
  createdAt?: string;
}

const COLOR_OPTIONS = [
  { value: 'white', label: 'White', hex: '#ffffff', description: 'Christmas & Easter seasons' },
  { value: 'red', label: 'Red', hex: '#dc2626', description: 'Palm Sunday, Good Friday, Pentecost' },
  { value: 'green', label: 'Green', hex: '#16a34a', description: 'Ordinary Time' },
  { value: 'purple', label: 'Purple', hex: '#9333ea', description: 'Advent & Lent' },
  { value: 'rose', label: 'Rose', hex: '#e11d48', description: 'Gaudete & Laetare Sundays' },
  { value: 'gold', label: 'Gold', hex: '#f59e0b', description: 'Special celebrations' },
];

export default function ManageLiturgicalColors() {
  const navigate = useNavigate();
  const { refreshColor } = useTheme();
  const [user, setUser] = useState(getStoredUser());
  const [overrides, setOverrides] = useState<ColorOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOverride, setEditingOverride] = useState<ColorOverride | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    color: 'white' as ColorOverride['color'],
    reason: '',
  });
  const [currentColor, setCurrentColor] = useState<LiturgicalColorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingColor, setFetchingColor] = useState(false);
  const fetchingColorRef = useRef(false);
  const hasFetchedRef = useRef(false);

  const fetchOverrides = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/liturgical-color-overrides', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch overrides');
      const data = await response.json();
      setOverrides(data.overrides || []);
    } catch (err) {
      console.error('Error fetching overrides:', err);
      setError(err instanceof Error ? err.message : 'Failed to load overrides');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentColor = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (fetchingColorRef.current) {
      return;
    }
    
    try {
      fetchingColorRef.current = true;
      setFetchingColor(true);
      const color = await liturgicalColorAPI.getCurrent();
      setCurrentColor(color);
    } catch (err) {
      console.error('Error fetching current color:', err);
      // Don't set error state for current color failures, just log it
    } finally {
      fetchingColorRef.current = false;
      setFetchingColor(false);
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
      fetchOverrides();
      fetchCurrentColor();
    }
  }, [navigate, fetchOverrides, fetchCurrentColor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const url = editingOverride
        ? `/api/liturgical-color-overrides/${formData.date}`
        : '/api/liturgical-color-overrides';
      
      const method = editingOverride ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: formData.date,
          color: formData.color,
          reason: formData.reason,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save override');
      }

      await fetchOverrides();
      await fetchCurrentColor();
      // Refresh the theme to apply the new override immediately
      await refreshColor();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save override');
    }
  };

  const handleEdit = (override: ColorOverride) => {
    setEditingOverride(override);
    setFormData({
      date: override.date.split('T')[0],
      color: override.color,
      reason: override.reason || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (date: string) => {
    if (!confirm('Are you sure you want to delete this color override?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/liturgical-color-overrides/${date}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete override');
      
      await fetchOverrides();
      await fetchCurrentColor();
      // Refresh the theme to apply changes immediately
      await refreshColor();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete override');
    }
  };

  const resetForm = () => {
    setFormData({
      date: '',
      color: 'white',
      reason: '',
    });
    setEditingOverride(null);
    setShowForm(false);
  };

  const getColorInfo = (colorName: string) => {
    return COLOR_OPTIONS.find(c => c.value === colorName) || COLOR_OPTIONS[0];
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Liturgical Colors</h1>
              <p className="text-sm text-gray-600 mt-1">Override the automatic liturgical color for specific dates</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Color Display */}
        {currentColor && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Today's Liturgical Color</h2>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg shadow-md"
                style={{ backgroundColor: currentColor.hex }}
              ></div>
              <div>
                <p className="text-2xl font-bold capitalize text-gray-900">{currentColor.color}</p>
                <p className="text-sm text-gray-600">{currentColor.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingOverride ? 'Edit Color Override' : 'Add Color Override'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {COLOR_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.color === option.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={option.value}
                        checked={formData.color === option.value}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value as ColorOverride['color'] })}
                        className="sr-only"
                      />
                      <div
                        className="w-8 h-8 rounded border-2 border-gray-300"
                        style={{ backgroundColor: option.hex }}
                      ></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason (Optional)
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="e.g., Special feast day, local celebration..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingOverride ? 'Update Override' : 'Add Override'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              + Add Color Override
            </button>
          </div>
        )}

        {/* Overrides List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Color Overrides</h2>
            <p className="text-sm text-gray-600 mt-1">
              {overrides.length} override{overrides.length !== 1 ? 's' : ''} configured
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-500">Loading overrides...</p>
            </div>
          ) : overrides.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>No color overrides configured.</p>
              <p className="text-sm mt-2">Add an override to manually set the liturgical color for a specific date.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {overrides.map((override) => {
                const colorInfo = getColorInfo(override.color);
                return (
                  <div key={override._id || override.date} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-lg shadow-md"
                          style={{ backgroundColor: colorInfo.hex }}
                        ></div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {new Date(override.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">{colorInfo.label}</p>
                          {override.reason && (
                            <p className="text-sm text-gray-500 mt-1">{override.reason}</p>
                          )}
                          {override.createdBy && (
                            <p className="text-xs text-gray-400 mt-1">
                              Created by {override.createdBy.username || override.createdBy.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(override)}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(override.date)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

