import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface BadgeProps extends ViewProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

export function Badge({ 
  variant = 'default', 
  className, 
  children,
  ...props 
}: BadgeProps) {
  return (
    <View
      className={cn(
        "px-2.5 py-0.5 rounded-full items-center justify-center",
        variant === 'default' && "bg-primary",
        variant === 'secondary' && "bg-secondary",
        variant === 'destructive' && "bg-destructive",
        variant === 'outline' && "border border-primary",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-xs font-semibold",
          variant === 'default' && "text-primary-foreground",
          variant === 'secondary' && "text-secondary-foreground",
          variant === 'destructive' && "text-destructive-foreground",
          variant === 'outline' && "text-foreground"
        )}
      >
        {children}
      </Text>
    </View>
  );
}