import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({
  label,
  checked = false,
  onCheckedChange,
  className,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleChecked = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <TouchableOpacity
      onPress={toggleChecked}
      className={cn("flex-row items-center", className)}
    >
      <View
        className={cn(
          "h-5 w-5 rounded border border-primary",
          isChecked && "bg-primary"
        )}
      >
        {isChecked && (
          <Text className="text-xs text-primary-foreground text-center">✓</Text>
        )}
      </View>
      {label && (
        <Text className="ml-2 text-sm text-foreground">{label}</Text>
      )}
    </TouchableOpacity>
  );
}