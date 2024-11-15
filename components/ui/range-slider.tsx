import React, { useState } from 'react';
import { View, PanResponder, Text, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface RangeSliderProps extends ViewProps {
  min: number;
  max: number;
  step?: number;
  values: [number, number];
  onChange?: (values: [number, number]) => void;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  values,
  onChange,
  className,
  ...props
}: RangeSliderProps) {
  const [localValues, setLocalValues] = useState<[number, number]>(values);
  const [sliderWidth, setSliderWidth] = useState(0);

  const valueToPosition = (value: number) => {
    return ((value - min) / (max - min)) * sliderWidth;
  };

  const positionToValue = (position: number) => {
    let value = (position / sliderWidth) * (max - min) + min;
    value = Math.round(value / step) * step;
    return Math.min(Math.max(value, min), max);
  };

  const createPanResponder = (index: 0 | 1) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = valueToPosition(localValues[index]) + gestureState.dx;
      const newValue = positionToValue(newPosition);
      
      const newValues: [number, number] = [...localValues] as [number, number];
      newValues[index] = newValue;

      if (
        (index === 0 && newValue < newValues[1]) ||
        (index === 1 && newValue > newValues[0])
      ) {
        setLocalValues(newValues);
        onChange?.(newValues);
      }
    },
  });

  const leftPanResponder = createPanResponder(0);
  const rightPanResponder = createPanResponder(1);

  return (
    <View 
      className={cn("h-16 justify-center", className)}
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      {...props}
    >
      <View className="h-2 bg-gray-200 rounded-full">
        <View
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: valueToPosition(localValues[0]),
            right: sliderWidth - valueToPosition(localValues[1]),
          }}
        />
      </View>

      {[0, 1].map((index) => (
        <View
          key={index}
          {...(index === 0 ? leftPanResponder : rightPanResponder).panHandlers}
          className="absolute w-8 h-8 bg-white rounded-full shadow-lg items-center justify-center"
          style={{
            left: valueToPosition(localValues[index]) - 16,
          }}
        >
          <Text 
            className="text-base font-bold text-blue-600"  // changed from text-primary to text-blue-600
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1
            }}
          >
            {localValues[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}