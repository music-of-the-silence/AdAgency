/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { key: "home", label: t("header.home"), href: "#home" },
    { key: "services", label: t("header.services"), href: "#services" },
    { key: "portfolio", label: t("header.portfolio"), href: "#portfolio" },
    { key: "about", label: t("header.about"), href: "#about" },
    { key: "contact", label: t("header.contact"), href: "#contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileMenu = document.querySelector(".mobile-menu-container");
      const menuButton = document.querySelector(".mobile-menu-button");

      if (
        isMobileMenuOpen &&
        !mobileMenu.contains(e.target) &&
        !menuButton.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a nav item is clicked
  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-primary/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-bold font-heading flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-accent mr-1">Ad </span>
          <span>Agency</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.key}
              href={item.href}
              className="font-medium hover:text-accent transition-colors"
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSwitcher />

          <motion.button
            className="p-2 focus:outline-none mobile-menu-button"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-[72px] right-0 w-[80%] max-w-sm h-[calc(100vh-72px)] bg-white dark:bg-primary shadow-xl mobile-menu-container"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="flex flex-col p-6 space-y-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className="font-medium text-lg hover:text-accent transition-colors py-2"
                  onClick={handleNavItemClick}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
