import Layout from '../components/Layout';

export default function Sermons() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Sermons</h1>
          <p className="text-gray-600 text-lg">
            Explore our collection of sermons and homilies.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sermons Coming Soon</h2>
            <p className="text-gray-600 text-lg">
              We are working on bringing you inspiring sermons and homilies from our priests.
              Check back soon for updates.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

