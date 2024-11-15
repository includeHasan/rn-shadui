import React from 'react';
import { Image, View, Text, ImageSourcePropType } from 'react-native';
import { cn } from '../../lib/utils';

interface AvatarProps {
  source: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export function Avatar({ source, size = 'md', className }: AvatarProps) {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <View className={cn(
      "relative rounded-full overflow-hidden",
      sizeStyles[size],
      className
    )}>
      <Image 
        source={source}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}

export function AvatarGroup({ children, max = 3, className }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const excess = childrenArray.length - max;

  return (
    <View className={cn("flex flex-row", className)}>
      {childrenArray.slice(0, max).map((child, index) => (
        <View key={index} style={{ marginLeft: index > 0 ? -8 : 0 }}>
          {child}
        </View>
      ))}
      {excess > 0 && (
        <View className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ml-[-8px]">
          <Text className="text-xs text-secondary-foreground">+{excess}</Text>
        </View>
      )}
    </View>
  );
}