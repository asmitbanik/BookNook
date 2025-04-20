import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Book, Home, Bookmark, Menu, X } from "lucide-react";
import { useReadingList } from "../../context/ReadingListContext";

const Header: React.FC = () => {
  const { readingList } = useReadingList();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize if desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      title: "Home",
      icon: <Home size={24} />,
      href: "/",
    },
    {
      title: "My Reading List",
      icon: (
        <div className="relative">
          <Bookmark size={24} />
          {readingList.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {readingList.length}
            </span>
          )}
        </div>
      ),
      href: "/reading-list",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <NavLink
            to="/"
            className="flex items-center space-x-2 font-serif text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <Book size={28} />
            <span className="text-xl font-bold">BookNook</span>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 font-serif text-blue-900">
            {items.map((item) => (
              <NavLink
                key={item.title}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-2 py-1 rounded hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    isActive ? "font-bold border-b-2 border-blue-900" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      ></div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-200 font-serif text-blue-900 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } z-50`}
        aria-label="Mobile menu"
      >
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.href}
            className={({ isActive }) =>
              `block px-6 py-4 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isActive ? "font-bold bg-blue-200" : ""
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span>{item.title}</span>
            </div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
