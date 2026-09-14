import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";
import { getConstants } from "../lib/getconstants";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  const { i18n, t } = useTranslation();
  const { NAV_ITEMS } = getConstants(t);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
    localStorage.setItem("i18nextLng", lng);
    setShowLangMenu(false);
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <div
                className={`w-10 h-10 rounded-lg ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                    : "bg-white"
                } flex items-center justify-center ${
                  isScrolled ? "text-white" : "text-blue-600"
                } font-bold text-xl mr-2`}
              >
                YTP
              </div>
              <span
                className={`font-bold text-xl ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {t("siteName")}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {NAV_ITEMS.map((item) =>
              item.path.startsWith("#") ? (
                <a
                  key={item.path}
                  href={item.path}
                  className={`font-medium ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-blue-100"
                  } transition-colors`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white hover:text-blue-100"
                  } transition-colors`}
                >
                  {item.name}
                </Link>
              )
            )}
          </motion.nav>

          {/* CTA + Language */}
          <motion.div
            className="hidden md:flex items-center gap-3 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                {i18n.language === "ar" ? "🇸🇦 العربية" : "🇺🇸 English"}
              </Button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => changeLanguage("ar")}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    🇸🇦 العربية
                  </button>
                </div>
              )}
            </div>

            <Button size="sm">{t("header.getStarted")}</Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="button"
              className={`p-2 rounded-md ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-100"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">{t("header.openMenu")}</span>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-transform duration-300 transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) =>
              item.path.startsWith("#") ? (
                <a
                  key={item.path}
                  href={item.path}
                  className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}

            <Button size="sm" className="mt-2">
              {t("header.getStarted")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
