import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { announcementsAPI } from '../services/api';
import { PARISH_NAME, PARISH_DIOCESE } from '../components/Map';
import type { Announcement } from '../types';

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementsAPI.getAll();
        setAnnouncements(data.slice(0, 3)); // Show latest 3
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
      {/* Hero Section with Church Background */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 md:py-48"
        style={{
          backgroundImage: 'url(/images/church.jpg)',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        
        {/* Avatars - Pope (left) and Bishop (right) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex justify-between items-start pt-4 md:pt-2">
            {/* Pope Avatar - Extreme Left */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-3">
                <img
                  src="/images/Pope.jpeg"
                  alt="Pope"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow-lg text-center max-w-[120px] md:max-w-[150px]">
                His Holiness Pope Leo XIV
              </p>
            </div>

            {/* Bishop Avatar - Extreme Right */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-3">
                <img
                  src="/images/bishop.jpeg"
                  alt="Bishop"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow-lg text-center max-w-[120px] md:max-w-[150px]">
                His Excellency Bishop Michael Bibi 
                Bishop of Buea Diocese
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl tracking-tight">
            {PARISH_NAME} 
          </h1>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-2xl tracking-tight">(Holy Ground)</h3>
          <a 
            href="https://bueadiocese.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl md:text-2xl mb-2 drop-shadow-lg font-medium text-primary-200 hover:text-primary-100 transition-colors duration-200 no-underline decoration-2 inline-block"
          >
            {PARISH_DIOCESE}
          </a>
         
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mass-schedule"
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              View Mass Schedule
            </Link>
            <Link
              to="/contact"
              className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Parish Highlights</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Discover what makes our community special</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-primary-600 text-5xl mb-6">⛪</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Worship</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join us for Mass and special services throughout the week.
              </p>
              <Link
                to="/mass-schedule"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group"
              >
                View Schedule 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-primary-600 text-5xl mb-6">👥</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get involved in our various ministries and groups.
              </p>
              <Link
                to="/ministries"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group"
              >
                Learn More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-primary-600 text-5xl mb-6">📢</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">News</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay updated with the latest announcements and events.
              </p>
              <Link
                to="/announcements"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group"
              >
                Read More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Announcements</h2>
              <p className="text-gray-600">Stay informed about parish news and events</p>
            </div>
            <Link
              to="/announcements"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 group"
            >
              View All 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">{announcement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {announcement.content}
                    </p>
                    <p className="text-primary-600 text-xs font-medium">
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

