import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Testimonials Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <TestimonialErrorFallback />;
    }
    return this.props.children;
  }
}

const TestimonialErrorFallback = () => (
  <section className="py-20 bg-secondary/5">
    <div className="container-custom text-center py-10">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-red-600 dark:text-red-300 mb-4">
          Testimonials Failed to Load
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          We're unable to show testimonials at this time. Please try refreshing
          the page.
        </p>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Get testimonial items from translations
  const testimonials = t("testimonials.items", { returnObjects: true }) || [];

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || testimonials.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [autoSlide, testimonials.length]);

  // Handle manual navigation
  const goToIndex = (index) => {
    setCurrentIndex(index);
    setAutoSlide(false);

    // Re-enable auto-slide after 10 seconds
    setTimeout(() => setAutoSlide(true), 10000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: { opacity: 0, y: -50 },
  };

  // Generate avatar with initials if image is not available
  const getInitials = (name) => {
    if (!name) return "AA";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate random background color based on name
  const getAvatarColor = (name) => {
    if (!name) return "#6366f1";

    const colors = [
      "#f43f5e",
      "#ec4899",
      "#8b5cf6",
      "#6366f1",
      "#3b82f6",
      "#0ea5e9",
      "#06b6d4",
      "#14b8a6",
      "#10b981",
      "#22c55e",
    ];

    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Render testimonial card
  const renderTestimonialCard = (testimonial, index) => {
    if (!testimonial) return null;

    return (
      <motion.div
        key={index}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6 mx-4 sm:mx-0" // Added mx-4 for mobile padding
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center mb-4">
          <motion.div
            className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary/20 flex items-center justify-center"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: getAvatarColor(testimonial.name) }}
            >
              {getInitials(testimonial.name)}
            </div>
          </motion.div>
          <div className="ml-4">
            <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl">{testimonial.name}</h4>
            <p className="text-secondary text-sm">{testimonial.position}</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic">
          "{testimonial.text}"
        </p>
      </motion.div>
    );
  };

  return (
    <ErrorBoundary fallback={<TestimonialErrorFallback />}>
      <section
        id="testimonials"
        className=" py-20 bg-secondary/5 dark:bg-gray-900 overflow-x-hidden" // Added overflow-x-hidden
      >
        <div className="container-custom px-4 sm:px-6">
          {" "}
          {/* Added responsive padding */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4" // Responsive font size
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("testimonials.title")}
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4" // Added px-4 for mobile
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("testimonials.subtitle")}
            </motion.p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {" "}
            {/* Adjusted gap */}
            {/* Radio Navigation */}
            <div className="lg:w-1/4 flex lg:flex-col justify-center gap-3 lg:gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {" "}
              {/* Added overflow handling */}
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 min-w-[250px] lg:min-w-0 ${
                    index === currentIndex
                      ? "bg-white dark:bg-gray-800 shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                  }`}
                  aria-label={`View testimonial from ${testimonial.name}`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-secondary flex items-center justify-center">
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundColor: getAvatarColor(testimonial.name),
                      }}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                  </div>
                  <div className="text-left">
                    <span
                      className={`font-medium ${
                        index === currentIndex
                          ? "text-secondary"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.position}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {/* Vertical Slider */}
            <motion.div
              className="lg:w-3/4 relative overflow-hidden h-[400px]"
              ref={sliderRef}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <AnimatePresence mode="wait">
                {renderTestimonialCard(
                  testimonials[currentIndex],
                  currentIndex
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() =>
                      goToIndex(
                        (currentIndex - 1 + testimonials.length) %
                          testimonials.length
                      )
                    }
                    className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      goToIndex((currentIndex + 1) % testimonials.length)
                    }
                    className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Testimonials;
