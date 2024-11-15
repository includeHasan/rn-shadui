import React from "react";
import { View, Text } from "react-native";
import { cn } from "./utils";

interface FABProps {
  onTap: () => void;
  icon?: string;
  label?: string;
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function FAB({
  onTap,
  icon = "+",
  label,
  className,
  position = "bottom-right"
}: FABProps) {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4"
  };

  return (
    <View
      className={cn(
        "absolute w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center",
        positionClasses[position],
        className
      )}
      onTouchEnd={onTap}
    >
      {icon && (
        <Text className="text-white text-2xl font-bold">
          {icon}
        </Text>
      )}
      {label && (
        <Text className="text-white text-sm ml-2">
          {label}
        </Text>
      )}
    </View>
  );
}