import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { cn } from '../../lib/utils';

interface TooltipProps {
  trigger: React.ReactNode;
  content: string;
  className?: string;
}

export function Tooltip({ trigger, content, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showTooltip}>
        {trigger}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setVisible(false)}
        >
          <View
            className={cn(
              "absolute bg-popover rounded-lg px-3 py-2 shadow-lg",
              className
            )}
            style={{
              top: position.y - 45,
              left: position.x - 100,
              maxWidth: Dimensions.get('window').width * 0.8,
            }}
          >
            <Text className="text-sm text-popover-foreground">
              {content}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}