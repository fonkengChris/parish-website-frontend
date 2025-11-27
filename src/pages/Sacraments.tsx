import Layout from '../components/Layout';
import { SACRAMENTS } from '../data/sacraments';

export default function Sacraments() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Sacraments Information</h1>
          <p className="text-gray-600 text-lg">
            Learn about the sacraments and their requirements.
          </p>
        </div>

        <div className="space-y-8">
          {SACRAMENTS.map((sacrament, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary-700">
                {sacrament.name}
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{sacrament.description}</p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold mb-4 text-gray-900 text-lg">Requirements:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {sacrament.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-base leading-relaxed">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl border border-primary-200 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Need More Information?</h2>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            For questions about any sacrament or to schedule a sacrament, please contact
            the parish office. We are here to help guide you through these important
            moments in your faith journey.
          </p>
          <a
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 group text-lg"
          >
            Contact Us 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </section>
      </div>
    </Layout>
  );
}

