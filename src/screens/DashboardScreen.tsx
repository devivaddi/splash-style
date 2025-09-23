import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import { toast } from '@/hooks/use-toast';

/**
 * Simple dashboard screen to demonstrate successful authentication
 */
const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loginMethod } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  const getWelcomeMessage = () => {
    switch (loginMethod) {
      case 'google':
        return 'Welcome back from Google! 🎉';
      case 'facebook':
        return 'Welcome back from Facebook! 🎉';
      case 'email':
        return 'Welcome back! 🎉';
      default:
        return 'Welcome! 🎉';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 gradient-card" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full shadow-md"
              />
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-card border border-border/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {getWelcomeMessage()}
            </h2>
            <p className="text-muted-foreground">
              You've successfully authenticated with our mobile app
            </p>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-card border border-border/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Name</p>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Login Method</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {loginMethod} Authentication
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 shadow-card border border-border/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Settings className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <User className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Profile</span>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground/60 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Built with React, Redux Toolkit & Framer Motion
        </motion.p>
      </div>
    </div>
  );
};

export default DashboardScreen;