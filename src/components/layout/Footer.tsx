import React from 'react';
import { Book, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-serif text-blue-900">
              <Book size={24} />
              <span className="text-xl font-bold">BookNook</span>
            </Link>
            <p className="text-gray-600 max-w-xs">
              Discover your next favorite book, share your thoughts, and keep track of your reading journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/reading-list" className="text-gray-600 hover:text-blue-900 transition-colors">
                  My Reading List
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Connect With Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-600" />
                <a href="mailto:contact@booknook.com" className="text-gray-600 hover:text-blue-900 transition-colors">
                  contact@booknook.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Github size={18} className="text-gray-600" />
                <a href="https://github.com/booknook" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-900 transition-colors">
                  github.com/booknook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-gray-500 text-center text-sm">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;