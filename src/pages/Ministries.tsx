import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ministriesAPI } from '../services/api';
import type { Ministry } from '../types';

export default function Ministries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await ministriesAPI.getAll();
        setMinistries(data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMinistries();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Ministries & Groups</h1>
          <p className="text-gray-600 text-lg">
            Get involved in our parish community through various ministries and groups.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-500 text-lg">Loading ministries...</p>
          </div>
        ) : ministries.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No ministries listed at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => (
              <div
                key={ministry._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {ministry.photo && (
                  <div className="relative overflow-hidden">
                    <img
                      src={ministry.photo}
                      alt={ministry.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900">{ministry.name}</h2>
                  {ministry.leader && (
                    <p className="text-sm text-primary-600 mb-4 font-medium">
                      Leader: <span className="text-gray-700">{ministry.leader}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
                    {ministry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Common Ministries Info */}
        <section className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border border-primary-200 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Common Ministries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold mb-3 text-primary-700 text-lg">Choir</h3>
              <p className="text-sm text-gray-600">Enhance our worship through music and song.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold mb-3 text-primary-700 text-lg">CWA (Catholic Women Association)</h3>
              <p className="text-sm text-gray-600">Women's group focused on service and fellowship.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold mb-3 text-primary-700 text-lg">Youth Group</h3>
              <p className="text-sm text-gray-600">Engaging young people in faith and community.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-bold mb-3 text-primary-700 text-lg">Legion of Mary</h3>
              <p className="text-sm text-gray-600">Dedicated to prayer and apostolic work.</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-700 font-medium">
            For more information about joining any ministry, please contact the parish office.
          </p>
        </section>
      </div>
    </Layout>
  );
}

