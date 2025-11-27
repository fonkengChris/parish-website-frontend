import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sermonsAPI } from '../../services/api';
import { getStoredUser } from '../../utils/auth';
import type { Sermon } from '../../types';

export default function ManageSermons() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    preacher: '',
    date: new Date().toISOString().split('T')[0],
    reading: '',
    audioUrl: '',
    videoUrl: '',
    image: '',
    type: 'sermon' as 'sermon' | 'catechisis',
    isActive: true,
  });
  const hasFetchedRef = useRef(false);

  const fetchSermons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await sermonsAPI.getAllAdmin();
      setSermons(data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
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
      fetchSermons();
    }
  }, [navigate, fetchSermons]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await sermonsAPI.update(editing._id, formData);
      } else {
        await sermonsAPI.create(formData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        content: '',
        preacher: '',
        date: new Date().toISOString().split('T')[0],
        reading: '',
        audioUrl: '',
        videoUrl: '',
        image: '',
        type: 'sermon' as 'sermon' | 'catechisis',
        isActive: true,
      });
      fetchSermons();
    } catch (error) {
      console.error('Error saving sermon:', error);
      alert('Failed to save sermon');
    }
  };

  const handleEdit = (sermon: Sermon) => {
    setEditing(sermon);
    setFormData({
      title: sermon.title,
      content: sermon.content,
      preacher: sermon.preacher || '',
      date: sermon.date ? new Date(sermon.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      reading: sermon.reading || '',
      audioUrl: sermon.audioUrl || '',
      videoUrl: sermon.videoUrl || '',
      image: sermon.image || '',
      type: sermon.type || 'sermon',
      isActive: sermon.isActive ?? true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return;
    try {
      await sermonsAPI.delete(id);
      fetchSermons();
    } catch (error) {
      console.error('Error deleting sermon:', error);
      alert('Failed to delete sermon');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Sermons</h1>
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
              preacher: '',
              date: new Date().toISOString().split('T')[0],
              reading: '',
              audioUrl: '',
              videoUrl: '',
              image: '',
              isActive: true,
            });
          }}
          className="mb-6 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          + New Sermon
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Edit' : 'Create'} Sermon
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sermon' | 'catechisis' })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="sermon">Sermon</option>
                  <option value="catechisis">Catechisis</option>
                </select>
              </div>
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
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Preacher</label>
                  <input
                    type="text"
                    value={formData.preacher}
                    onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reading/Passage</label>
                <input
                  type="text"
                  value={formData.reading}
                  onChange={(e) => setFormData({ ...formData, reading: e.target.value })}
                  placeholder="e.g., John 3:16-21"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Audio URL</label>
                  <input
                    type="url"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video URL</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
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
                {sermons.map((sermon) => (
                  <tr key={sermon._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        sermon.type === 'catechisis'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-primary-100 text-primary-800'
                      }`}>
                        {sermon.type === 'catechisis' ? 'Catechisis' : 'Sermon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{sermon.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sermon.preacher || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(sermon.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          sermon.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {sermon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(sermon)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sermon._id)}
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

