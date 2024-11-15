import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { cn } from '../../lib/utils';

interface InputProps extends TextInputProps {
  className?: string;
  containerClassName?: string;
}

export function Input({ className, containerClassName, ...props }: InputProps) {
  return (
    <View
      className={cn(
        "relative rounded-md border border-input bg-transparent",
        containerClassName
      )}
    >
      <TextInput
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-base text-foreground",
          "placeholder:text-foreground/50",
          className
        )}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  );
}