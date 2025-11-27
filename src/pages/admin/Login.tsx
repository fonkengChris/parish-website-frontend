import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { setStoredUser } from '../../utils/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to detect if input is an email
  const isEmail = (str: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Determine if input is email or username and call appropriate API method
      const isEmailInput = isEmail(formData.usernameOrEmail);
      const response = isEmailInput
        ? await authAPI.loginWithEmail(formData.usernameOrEmail, formData.password)
        : await authAPI.login(formData.usernameOrEmail, formData.password);
      
      // Debug: Log the response
      console.log('Login response:', response);
      
      // Verify response has required fields
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      // Save token and user to localStorage
      setStoredUser(response.user, response.token);
      
      // Verify token was saved
      const savedToken = localStorage.getItem('token');
      console.log('Token saved to localStorage:', savedToken ? 'Yes' : 'No');
      
      if (!savedToken) {
        throw new Error('Failed to save token to localStorage');
      }
      
      // Show success message
      setSuccess(true);
      
      // Navigate to home page after a short delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      console.error('Login error details:', {
        error: err,
        response: err.response,
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      
      // Log the full error to console for debugging
      if (err.response) {
        console.error('API Error Response:', {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          headers: err.response.headers
        });
        // Log the actual error message from server
        console.error('Server error message:', err.response.data?.message || 'No message provided');
        console.error('Full error response data:', JSON.stringify(err.response.data, null, 2));
      } else if (err.request) {
        console.error('Network Error - No response received:', err.request);
        console.error('This usually means the backend server is not running or not reachable');
      } else {
        console.error('Error setting up request:', err.message);
      }
      
      const errorMessage = err.response?.data?.message || err.message || 'Invalid credentials';
      console.error('Final error message to display:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your username (admin/editor) or email (parishioner)
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm font-medium">{error}</p>
              <p className="text-red-600 text-xs mt-1">
                Check the browser console (F12) for detailed error information.
              </p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">
                ✅ Login successful! Redirecting to home page...
              </p>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                required
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Username or Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to our parish?{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Register as a parishioner
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

