import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { cn } from '../../lib/utils';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-foreground/50">
          <TouchableWithoutFeedback>
            <View
              className={cn(
                "w-[90%] max-w-md bg-background rounded-lg p-4",
                className
              )}
            >
              {/* Close Button */}
              <TouchableOpacity
                onPress={onClose}
                className="absolute top-2 right-2"
              >
                <Text className="text-foreground text-xl">×</Text>
              </TouchableOpacity>
              {title && (
                <Text className="text-lg font-semibold text-foreground mb-2">
                  {title}
                </Text>
              )}
              {description && (
                <Text className="text-sm text-foreground/70 mb-4">
                  {description}
                </Text>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}