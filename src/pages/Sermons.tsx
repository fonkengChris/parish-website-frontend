import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { sermonsAPI } from '../services/api';
import type { Sermon } from '../types';

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [catechisis, setCatechisis] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'sermons' | 'catechisis'>('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const allContent = await sermonsAPI.getAll();
        const sermonsList = allContent.filter(item => !item.type || item.type === 'sermon');
        const catechisisList = allContent.filter(item => item.type === 'catechisis');
        setSermons(sermonsList);
        setCatechisis(catechisisList);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const getDisplayContent = () => {
    if (activeTab === 'sermons') return sermons;
    if (activeTab === 'catechisis') return catechisis;
    return [...sermons, ...catechisis].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayContent = getDisplayContent();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Sermons & Catechisis</h1>
          <p className="text-gray-600 text-lg">
            Explore our collection of sermons, homilies, and doctrinal teachings.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All ({sermons.length + catechisis.length})
            </button>
            <button
              onClick={() => setActiveTab('sermons')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sermons'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sermons ({sermons.length})
            </button>
            <button
              onClick={() => setActiveTab('catechisis')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'catechisis'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Catechisis ({catechisis.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : displayContent.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📖</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {activeTab === 'sermons' ? 'Sermons' : activeTab === 'catechisis' ? 'Catechisis' : 'Content'} Coming Soon
              </h2>
              <p className="text-gray-600 text-lg">
                {activeTab === 'sermons' 
                  ? 'We are working on bringing you inspiring sermons and homilies from our priests. Check back soon for updates.'
                  : activeTab === 'catechisis'
                  ? 'We are preparing doctrinal teachings and catechisis materials. Check back soon for updates.'
                  : 'We are working on bringing you inspiring content. Check back soon for updates.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {displayContent.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.type === 'catechisis'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-primary-100 text-primary-800'
                      }`}>
                        {item.type === 'catechisis' ? 'Catechisis' : 'Sermon'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      {item.preacher && (
                        <span className="flex items-center">
                          <span className="font-medium">Preacher:</span> {item.preacher}
                        </span>
                      )}
                      <span className="flex items-center">
                        <span className="font-medium">Date:</span> {formatDate(item.date)}
                      </span>
                      {item.reading && (
                        <span className="flex items-center">
                          <span className="font-medium">Reading:</span> {item.reading}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                    {item.content}
                  </p>
                </div>
                {(item.audioUrl || item.videoUrl) && (
                  <div className="mt-4 flex gap-4">
                    {item.audioUrl && (
                      <a
                        href={item.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        🔊 Listen to Audio
                      </a>
                    )}
                    {item.videoUrl && (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        ▶️ Watch Video
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

