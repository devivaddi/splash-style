import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/redux/hooks';
import SplashScreen from '@/screens/SplashScreen';
import LoginScreen from '@/screens/LoginScreen';
import DashboardScreen from '@/screens/DashboardScreen';

type AppScreen = 'splash' | 'login' | 'dashboard';

/**
 * Main application component with screen navigation
 * Handles the flow: Splash → Login → Dashboard
 */
const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');

  // Navigate to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('dashboard');
    }
  }, [isAuthenticated]);

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToSplash = () => {
    setCurrentScreen('splash');
  };

  const screenVariants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={navigateToLogin} />;
      case 'login':
        return <LoginScreen onBack={navigateToSplash} />;
      case 'dashboard':
        return <DashboardScreen />;
      default:
        return <SplashScreen onGetStarted={navigateToLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile viewport optimization */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.4,
            }}
            className="w-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
