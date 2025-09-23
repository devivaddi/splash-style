import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/MobileInput';
import { SocialButton } from '@/components/SocialButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginWithEmail, loginWithSocial, clearError } from '@/redux/slices/authSlice';
import { toast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onBack: () => void;
}

/**
 * Modern login screen with email/password and social authentication
 */
const LoginScreen: React.FC<LoginScreenProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Clear errors when user starts typing
  React.useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [formData, dispatch, error]);

  const validateForm = () => {
    const errors: typeof formErrors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailLogin = async () => {
    if (!validateForm()) return;
    
    try {
      await dispatch(loginWithEmail(formData)).unwrap();
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await dispatch(loginWithSocial({ provider })).unwrap();
      toast({
        title: `Welcome!`,
        description: `Successfully logged in with ${provider}.`,
      });
    } catch (error) {
      toast({
        title: "Social login failed",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-card" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, hsl(258 90% 66% / 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(280 100% 70% / 0.3) 0%, transparent 50%)`
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-4 hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to continue to your account
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <SocialButton
              provider="google"
              loading={isLoading}
              onClick={() => handleSocialLogin('google')}
            />
            <SocialButton
              provider="facebook"
              loading={isLoading}
              onClick={() => handleSocialLogin('facebook')}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="space-y-6 mb-8">
            <MobileInput
              type="email"
              icon="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={formErrors.email}
              disabled={isLoading}
            />
            
            <MobileInput
              type="password"
              icon="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={formErrors.password}
              disabled={isLoading}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-8">
            <Button variant="link" className="p-0 h-auto text-primary font-medium">
              Forgot Password?
            </Button>
          </div>

          {/* Sign In Button */}
          <Button
            onClick={handleEmailLogin}
            variant="primary"
            size="lg"
            className="w-full mb-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                Sign Up
              </Button>
            </p>
          </div>

          {/* Terms & Conditions */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              By signing in, you agree to our{' '}
              <Button variant="link" className="p-0 h-auto text-xs underline">
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="link" className="p-0 h-auto text-xs underline">
                Privacy Policy
              </Button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;