import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface AnimateProps extends ViewProps {
  className?: string;
  animation?: 'none' | 'spin' | 'ping' | 'bounce' | 'fade' | 'slideUp' | 'slideDown' | 'shake' | string;
  duration?: number | string;
  delay?: number | string;
  transition?: 'all' | 'colors' | 'opacity' | 'transform' | string;
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  children?: React.ReactNode;
}

export function Animate({
  className,
  animation = 'none',
  duration = 1000,
  delay = 0,
  transition,
  scale,
  scaleX,
  scaleY,
  translateX,
  translateY,
  skewX,
  skewY,
  children,
  ...props
}: AnimateProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationConfig = {
      toValue: 1,
      duration: Number(duration),
      delay: Number(delay),
      useNativeDriver: true,
    };

    switch (animation) {
      case 'spin':
        Animated.loop(
          Animated.timing(animatedValue, animationConfig)
        ).start();
        break;
      case 'ping':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig, toValue: 1 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0 })
          ])
        ).start();
        break;
      case 'bounce':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig, toValue: -10 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0 })
          ])
        ).start();
        break;
      case 'fade':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig, toValue: 1 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0 })
          ])
        ).start();
        break;
      case 'slideUp':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0 })
          ])
        ).start();
        break;
      case 'slideDown':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0 })
          ])
        ).start();
        break;
      case 'shake':
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, { ...animationConfig, toValue: 1, duration: duration / 5 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: -1, duration: duration / 5 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0.5, duration: duration / 5 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: -0.5, duration: duration / 5 }),
            Animated.timing(animatedValue, { ...animationConfig, toValue: 0, duration: duration / 5 })
          ])
        ).start();
        break;
    }

    return () => animatedValue.resetAnimation();
  }, [animation, duration, delay]);

  const animatedStyle = {
    transform: [
      animation === 'spin' && {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      },
      animation === 'ping' && {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2]
        })
      },
      animation === 'bounce' && { translateY: animatedValue },
      animation === 'shake' && {
        translateX: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-20, 0, 20]
        })
      },
      animation === 'slideUp' && {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30]
        })
      },
      animation === 'slideDown' && {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30]
        })
      },
      scale && { scale: Number(scale) },
      scaleX && { scaleX: Number(scaleX) },
      scaleY && { scaleY: Number(scaleY) },
      translateX && { translateX: Number(translateX) },
      translateY && { translateY: Number(translateY) },
      skewX && { skewX: `${skewX}deg` },
      skewY && { skewY: `${skewY}deg` },
    ].filter(Boolean),
    ...(animation === 'fade' && {
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1]
      })
    })
  };

  return (
    <Animated.View style={animatedStyle} {...props}>
      {children}
    </Animated.View>
  );
}
