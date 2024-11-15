import React, { useState } from 'react';
import { RefreshControl, ScrollView, ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

interface PullToRefreshProps extends ViewProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function PullToRefresh({
  onRefresh,
  children,
  className,
  ...props
}: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      className={cn("flex-1", className)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#2563eb']} // primary color
          tintColor="#2563eb"
        />
      }
      {...props}
    >
      {children}
    </ScrollView>
  );
}