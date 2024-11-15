import React, { useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  className,
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const [animation] = useState(new Animated.Value(checked ? 1 : 0));

  const toggleSwitch = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);

    Animated.spring(animation, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 14],
  });

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      activeOpacity={0.8}
      className={cn(
        "relative inline-flex h-6 w-10 rounded-full",
        isChecked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <Animated.View
        className="absolute h-5 w-5 rounded-full bg-background shadow-lg"
        style={{
          transform: [{ translateX }],
          top: 2,
        }}
      />
    </TouchableOpacity>
  );
}