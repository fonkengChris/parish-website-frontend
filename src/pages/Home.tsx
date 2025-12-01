import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { announcementsAPI, eventsAPI } from '../services/api';
import { PARISH_NAME, PARISH_DIOCESE } from '../components/Map';
import type { Announcement, Event } from '../types';

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch announcements and events in parallel
        const [announcementsData, eventsData] = await Promise.all([
          announcementsAPI.getAll(),
          eventsAPI.getAll()
        ]);
        
        setAnnouncements(announcementsData.slice(0, 3)); // Show latest 3
        
        // Filter events for next 7 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
        
        const upcomingEvents = eventsData.filter(event => {
          const eventDate = new Date(event.startDate);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today && eventDate <= sevenDaysLater;
        }).slice(0, 3); // Show latest 3
        
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      {/* <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Parish Highlights</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover what makes our community special</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                ⛪
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Worship</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join us for Mass and special services throughout the week.
              </p>
              <Link
                to="/mass-schedule"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group/link"
              >
                View Schedule 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get involved in our various ministries and groups.
              </p>
              <Link
                to="/ministries"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group/link"
              >
                Learn More 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Events</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover upcoming parish events, celebrations, and gatherings.
              </p>
              <Link
                to="/events"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group/link"
              >
                View Events 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                📢
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">News</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay updated with the latest announcements and events.
              </p>
              <Link
                to="/announcements"
                className="text-primary-600 hover:text-primary-700 font-semibold mt-4 inline-flex items-center gap-2 group/link"
              >
                Read More 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Encouragement to Grow in Faith */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Grow in Your Faith</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nourish your soul each day through Scripture and the teaching of the Church.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Immerse Yourself in the Holy Bible</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Make a habit of reading the Scriptures daily. God speaks to us through His Word,
                strengthening, guiding, and consoling us in every circumstance.
              </p>
              <a
                href="https://catenabible.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800"
              >
                Read the Bible online
                <span>↗</span>
              </a>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Deepen Your Faith with the Catechism</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Catechism of the Catholic Church presents the faith clearly and completely.
                Regular reading will help you better understand what the Church believes and teaches.
              </p>
              <a
                href="https://www.vatican.va/archive/ENG0015/_INDEX.HTM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800"
              >
                Read the Catechism online
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements & Upcoming Events */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Latest News & Upcoming Events</h2>
              <p className="text-gray-600 text-lg">Stay informed about parish news and upcoming events</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/announcements"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
              >
                All Announcements 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to="/events"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
              >
                All Events 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex flex-col items-center">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
                <p className="text-gray-500 text-lg font-medium">Loading content...</p>
              </div>
            </div>
          ) : announcements.length === 0 && events.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg font-medium">No announcements or events at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Announcements */}
              {announcements.map((announcement) => (
                <Link
                  key={announcement._id}
                  to={`/announcements/${announcement._id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  {announcement.image && (
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                          Announcement
                        </span>
                      </div>
                    </div>
                  )}
                  {!announcement.image && (
                    <div className="relative overflow-hidden h-56 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <div className="text-6xl text-white opacity-80">📢</div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-primary-600 text-xs font-semibold rounded-full">
                          Announcement
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">{announcement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {announcement.content}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <p className="text-primary-600 text-xs font-semibold">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
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
              
              {/* Upcoming Events */}
              {events.map((event) => (
                <Link
                  key={event._id}
                  to="/events"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  {event.image && (
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                          Event
                        </span>
                      </div>
                    </div>
                  )}
                  {!event.image && (
                    <div className="relative overflow-hidden h-56 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      {/* Calendar-style date badge */}
                      <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-xl">
                        <div className="w-full text-center text-xs font-semibold tracking-wide text-white bg-orange-500 rounded-t-2xl py-1">
                          EVENT
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <span className="text-3xl font-extrabold text-gray-900">
                            {new Date(event.startDate).getDate()}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-orange-600 text-xs font-semibold rounded-full">
                          Event
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <span className="text-primary-600 text-sm font-semibold">📅</span>
                        <p className="text-primary-600 text-xs font-semibold flex-1">
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {event.location && (
                        <div className="flex items-start gap-2">
                          <span className="text-primary-600 text-sm font-semibold">📍</span>
                          <p className="text-gray-600 text-xs flex-1 line-clamp-1">{event.location}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-end pt-2">
                        <span className="text-primary-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View Details <span>→</span>
                        </span>
                      </div>
                    </div>
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

