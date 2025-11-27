import Layout from '../components/Layout';
import { PARISH_NAME, PARISH_DIOCESE } from '../components/Map';

export default function AboutUs() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">{PARISH_NAME}</h1>
          <p className="text-2xl font-semibold mb-4 text-primary-700">{PARISH_DIOCESE}</p>
          <p className="text-gray-600 text-lg">Learn more about our parish community</p>
        </div>

        {/* History Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-primary-700">Our History</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                {PARISH_NAME} was established with a mission to serve the community and spread
                the message of faith, hope, and love. Over the years, we have grown into a
                vibrant community dedicated to worship, service, and fellowship.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                As part of {PARISH_DIOCESE}, we continue to build on the foundation laid by our founders, embracing
                both tradition and innovation in our ministry to serve God and our neighbors.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border border-primary-200 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-primary-700">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
              Our mission is to:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
              <li>Provide a welcoming community for all who seek God</li>
              <li>Celebrate the sacraments with reverence and joy</li>
              <li>Serve those in need through acts of charity and compassion</li>
              <li>Educate and form disciples of Christ</li>
              <li>Build bridges of understanding and unity</li>
            </ul>
          </div>
        </section>

        {/* Pastoral Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary-700">Pastoral Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Parish Priest</h3>
              <p className="text-gray-600 leading-relaxed">
                Leading our community in faith and service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Associate Priests</h3>
              <p className="text-gray-600 leading-relaxed">
                Supporting the pastoral care of our parish.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Deacons</h3>
              <p className="text-gray-600 leading-relaxed">
                Assisting in liturgy and pastoral ministry.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Parish Staff</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated team supporting parish operations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h2>
          <p className="text-gray-700 mb-4 text-lg">
            For more information about our parish, please visit our{' '}
            <a href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </Layout>
  );
}

