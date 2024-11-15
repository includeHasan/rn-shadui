import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { cn } from '../../lib/utils';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ title, children, className }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust based on content
  });

  return (
    <View className={cn("border-b border-border", className)}>
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center py-4"
      >
        <Text className="text-base font-medium text-foreground">{title}</Text>
        <Text className="text-foreground">{isOpen ? '−' : '+'}</Text>
      </TouchableOpacity>
      
      <Animated.View style={{ height: bodyHeight, overflow: 'hidden' }}>
        <View className="pb-4">
          {children}
        </View>
      </Animated.View>
    </View>
  );
}