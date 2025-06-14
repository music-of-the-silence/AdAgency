import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, delay: 0.8 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.5 },
    },
  };

  const abstractBackground = (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
        animate={{ x: [0, -70, 0], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[90px]"
        animate={{ x: [0, 60, 0], y: [0, -80, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/30 z-0"></div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-white py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              variants={itemVariants}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-10 text-white/90"
              variants={itemVariants}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {t("hero.cta")}
              </motion.a>

              <motion.a
                href="#services"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {t("hero.learnMore")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Abstract background shapes behind image */}
            <div className="absolute inset-0 z-0">
              <motion.div
                className="absolute -top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[80px]"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full bg-primary/25 blur-[70px]"
                animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Image with relative positioning */}
            <div className="relative z-10">
              <img
                src="/hero-image.png"
                alt="Digital Marketing Solutions"
                className="w-96 h-96 rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {abstractBackground}
          <motion.div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
