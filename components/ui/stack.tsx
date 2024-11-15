import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '~/lib/utils';

interface StackProps extends ViewProps {
  children: React.ReactNode;
  spacing?: number;
}

const Stack = React.forwardRef<View, StackProps>(
  ({ className, spacing = 0, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('flex', className)}
        style={[{ gap: spacing }, style]}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

export const XStack = React.forwardRef<View, StackProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      className={cn('flex-row', props.className)}
      {...props}
    />
  );
});
XStack.displayName = 'XStack';

export const YStack = React.forwardRef<View, StackProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      className={cn('flex-col', props.className)}
      {...props}
    />
  );
});
YStack.displayName = 'YStack';

export const ZStack = React.forwardRef<View, StackProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      className={cn('relative items-center justify-center', props.className)}
      {...props}
    >
      {React.Children.map(props.children, (child, index) => (
        <View className={cn('absolute', index === 0 && 'relative')}>
          {child}
        </View>
      ))}
    </Stack>
  );
});
ZStack.displayName = 'ZStack';

export { Stack };
