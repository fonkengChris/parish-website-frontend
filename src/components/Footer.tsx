import { Link } from 'react-router-dom';
import { PARISH_NAME, PARISH_DIOCESE } from './Map';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-primary-900 to-primary-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-2">{PARISH_NAME}</h3>
            <p className="text-sm text-primary-300 mb-3">{PARISH_DIOCESE}</p>
            <p className="text-sm leading-relaxed text-gray-300">
              Serving our community with faith, hope, and love. Join us in worship and fellowship.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-primary-600">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/mass-schedule" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Mass Schedule
                </Link>
              </li>
              <li>
                <Link 
                  to="/announcements" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Announcements
                </Link>
              </li>
              <li>
                <Link 
                  to="/prayers" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Prayers
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Ministries & Sacraments Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-primary-600">
              Ministries & Sacraments
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/ministries" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Ministries
                </Link>
              </li>
              <li>
                <Link 
                  to="/sacraments" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  Sacraments
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 group-hover:bg-primary-300 transition-colors"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-primary-600">
              Get In Touch
            </h3>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              Visit our contact page for office hours, location information, and to reach out to us.
            </p>
            <Link 
              to="/contact"
              className="inline-block mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-md transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {PARISH_NAME}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/about-us" className="hover:text-white transition-colors duration-200">
                About
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors duration-200">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

