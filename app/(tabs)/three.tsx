import { View, Text,ScrollView } from 'react-native';
import React from 'react';
import { Stack, XStack, YStack, ZStack } from '~/components/ui/stack';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Animate } from '~/components/ui/animate';

const Three = () => {
  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Stack & Animation Demo</Text>

      <YStack spacing={16}>
        

        {/* XStack Example */}
        <Card>
          <CardHeader>
            <CardTitle>XStack (Horizontal)</CardTitle>
          </CardHeader>
          <CardContent>
            <XStack spacing={8}>
              <View className="w-12 h-12 bg-blue-500 rounded" />
              <View className="w-12 h-12 bg-green-500 rounded" />
              <View className="w-12 h-12 bg-red-500 rounded" />
            </XStack>
          </CardContent>
        </Card>

        {/* YStack Example */}
        <Card>
          <CardHeader>
            <CardTitle>YStack (Vertical)</CardTitle>
          </CardHeader>
          <CardContent>
            <YStack spacing={8}>
              <View className="w-full h-12 bg-purple-500 rounded" />
              <View className="w-full h-12 bg-yellow-500 rounded" />
              <View className="w-full h-12 bg-pink-500 rounded" />
            </YStack>
          </CardContent>
        </Card>

        {/* ZStack Example */}
        <Card>
          <CardHeader>
            <CardTitle>ZStack (Layered)</CardTitle>
          </CardHeader>
          <CardContent>
            <ZStack className="h-32">
              <View className="w-32 h-32 bg-gray-300 rounded-lg" />
              <View className="w-24 h-24 bg-gray-400 rounded-lg" />
              <View className="w-16 h-16 bg-gray-500 rounded-lg" />
            </ZStack>
          </CardContent>
        </Card>
        {/* Animation Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Animations</CardTitle>
          </CardHeader>
          <CardContent>
            <XStack spacing={16}>
              {/* Left Column */}
              <YStack spacing={16} className="flex-1">
                <XStack spacing={12} className="items-center justify-around">
                  <Animate animation="spin" duration={2000}>
                    <View className="w-12 h-12 bg-blue-500 rounded" />
                  </Animate>
                  <Animate animation="ping" duration={1500}>
                    <View className="w-12 h-12 bg-green-500 rounded" />
                  </Animate>
                </XStack>

                <XStack spacing={12} className="items-center justify-around">
                  <Animate animation="fade" duration={2000}>
                    <View className="w-12 h-12 bg-purple-500 rounded" />
                  </Animate>
                  <Animate animation="slideUp" duration={1500}>
                    <View className="w-12 h-12 bg-yellow-500 rounded" />
                  </Animate>
                </XStack>
              </YStack>

              {/* Right Column */}
              <YStack spacing={16} className="flex-1">
                <XStack spacing={12} className="items-center justify-around">
                  <Animate animation="bounce" duration={1000}>
                    <View className="w-12 h-12 bg-red-500 rounded" />
                  </Animate>
                  <Animate animation="shake" duration={1000}>
                    <View className="w-12 h-12 bg-orange-500 rounded" />
                  </Animate>
                </XStack>

                <XStack spacing={12} className="items-center justify-around">
                  <Animate animation="slideDown" duration={1500}>
                    <View className="w-12 h-12 bg-pink-500 rounded" />
                  </Animate>
                  <Animate animation="ping" duration={1500}>
                    <View className="w-12 h-12 bg-teal-500 rounded" />
                  </Animate>
                </XStack>
              </YStack>
            </XStack>
          </CardContent>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default Three;