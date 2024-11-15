import { Link, Tabs } from 'expo-router';
import { View } from 'react-native';
import { useNotifications } from '../../contexts/notification-context';
import { NotificationBadge } from '../../components/ui/notification-badge';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { notificationCounts } = useNotifications();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'UI component demo',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View style={{ marginRight: 15, position: 'relative' }}>
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
              <View style={{ position: 'absolute', top: -8, right: -8 }}>
                {notificationCounts.total > 0 && (
                  <NotificationBadge 
                    count={notificationCounts.total}
                    size="large"
                    className="border-2 border-white"
                  />
                )}
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'UI component demo',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'UI component demo',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
