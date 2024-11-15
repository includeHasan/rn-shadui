import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface NotificationBadgeProps extends ViewProps {
  count?: number;
  dot?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function NotificationBadge({
  count,
  dot = false,
  size = 'medium',
  className,
  ...props
}: NotificationBadgeProps) {
  if (!count && !dot) return null;

  const sizeStyles = {
    small: "min-w-[16px] h-[16px]",
    medium: "min-w-[18px] h-[18px]",
    large: "min-w-[22px] h-[22px]",
  };

  const textStyles = {
    small: "text-[9px]",
    medium: "text-[10px]",
    large: "text-[12px]",
  };

  return (
    <View
      className={cn(
        "absolute -top-1 -right-1 rounded-full bg-red-500 items-center justify-center",
        sizeStyles[size],
        dot && "w-[8px] h-[8px] min-w-0",
        className
      )}
      {...props}
    >
      {!dot && count && (
        <Text className={cn("font-bold text-white px-1", textStyles[size])}>
          {count > 99 ? '99+' : count}
        </Text>
      )}
    </View>
  );
}