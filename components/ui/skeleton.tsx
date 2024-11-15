import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface SkeletonProps extends ViewProps {
  className?: string;
  animation?: 'pulse' | 'none';
  duration?: number;
}

export function Skeleton({ 
  className,
  animation = 'pulse',
  duration = 1500,
  ...props 
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (animation === 'pulse') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    return () => opacity.resetAnimation();
  }, [animation, duration]);

  return (
    <Animated.View
      style={{ opacity }}
      className={cn("rounded-md bg-secondary", className)}
      {...props}
    />
  );
}