import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ministriesAPI } from '../../services/api';
import { getStoredUser } from '../../utils/auth';
import type { Ministry } from '../../types';

export default function ManageMinistries() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Ministry | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leader: '',
    photo: '',
    contactInfo: '',
    isActive: true,
  });
  const hasFetchedRef = useRef(false);

  const fetchMinistries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ministriesAPI.getAllAdmin();
      setMinistries(data);
    } catch (error) {
      console.error('Error fetching ministries:', error);
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
      fetchMinistries();
    }
  }, [navigate, fetchMinistries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        leader: formData.leader || undefined,
        photo: formData.photo || undefined,
        contactInfo: formData.contactInfo || undefined,
      };
      if (editing) {
        await ministriesAPI.update(editing._id, submitData);
      } else {
        await ministriesAPI.create(submitData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        name: '',
        description: '',
        leader: '',
        photo: '',
        contactInfo: '',
        isActive: true,
      });
      fetchMinistries();
    } catch (error) {
      console.error('Error saving ministry:', error);
      alert('Failed to save ministry');
    }
  };

  const handleEdit = (ministry: Ministry) => {
    setEditing(ministry);
    setFormData({
      name: ministry.name,
      description: ministry.description,
      leader: ministry.leader || '',
      photo: ministry.photo || '',
      contactInfo: ministry.contactInfo || '',
      isActive: ministry.isActive ?? true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ministry?')) return;
    try {
      await ministriesAPI.delete(id);
      fetchMinistries();
    } catch (error) {
      console.error('Error deleting ministry:', error);
      alert('Failed to delete ministry');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Ministries</h1>
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
              name: '',
              description: '',
              leader: '',
              photo: '',
              contactInfo: '',
              isActive: true,
            });
          }}
          className="mb-6 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          + New Ministry
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Edit' : 'Create'} Ministry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Leader</label>
                  <input
                    type="text"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Info</label>
                  <input
                    type="text"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Email or phone"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Leader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact Info
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
                {ministries.map((ministry) => (
                  <tr key={ministry._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{ministry.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {ministry.leader || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {ministry.contactInfo || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          ministry.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {ministry.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(ministry)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ministry._id)}
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

