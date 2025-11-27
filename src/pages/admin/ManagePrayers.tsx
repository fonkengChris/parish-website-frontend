import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { prayersAPI } from '../../services/api';
import { getStoredUser } from '../../utils/auth';
import { PRAYER_CATEGORY_OPTIONS } from '../../data/constants';
import type { Prayer, PrayerCategory } from '../../types';

export default function ManagePrayers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Prayer | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: PrayerCategory;
    isActive: boolean;
  }>({
    title: '',
    content: '',
    category: 'other',
    isActive: true,
  });
  const hasFetchedRef = useRef(false);

  const fetchPrayers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await prayersAPI.getAllAdmin();
      setPrayers(data);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
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
      fetchPrayers();
    }
  }, [navigate, fetchPrayers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData: Partial<Prayer> = {
        ...formData,
        category: formData.category,
      };
      if (editing) {
        await prayersAPI.update(editing._id, submitData);
      } else {
        await prayersAPI.create(submitData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        content: '',
        category: 'other',
        isActive: true,
      });
      fetchPrayers();
    } catch (error) {
      console.error('Error saving prayer:', error);
      alert('Failed to save prayer');
    }
  };

  const handleEdit = (prayer: Prayer) => {
    setEditing(prayer);
    setFormData({
      title: prayer.title,
      content: prayer.content,
      category: prayer.category || 'other',
      isActive: prayer.isActive ?? true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prayer?')) return;
    try {
      await prayersAPI.delete(id);
      fetchPrayers();
    } catch (error) {
      console.error('Error deleting prayer:', error);
      alert('Failed to delete prayer');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Prayers</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary-600 hover:text-primary-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({
              title: '',
              content: '',
              category: 'other',
              isActive: true,
            });
          }}
          className="mb-6 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          + New Prayer
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Edit' : 'Create'} Prayer
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content *</label>
                <textarea
                  required
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PrayerCategory })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  {PRAYER_CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <label>Active</label>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prayers.map((prayer) => (
                  <tr key={prayer._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{prayer.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 capitalize">
                        {prayer.category || 'other'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2 max-w-md">
                        {prayer.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          prayer.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {prayer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(prayer)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prayer._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

