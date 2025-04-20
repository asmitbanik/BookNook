import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Book, Menu, X } from 'lucide-react';
import { useReadingList } from '../../context/ReadingListContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { readingList } = useReadingList();
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-10 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-serif text-blue-900"
          >
            <Book size={28} />
            <span className="text-xl font-bold">BookNook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive 
                    ? 'text-blue-900 font-semibold' 
                    : 'text-gray-600 hover:text-blue-800'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/reading-list" 
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive 
                    ? 'text-blue-900 font-semibold' 
                    : 'text-gray-600 hover:text-blue-800'
                }`
              }
            >
              <div className="flex items-center">
                <span>My Reading List</span>
                {readingList.length > 0 && (
                  <span className="ml-2 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {readingList.length}
                  </span>
                )}
              </div>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white py-4 rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  `transition-colors py-2 ${
                    isActive 
                      ? 'text-blue-900 font-semibold' 
                      : 'text-gray-600 hover:text-blue-800'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/reading-list" 
                className={({ isActive }) =>
                  `transition-colors py-2 ${
                    isActive 
                      ? 'text-blue-900 font-semibold' 
                      : 'text-gray-600 hover:text-blue-800'
                  }`
                }
              >
                <div className="flex items-center">
                  <span>My Reading List</span>
                  {readingList.length > 0 && (
                    <span className="ml-2 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {readingList.length}
                    </span>
                  )}
                </div>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;