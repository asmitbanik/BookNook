import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      icon: <Home size={24} aria-label="Home" />,
      href: "/",
    },
    {
      title: "My Reading List",
      icon: (
        <div className="relative" aria-label="My Reading List">
          <Bookmark size={24} />
          {readingList.length > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
              aria-live="polite"
              aria-atomic="true"
            >
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

  // Handlers for profile, settings, logout with navigation
  const handleProfile = () => {
    navigate("/profile");
    setIsProfileMenuOpen(false);
  };

  const handleSettings = () => {
    navigate("/settings");
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    alert("Logging out (mock)");
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-md sticky top-0 z-50 transition-colors duration-500 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 md:py-5">
          <NavLink
            to="/"
            className="flex items-center space-x-3 font-serif text-blue-900 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-xl md:text-2xl font-bold tracking-wide"
          >
            <Book size={32} aria-label="BookNook logo" />
            <span>BookNook</span>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-blue-900 dark:text-blue-300">
            {items.map((item) => (
              <NavLink
                key={item.title}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                    isActive ? "font-semibold border-b-2 border-blue-600 dark:border-blue-400" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
                title={item.title}
              >
                {item.icon}
                <span className="text-lg">{item.title}</span>
              </NavLink>
            ))}

            {/* Dark Mode Toggle Slider with Icons */}
            <label
              htmlFor="dark-mode-toggle"
              className="inline-flex relative items-center cursor-pointer ml-8"
              title="Toggle dark mode"
            >
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <Sun
                size={20}
                className={`absolute left-3 top-2.5 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-yellow-400"
                }`}
              />
              <Moon
                size={20}
                className={`absolute right-3 top-2.5 transition-colors duration-300 ${
                  isDarkMode ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-300"></div>
              <div
                className="absolute left-1.5 top-2 bg-white w-6 h-6 rounded-full shadow transform peer-checked:translate-x-8 transition-transform duration-300"
              ></div>
            </label>

            {/* User Profile Dropdown */}
            {userInfo && userInfo.name && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="ml-8 flex items-center space-x-2 text-lg font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-haspopup="true"
                  aria-expanded={isProfileMenuOpen}
                  aria-label="User menu"
                  title="User menu"
                >
                  <User size={24} />
                  <span>Welcome, {userInfo.name}!</span>
                </button>
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <button
                      onClick={handleProfile}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-100 dark:focus:bg-gray-700 rounded-t-lg"
                      role="menuitem"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleSettings}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-100 dark:focus:bg-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-100 dark:focus:bg-gray-700 rounded-b-lg"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
        className={`md:hidden fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      ></div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 font-serif text-blue-900 dark:text-blue-300 transform transition-transform duration-500 ${
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
                isActive ? "font-semibold bg-blue-200 dark:bg-gray-700" : ""
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
            title={item.title}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="text-lg">{item.title}</span>
            </div>
          </NavLink>
        ))}

        {/* Dark Mode Toggle Slider with Icons in Mobile Menu */}
        <label
          htmlFor="dark-mode-toggle-mobile"
          className="w-full text-left px-6 py-4 flex items-center space-x-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 relative"
          title="Toggle dark mode"
        >
          <input
            type="checkbox"
            id="dark-mode-toggle-mobile"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <Sun
            size={20}
            className={`absolute left-3 top-5 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-yellow-400"
            }`}
          />
          <Moon
            size={20}
            className={`absolute right-3 top-5 transition-colors duration-300 ${
              isDarkMode ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-300"></div>
          <div
            className="absolute left-1.5 top-6 bg-white w-6 h-6 rounded-full shadow transform peer-checked:translate-x-8 transition-transform duration-300"
          ></div>
          <span className="ml-12">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </label>
      </nav>
    </header>
  );
};

export default Header;
