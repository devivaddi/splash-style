import * as React from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileInputProps extends React.ComponentProps<"input"> {
  icon?: 'email' | 'password' | 'user';
  label?: string;
  error?: string;
}

/**
 * Enhanced input component for mobile app with icons and password toggle
 */
const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, icon, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const getIcon = () => {
      switch (icon) {
        case 'email':
          return <Mail className="h-5 w-5 text-muted-foreground" />;
        case 'password':
          return <Lock className="h-5 w-5 text-muted-foreground" />;
        case 'user':
          return <User className="h-5 w-5 text-muted-foreground" />;
        default:
          return null;
      }
    };

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground/80 block">
            {label}
          </label>
        )}
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              {getIcon()}
            </div>
          )}

          {/* Input Field */}
          <input
            type={inputType}
            className={cn(
              // Base styles for mobile-optimized input
              "flex h-14 w-full rounded-2xl border-2 bg-card/50 backdrop-blur-sm",
              "px-4 py-4 text-base font-medium",
              "ring-offset-background transition-all duration-300",
              "placeholder:text-muted-foreground/60 placeholder:font-normal",
              "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "touch-interaction",
              
              // Icon padding
              icon ? "pl-12" : "pl-4",
              type === 'password' ? "pr-12" : "pr-4",
              
              // Focus states with glow effect
              isFocused
                ? "border-primary shadow-input scale-[1.02]"
                : "border-border/40 hover:border-border/60",
              
              // Error state
              error
                ? "border-destructive focus-visible:ring-destructive"
                : "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1",
              
              className,
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            ref={ref}
            {...props}
          />

          {/* Password Toggle Button */}
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 rounded-lg hover:bg-muted/20 transition-colors touch-interaction"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive font-medium animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  },
);

MobileInput.displayName = "MobileInput";

export { MobileInput };