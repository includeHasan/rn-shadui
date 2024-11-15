import React, { useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { cn } from '../../lib/utils';

interface ToastProps {
  open?: boolean;
  title?: string;
  description?: string;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function Toast({
  open = false,
  title,
  description,
  duration = 3000,
  onOpenChange,
  variant = 'default',
  className,
}: ToastProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onOpenChange?.(false);
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className={cn(
        "absolute bottom-4 left-4 right-4 rounded-lg p-4 shadow-lg",
        variant === 'default' && "bg-background",
        variant === 'destructive' && "bg-destructive",
        className
      )}
    >
      {title && (
        <Text
          className={cn(
            "font-semibold",
            variant === 'destructive' && "text-destructive-foreground"
          )}
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          className={cn(
            "mt-1 text-sm",
            variant === 'destructive' && "text-destructive-foreground"
          )}
        >
          {description}
        </Text>
      )}
    </Animated.View>
  );
}