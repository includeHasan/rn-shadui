import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';

interface TabsProps {
  defaultValue?: string;
  items: { value: string; label: string }[];
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ defaultValue, items, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value);

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className={cn("border-b border-border", className)}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item.value}
          onPress={() => handleTabPress(item.value)}
          className={cn(
            "px-4 py-2 mr-2",
            activeTab === item.value && "border-b-2 border-primary"
          )}
        >
          <Text
            className={cn(
              "text-sm font-medium",
              activeTab === item.value 
                ? "text-primary"
                : "text-foreground/60"
            )}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}