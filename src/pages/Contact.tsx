import { useState } from 'react';
import Layout from '../components/Layout';
import Map, { PARISH_LOCATION, PARISH_NAME, PARISH_DIOCESE } from '../components/Map';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-gray-600 text-lg">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{PARISH_NAME}</h2>
            <p className="text-xl font-semibold mb-8 text-primary-700">{PARISH_DIOCESE}</p>
            <div className="space-y-6 text-gray-700 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold mb-3 text-primary-700 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Address
                </h3>
                <p className="text-gray-600">{PARISH_NAME}, Bonadikombo, Limbe</p>
                <p className="text-gray-600">{PARISH_LOCATION.region}, {PARISH_LOCATION.country}</p>
               
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold mb-3 text-primary-700 flex items-center gap-2">
                  <span className="text-2xl">📞</span> Phone
                </h3>
                <p className="text-gray-600">+237 333 22 11 00</p>
                <p className="text-sm text-gray-500 mt-1">Cameroon (+237)</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold mb-3 text-primary-700 flex items-center gap-2">
                  <span className="text-2xl">✉️</span> Email
                </h3>
                <p className="text-gray-600">info@parishlimbe.cm</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold mb-3 text-primary-700 flex items-center gap-2">
                  <span className="text-2xl">🕐</span> Office Hours
                </h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 12:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
              <Map height="256px" />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>
            {submitted ? (
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-800 font-semibold text-lg">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sacraments">Sacraments</option>
                    <option value="ministries">Ministries</option>
                    <option value="events">Events</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

