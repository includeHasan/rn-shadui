import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, ScrollView, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface SearchBarProps extends ViewProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (text: string) => void;
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  onSearch,
  suggestions = [],
  onSuggestionPress,
  placeholder = "Search...",
  className,
  ...props
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showSuggestions = isFocused && value && suggestions.length > 0;

  return (
    <View className={cn("relative", className)} {...props}>
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="flex-1 text-base"
          returnKeyType="search"
          onSubmitEditing={() => onSearch?.(value)}
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => {
              onChangeText('');
              onSearch?.('');
            }}
            className="ml-2 p-1"
          >
            <Text className="text-gray-500">×</Text>
          </Pressable>
        )}
      </View>

      {showSuggestions && (
        <View className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg elevation-5 z-50">
          <ScrollView className="max-h-40">
            {suggestions.map((suggestion, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  onSuggestionPress?.(suggestion);
                  onChangeText(suggestion);
                  setIsFocused(false);
                }}
                className="px-4 py-3 border-b border-gray-100 active:bg-gray-100"
              >
                <Text className="text-base text-gray-800">{suggestion}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}