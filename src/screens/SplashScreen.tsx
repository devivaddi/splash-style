import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.jpg';

interface SplashScreenProps {
  onGetStarted: () => void;
}

/**
 * Beautiful splash screen with logo animation and call-to-action
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after initial logo animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 gradient-hero opacity-90"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{
              y: [null, -20, 20, -20],
              opacity: [0, 0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo with Scale Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 1.2 
          }}
        >
          <div className="relative">
            <img 
              src={logoImage} 
              alt="App Logo" 
              className="w-32 h-32 rounded-3xl shadow-glow object-cover"
            />
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-primary/30 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>

        {/* App Title with Slide Animation */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome
          </h1>
          <p className="text-lg text-white/80 font-medium">
            Your journey starts here
          </p>
        </motion.div>

        {/* Description Text */}
        <motion.p
          className="text-white/70 text-center mb-12 max-w-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Experience seamless authentication with modern design and smooth interactions.
        </motion.p>

        {/* Get Started Button with Slide Up Animation */}
        <motion.div
          className="w-full max-w-xs"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
        >
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            className="w-full font-semibold tracking-wide group"
          >
            <span>Get Started</span>
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              →
            </motion.div>
          </Button>
        </motion.div>

        {/* Bottom Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 0.6 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-1 h-8 bg-white/40 rounded-full"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;