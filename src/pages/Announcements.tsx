import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { announcementsAPI } from '../services/api';
import type { Announcement } from '../types';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementsAPI.getAll();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">News & Announcements</h1>
          <p className="text-gray-600 text-lg">Stay informed about parish news and events</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-500 text-lg">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No announcements at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
              <Link
                key={announcement._id}
                to={`/announcements/${announcement._id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                {announcement.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">{announcement.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <p className="text-primary-600 text-xs font-medium">
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <span className="text-primary-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read More <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

