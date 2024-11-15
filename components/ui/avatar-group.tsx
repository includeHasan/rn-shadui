import React from 'react';
import { View, Text, Image, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface AvatarProps {
  source?: string;
  alt?: string;
  size?: number;
}

interface AvatarGroupProps extends ViewProps {
  avatars: AvatarProps[];
  max?: number;
  size?: number;
  className?: string;
}

export function AvatarGroup({ 
  avatars, 
  max = 4, 
  size = 40, 
  className,
  ...props 
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const excess = avatars.length - max;

  return (
    <View 
      className={cn("flex-row items-center", className)} 
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          className="relative"
          style={{
            marginLeft: index > 0 ? -size * 0.3 : 0,
            zIndex: visibleAvatars.length - index,
          }}
        >
          {avatar.source ? (
            <Image
              source={{ uri: avatar.source }}
              className="rounded-full border-2 border-white"
              style={{ width: size, height: size }}
            />
          ) : (
            <View 
              className={cn(
                "rounded-full bg-gray-200 items-center justify-center border-2 border-white",
              )}
              style={{ width: size, height: size }}
            >
              <Text className="text-gray-600 font-medium">
                {avatar.alt?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      ))}
      {excess > 0 && (
        <View
          className={cn(
            "rounded-full bg-gray-100 items-center justify-center border-2 border-white",
          )}
          style={{
            width: size,
            height: size,
            marginLeft: -size * 0.3,
            zIndex: 0,
          }}
        >
          <Text className="text-gray-600 text-xs font-medium">
            +{excess}
          </Text>
        </View>
      )}
    </View>
  );
}