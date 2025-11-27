import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getStoredUser, isAuthenticated, clearStoredAuth } from '../utils/auth';
import { PARISH_NAME } from './Map';
import type { User } from '../types';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCatholicFaithMenu, setShowCatholicFaithMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Get user on mount and when location changes (to update after login)
  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    } else {
      setUser(null);
    }
  }, [location]);

  // Get user initials
  const getUserInitials = (user: User | null): string => {
    if (!user) return '?';
    
    if (user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    
    return '?';
  };

  // Get user display name
  const getUserDisplayName = (user: User | null): string => {
    if (!user) return 'User';
    
    if (user.username) {
      return user.username;
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return 'User';
  };

  // Handle logout
  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/mass-schedule', label: 'Mass Schedule' },
    { path: '/announcements', label: 'News & Announcements' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const catholicFaithLinks = [
    { path: '/sermons', label: 'Sermons' },
    { path: '/prayers', label: 'Prayers' },
    { path: '/order-of-the-mass', label: 'Order of the Mass' },
    { path: '/benediction', label: 'Benediction' },
  ];

  const isCatholicFaithActive = catholicFaithLinks.some(link => 
    location.pathname === link.path || 
    (link.path === '/prayers' && location.pathname.startsWith('/prayers'))
  );

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            {PARISH_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Catholic Faith Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCatholicFaithMenu(!showCatholicFaithMenu)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  isCatholicFaithActive
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                Catholic Faith
                <svg
                  className={`w-4 h-4 transition-transform ${showCatholicFaithMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCatholicFaithMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowCatholicFaithMenu(false)}
                  ></div>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    {catholicFaithLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setShowCatholicFaithMenu(false)}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActive(link.path)
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
            {user && (user.role === 'admin' || user.role === 'editor') && (
              <Link
                to="/admin/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin/dashboard') || location.pathname.startsWith('/admin/')
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-400 text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors"
                  aria-label="User menu"
                >
                  {getUserInitials(user)}
                </button>
                
                {/* User dropdown menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{getUserDisplayName(user)}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <Link
                        to="/profile/edit"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/profile/change-password"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Change Password
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-primary-500 hover:bg-primary-400 text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-primary-100 hover:bg-primary-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Catholic Faith Mobile Menu */}
            <div>
              <button
                onClick={() => setShowCatholicFaithMenu(!showCatholicFaithMenu)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                  isCatholicFaithActive
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                Catholic Faith
                <svg
                  className={`w-5 h-5 transition-transform ${showCatholicFaithMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCatholicFaithMenu && (
                <div className="pl-6 mt-2 space-y-1">
                  {catholicFaithLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setIsOpen(false);
                        setShowCatholicFaithMenu(false);
                      }}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive(link.path)
                          ? 'bg-primary-800 text-white'
                          : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {user && (user.role === 'admin' || user.role === 'editor') && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/admin/dashboard') || location.pathname.startsWith('/admin/')
                    ? 'bg-primary-900 text-white'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
            {user ? (
              <div className="px-3 py-2 space-y-2">
                <div className="flex items-center space-x-3 px-2 py-2 border-b border-primary-600">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white font-semibold text-sm">
                    {getUserInitials(user)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{getUserDisplayName(user)}</p>
                    <p className="text-xs text-primary-200 capitalize">{user.role}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:bg-primary-600 hover:text-white"
                >
                  View Profile
                </Link>
                <Link
                  to="/profile/edit"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:bg-primary-600 hover:text-white"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/profile/change-password"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:bg-primary-600 hover:text-white"
                >
                  Change Password
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary-500 hover:bg-primary-400 text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 hover:bg-primary-400 text-white"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

