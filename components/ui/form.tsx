import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

interface FormFieldProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  render: (props: { 
    value: any;
    onChange: (value: any) => void;
    error?: string;
  }) => React.ReactNode;
}

export function FormField({ name, value, onChange, error, render }: FormFieldProps) {
  return (
    <FormItem>
      {render({ value, onChange, error })}
    </FormItem>
  );
}

interface FormItemProps extends React.ComponentProps<typeof View> {
  children: React.ReactNode;
}

export function FormItem({ className, ...props }: FormItemProps) {
  return (
    <View className={cn("space-y-2", className)} {...props} />
  );
}

interface FormLabelProps {
  className?: string;
  children: React.ReactNode;
}

export function FormLabel({ className, children }: FormLabelProps) {
  return (
    <Text className={cn("text-sm font-medium text-foreground", className)}>
      {children}
    </Text>
  );
}

interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function FormMessage({ children, className }: FormMessageProps) {
  return (
    <Text className={cn("text-sm font-medium text-destructive", className)}>
      {children}
    </Text>
  );
}

interface FormControlProps extends React.ComponentProps<typeof View> {
  children: React.ReactNode;
}

export function FormControl({ children, className, ...props }: FormControlProps) {
  return (
    <View className={cn("relative", className)} {...props}>
      {children}
    </View>
  );
}