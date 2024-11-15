import React, { createContext, useContext, useState, useMemo } from 'react';

type NotificationType = {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
};

type NotificationContextType = {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, 'id'>) => void;
  removeNotification: (id: string) => void;
  notificationCounts: {
    total: number;
    success: number;
    error: number;
    info: number;
  };
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const notificationCounts = useMemo(() => ({
    total: notifications.length,
    success: notifications.filter(n => n.type === 'success').length,
    error: notifications.filter(n => n.type === 'error').length,
    info: notifications.filter(n => n.type === 'info').length,
  }), [notifications]);

  const addNotification = (notification: Omit<NotificationType, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification,
      notificationCounts 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};