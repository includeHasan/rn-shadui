import React from 'react';
import { View, Text, Pressable, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface Step {
  label: string;
  description?: string;
}

interface ProgressStepsProps extends ViewProps {
  steps: Step[];
  currentStep: number;
  onStepPress?: (step: number) => void;
  className?: string;
}

export function ProgressSteps({
  steps,
  currentStep,
  onStepPress,
  className,
  ...props
}: ProgressStepsProps) {
  return (
    <View className={cn("", className)} {...props}>
      <View className="flex-row items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <Pressable
              onPress={() => onStepPress?.(index)}
              className="flex-col items-center"
            >
              <View
                className={cn(
                  "w-8 h-8 rounded-full items-center justify-center",
                  index < currentStep
                    ? "bg-primary"
                    : index === currentStep
                    ? "bg-primary"
                    : "bg-gray-200"
                )}
              >
                {index < currentStep ? (
                  <Text className="text-white text-sm">✓</Text>
                ) : (
                  <Text
                    className={cn(
                      "text-sm font-medium",
                      index === currentStep ? "text-white" : "text-gray-600"
                    )}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              {/* Step Label */}
              <Text
                className={cn(
                  "text-xs mt-1 text-center",
                  index <= currentStep ? "text-primary" : "text-gray-500"
                )}
              >
                {step.label}
              </Text>
              {step.description && (
                <Text className="text-xs text-gray-400 mt-0.5 text-center">
                  {step.description}
                </Text>
              )}
            </Pressable>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <View
                className={cn(
                  "flex-1 h-0.5 mx-2",
                  index < currentStep ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}