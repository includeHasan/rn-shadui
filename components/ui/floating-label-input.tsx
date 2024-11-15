import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Animated } from 'react-native';
import { cn } from '../../lib/utils';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
  error?: string;
  className?: string;
}

export function FloatingLabelInput({
  label,
  error,
  className,
  value,
  onChangeText,
  ...props
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
    ],
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  return (
    <View className={cn("mb-4", className)}>
      <View className="relative border rounded-lg px-4 py-2">
        <Animated.Text
          className={cn(
            "absolute left-4",
            isFocused ? "text-primary" : "text-gray-500"
          )}
          style={labelStyle}
        >
          {label}
        </Animated.Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="text-base pt-2"
          {...props}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}