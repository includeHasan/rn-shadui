import { StatusBar } from 'expo-status-bar';
import { Platform, View, ScrollView, Text } from 'react-native';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { useNotifications } from '../contexts/notification-context';

export default function Modal() {
  const { notifications, addNotification, removeNotification, notificationCounts } = useNotifications();

  const getNotificationColor = (type?: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Card className="m-4">
        <CardContent>
          <View className="flex-row justify-between">
            <Text>Total: {notificationCounts.total}</Text>
            <Text className="text-green-600">Success: {notificationCounts.success}</Text>
            <Text className="text-red-600">Error: {notificationCounts.error}</Text>
            <Text className="text-blue-600">Info: {notificationCounts.info}</Text>
          </View>
        </CardContent>
      </Card>

      <ScrollView>
        {notifications.length === 0 ? (
          <Card className="m-4">
            <CardContent>
              <Text className="text-center text-gray-500">No notifications</Text>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`m-4 ${getNotificationColor(notification.type)}`}
            >
              <CardHeader>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle>{notification.title}</CardTitle>
                  <Button
                    variant="ghost"
                    onPress={() => removeNotification(notification.id)}
                    className="h-8 w-8 p-0"
                  >
                    ✕
                  </Button>
                </View>
              </CardHeader>
              <CardContent>
                <Text className="text-sm">{notification.message}</Text>
                <Text className="text-xs text-gray-500 mt-2">
                  Type: {notification.type || 'default'}
                </Text>
              </CardContent>
            </Card>
          ))
        )}
      </ScrollView>

      <View className="p-4 border-t border-gray-200">
        <Button 
          onPress={() => addNotification({
            title: 'Test Notification',
            message: 'This is a test notification with more detailed information.',
            type: Math.random() > 0.5 ? 'success' : 'error'
          })}
          className="w-full"
        >
          Add Test Notification
        </Button>
      </View>
      
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
