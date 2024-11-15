import React, { useRef, useState } from 'react';
import { View, TextInput, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface PinInputProps extends ViewProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  secure?: boolean;
  className?: string;
}

export function PinInput({
  length = 4,
  value = '',
  onChange,
  secure = false,
  className,
  ...props
}: PinInputProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValue = value.split('');
    
    // Only accept numbers
    if (!/^\d*$/.test(text)) return;

    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange?.(finalValue);

    // Move to next input if we have a value
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    // Clear the input when focused if it's part of a complete PIN
    if (value.length === length) {
      onChange?.('');
    }
  };

  return (
    <View 
      className={cn("flex-row justify-between gap-2", className)}
      {...props}
    >
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          className={cn(
            "w-12 h-12 border-2 rounded-lg text-center text-lg font-bold",
            focusedIndex === index
              ? "border-blue-500"
              : value[index]
                ? "border-gray-400"
                : "border-gray-200"
          )}
          maxLength={1}
          keyboardType="number-pad"
          secureTextEntry={secure}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => setFocusedIndex(-1)}
          selectTextOnFocus={true}
        />
      ))}
    </View>
  );
}