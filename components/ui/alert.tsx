import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

interface AlertProps {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Alert({
  variant = 'default',
  title,
  description,
  className,
  children,
}: AlertProps) {
  return (
    <View
      className={cn(
        "relative w-full rounded-lg border p-4",
        variant === 'default' && "bg-background text-foreground",
        variant === 'destructive' && "border-destructive/50 text-destructive dark:border-destructive",
        className
      )}
    >
      {title && (
        <Text className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </Text>
      )}
      {description && (
        <Text className="text-sm [&_p]:leading-relaxed">
          {description}
        </Text>
      )}
      {children}
    </View>
  );
}