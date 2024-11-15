import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-lg border border-border bg-card p-4",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    >
      {children}
    </View>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <Text
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </Text>
  );
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={cn("pt-0", className)} {...props}>
      {children}
    </View>
  );
}