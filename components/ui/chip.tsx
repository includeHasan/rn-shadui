import React from 'react';
import { Pressable, Text, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface ChipProps extends ViewProps {
  label: string;
  onPress?: () => void;
  onRemove?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Chip({
  label,
  onPress,
  onRemove,
  selected = false,
  disabled = false,
  className,
  ...props
}: ChipProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={cn(
        "flex-row items-center px-3 py-1 rounded-full",
        selected
          ? "bg-primary border-primary"
          : "bg-gray-100 border-gray-200",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          selected ? "text-white" : "text-gray-900"
        )}
      >
        {label}
      </Text>
      {onRemove && (
        <Pressable
          onPress={disabled ? undefined : onRemove}
          className="ml-1 p-1"
        >
          <Text className={selected ? "text-white" : "text-gray-500"}>
            ×
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}