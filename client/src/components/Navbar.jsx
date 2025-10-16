import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import logo from "../assets/Hint.png";
import Dashboard from "./Home/Dashboard";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const dashboardRef = useRef(null);
  const aboutRef = useRef(null);

  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { t, i18n } = useTranslation();

  const navItems = [
    { key: "Home", path: "/" },
    { key: "Programs", path: "/programs" },
    { key: "Events", path: "/events" },
    { key: "News", path: "/news" },
    { key: "Vacancies", path: "/vacancies" },
  ];

  const aboutDropdownItems = [
    { key: "About", path: "/about" },
    { key: "Directorate", path: "/directorate" },
    { key: "Services", path: "/services" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dashboardRef.current && !dashboardRef.current.contains(e.target)) {
        setShowDashboard(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setShowAboutDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const LanguageSwitcher = () => (
    <select
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("lang", e.target.value);
      }}
      value={i18n.language}
      className="text-[#253864] bg-transparent rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#267DB2]">
      <option value="en">EN</option>
      <option value="am">አማ</option>
      <option value="or">OR</option>
    </select>
  );

  const fontClass =
    i18n.language === "am" ? "font-notoEthiopic" : "font-poppins";

  return (
    <header
      className={`${fontClass} fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-[#f9fafa] shadow-md border-b border-[#d5d8d9]"
          : "bg-transparent"
      }`}>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium relative transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-[#267DB2] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#FFA500]"
                    : "text-[#253864] hover:text-[#267DB2] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#FFA500] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                }`}>
                {t(item.key)}
              </Link>
            ))}

            {/* About Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                className="text-sm font-medium text-[#253864] hover:text-[#267DB2] flex items-center space-x-1">
                <span>{t("About")}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showAboutDropdown && (
                <div className="absolute top-8 left-0 bg-[#f9fafa] border border-[#d5d8d9] rounded-md shadow-lg py-2 w-48 z-50">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-[#253864] hover:bg-[#e5f0ff]">
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Admin only */}
            {user?.role === "admin" && (
              <Link
                to="/admin/programs"
                className="text-sm font-medium text-[#253864] hover:text-[#267DB2]">
                {t("Admin")}
              </Link>
            )}
          </nav>

          {/* Auth & Language */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <LanguageSwitcher />
            {user ? (
              <>
                <button
                  onClick={() => setShowDashboard(!showDashboard)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#267DB2]"
                  aria-label="User menu">
                  <User className="w-5 h-5 text-[#267DB2]" />
                </button>
                {showDashboard && (
                  <div
                    ref={dashboardRef}
                    className="absolute right-0 top-16 bg-[#f9fafa] border border-[#d5d8d9] rounded-lg shadow-lg z-50 w-80">
                    <Dashboard user={user} onLogout={logout} />
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#253864] hover:text-[#267DB2]">
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-[#253864] hover:text-[#267DB2]">
                  {t("register")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#253864] z-50">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className={`md:hidden ${
            scrolled ? "bg-[#f9fafa] border-t border-[#d5d8d9]" : "bg-[#f9fafa]"
          }`}>
          <div className="px-4 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium ${
                  isActive(item.path)
                    ? "text-[#267DB2]"
                    : "text-[#253864] hover:text-[#267DB2]"
                }`}>
                {t(item.key)}
              </Link>
            ))}

            {/* About Dropdown Mobile */}
            <button
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              className="flex items-center justify-between font-medium text-[#253864] hover:text-[#267DB2] w-full px-2 py-1">
              <span>{t("About")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showAboutDropdown && (
              <div className="ml-4 flex flex-col space-y-1">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-[#253864] hover:text-[#267DB2]">
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            )}

            {/* Admin only */}
            {user?.role === "admin" && (
              <Link
                to="/admin/programs"
                className="font-medium text-[#253864] hover:text-[#267DB2]">
                {t("Admin")}
              </Link>
            )}

            <LanguageSwitcher />

            {user ? (
              <>
                <button
                  onClick={() => setShowDashboard(!showDashboard)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 w-full text-left">
                  <User className="w-5 h-5 text-[#267DB2]" />
                  <span className="text-base font-semibold text-[#267DB2]">
                    {t("Profile")}
                  </span>
                </button>
                {showDashboard && (
                  <div className="mt-2 bg-[#f9fafa] border border-[#d5d8d9] rounded-lg shadow-lg z-50">
                    <Dashboard user={user} onLogout={logout} />
                  </div>
                )}
                <button
                  onClick={logout}
                  className="font-medium text-[#253864] hover:text-[#267DB2] text-left">
                  {t("Logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-[#253864] hover:text-[#267DB2]">
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="font-medium text-[#253864] hover:text-[#267DB2]">
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
