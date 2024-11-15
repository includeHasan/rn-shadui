import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../../lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "items-center justify-center rounded-md";
  
  const variants = {
    default: "bg-primary",
    destructive: "bg-destructive",
    outline: "border border-input",
    secondary: "bg-secondary",
    ghost: "hover:bg-accent",
    link: "underline-offset-4"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  return (
    <TouchableOpacity
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          variant === 'default' && "text-primary-foreground",
          variant === 'destructive' && "text-destructive-foreground",
          variant === 'secondary' && "text-secondary-foreground"
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}