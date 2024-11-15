import React, { useState, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface ImageCarouselProps extends ViewProps {
  images: string[];
  showIndicators?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function ImageCarousel({
  images,
  showIndicators = true,
  autoPlay = false,
  interval = 3000,
  className,
  ...props
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = setInterval(() => {
        const nextIndex = (activeIndex + 1) % images.length;
        setActiveIndex(nextIndex);
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
      }, interval);
    }
    return () => timer && clearInterval(timer);
  }, [activeIndex, autoPlay, images.length, interval]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View className={cn("relative", className)} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: screenWidth, height: '100%' }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      {showIndicators && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
          {images.map((_, index) => (
            <View
              key={index}
              className={cn(
                "w-2 h-2 rounded-full mx-1",
                index === activeIndex
                  ? "bg-white"
                  : "bg-white/50"
              )}
            />
          ))}
        </View>
      )}
    </View>
  );
}