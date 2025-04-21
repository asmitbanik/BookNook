import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Book, Home, Bookmark, Menu, X, Sun, Moon, User } from "lucide-react";
import { useReadingList } from "../../context/ReadingListContext";
import { useUser } from "../../context/UserContext";

const Header: React.FC = () => {
  const { readingList } = useReadingList();
  const { userInfo } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

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

  const toggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          <NavLink
            to="/"
            className="flex items-center space-x-3 font-serif text-blue-900 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <Book size={30} />
            <span className="text-2xl font-extrabold tracking-wide">BookNook</span>
            {userInfo && userInfo.name && (
              <span className="ml-4 flex items-center space-x-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                <User size={20} />
                <span>Welcome, {userInfo.name}!</span>
              </span>
            )}
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6 font-serif text-blue-900 dark:text-blue-300">
            {items.map((item) => (
              <NavLink
                key={item.title}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-2 py-1 rounded hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    isActive ? "font-bold border-b-2 border-blue-900 dark:border-blue-300" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}

            {/* Dark Mode Toggle Slider with Icons */}
            <label htmlFor="dark-mode-toggle" className="inline-flex relative items-center cursor-pointer ml-6">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <Sun
                size={18}
                className={`absolute left-2 top-1.5 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-yellow-400"
                }`}
              />
              <Moon
                size={18}
                className={`absolute right-2 top-1.5 transition-colors duration-300 ${
                  isDarkMode ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-300"></div>
              <div
                className="absolute left-1 top-1.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-7 transition-transform duration-300"
              ></div>
            </label>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-900 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
        className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 font-serif text-blue-900 dark:text-blue-300 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } z-50`}
        aria-label="Mobile menu"
      >
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.href}
            className={({ isActive }) =>
              `block px-6 py-4 hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isActive ? "font-bold bg-blue-200 dark:bg-gray-700" : ""
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

        {/* Dark Mode Toggle Slider with Icons in Mobile Menu */}
        <label
          htmlFor="dark-mode-toggle-mobile"
          className="w-full text-left px-6 py-4 flex items-center space-x-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 relative"
        >
          <input
            type="checkbox"
            id="dark-mode-toggle-mobile"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <Sun
            size={18}
            className={`absolute left-3 top-5 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-yellow-400"
            }`}
          />
          <Moon
            size={18}
            className={`absolute right-3 top-5 transition-colors duration-300 ${
              isDarkMode ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-300"></div>
          <div
            className="absolute left-1 top-6 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-7 transition-transform duration-300"
          ></div>
          <span className="ml-12">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </label>
      </nav>
    </header>
  );
};

export default Header;
