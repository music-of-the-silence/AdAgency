/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Modern Brand Identity",
      category: "branding",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Brand+Identity",
      link: "#",
    },
    {
      id: 2,
      title: "E-commerce Website",
      category: "web",
      image:
        "https://placehold.co/600x400/F97316/FFFFFF?text=E-commerce+Website",
      link: "#",
    },
    {
      id: 3,
      title: "Social Media Campaign",
      category: "marketing",
      image:
        "https://placehold.co/600x400/A60F2B/FFFFFF?text=Social+Media+Campaign",
      link: "#",
    },
    {
      id: 4,
      title: "Mobile App Design",
      category: "web",
      image:
        "https://placehold.co/600x400/4F46E5/FFFFFF?text=Mobile+App+Design",
      link: "#",
    },
    {
      id: 5,
      title: "Product Packaging",
      category: "branding",
      image:
        "https://placehold.co/600x400/F97316/FFFFFF?text=Product+Packaging",
      link: "#",
    },
    {
      id: 6,
      title: "SEO Optimization",
      category: "marketing",
      image:
        "https://placehold.co/600x400/A60F2B/FFFFFF?text=SEO+Optimization",
      link: "#",
    },
  ];
  
  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  // Categories for filter
  const categories = [
    { id: 'all', label: t('portfolio.categories.all') },
    { id: 'branding', label: t('portfolio.categories.branding') },
    { id: 'web', label: t('portfolio.categories.web') },
    { id: 'marketing', label: t('portfolio.categories.marketing') },
  ];
  
  // Check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };
  
  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('portfolio.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full transition-all ${activeCategory === category.id ? 'bg-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  <a 
                    href={item.link} 
                    className="text-white/80 hover:text-white inline-flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="#"
            className="btn btn-outline"
            whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('portfolio.viewAll')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;