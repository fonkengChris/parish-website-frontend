import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { authAPI } from '../services/api';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [parishionerId, setParishionerId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
      };

      const response = await authAPI.register(registrationData);
      setParishionerId(response.parishioner._id);
      
      // Store user and parishioner IDs in localStorage for profile access
      localStorage.setItem('parishionerId', response.parishioner._id);
      localStorage.setItem('userId', response.user._id);
      localStorage.setItem('parishionerEmail', formData.email);
      
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-10 text-center shadow-2xl">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">Registration Successful!</h2>
            <p className="text-green-700 mb-8 text-lg">
              Thank you for registering with our parish. Welcome to our community!
            </p>
            <div className="space-y-4">
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link
                         to={`/profile/${parishionerId}`}
                         className="inline-block px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                       >
                         View Profile
                       </Link>
                       <Link
                         to={`/profile/edit/${parishionerId}`}
                         className="inline-block px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 font-semibold transition-all duration-300 transform hover:scale-105"
                       >
                         Complete Your Profile
                       </Link>
                     </div>
              <p className="text-sm text-green-700 mt-6">
                You can add more details about yourself, family members, sacraments, and ministries.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Parishioner Registration</h1>
          <p className="text-gray-600 text-lg">
            Join our parish community! Please provide your basic information to get started.
          </p>
        </div>

        {error && (
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
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
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
          </div>

          {/* Password Section - Separate from other fields */}
          <div className="border-t-2 border-gray-200 pt-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="At least 6 characters"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Link
              to="/"
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already registered?{' '}
            <Link to="/profile" className="text-primary-600 hover:text-primary-700 font-medium">
              Access your profile
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
