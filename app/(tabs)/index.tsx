import React, { useState } from 'react';
import { useNotifications } from '../../contexts/notification-context';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarGroup } from '~/components/ui/avatar';
import { Alert } from '~/components/ui/alert';
import { AccordionItem } from '~/components/ui/accordion';

import { PullToRefresh } from '~/components/ui/pull-to-refresh';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { TextInput } from 'react-native';


export default function Home() {
  const { addNotification } = useNotifications();
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formValue, setFormValue] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleRefresh = async () => {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSuccessNotification = () => {
    addNotification({
      title: 'Success',
      message: 'Operation completed successfully!',
      type: 'success',
    });
  };

  const handleErrorNotification = () => {
    addNotification({
      title: 'Error',
      message: 'Something went wrong!',
      type: 'error',
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : undefined;
      case 'email':
        return !value.includes('@') ? 'Invalid email address' : undefined;
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : undefined;
      case 'phone':
        return !/^\d{10}$/.test(value) ? 'Phone must be 10 digits' : undefined;
      default:
        return undefined;
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'UI Components Demo' }} />
      <PullToRefresh onRefresh={handleRefresh}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Component</Text>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Welcome to the App</CardTitle>
              </CardHeader>
              <CardContent>
                <Text>This card demonstrates the Card component.</Text>
              </CardContent>
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Button & Badge</Text>
            <View style={styles.row}>
              <Button 
                variant="default" 
                onPress={() => alert('Button Pressed')}
                className="mr-2"
              >
                Default Button
              </Button>
              <Badge variant="secondary">New</Badge>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avatar Group</Text>
            <AvatarGroup max={3}>
              <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
              <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
              <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
              <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=4' }} />
            </AvatarGroup>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alert</Text>
            <Alert 
              title="Notice" 
              description="This is an alert message." 
              className="mb-4"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accordion</Text>
            <AccordionItem title="More Information">
              <Text>This is the content inside the accordion.</Text>
            </AccordionItem>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.row}>
              <Button 
                variant="default" 
                onPress={handleSuccessNotification}
                className="mr-2"
              >
                Success Notification
              </Button>
              <Button 
                variant="destructive" 
                onPress={handleErrorNotification}
                className="mr-2"
              >
                Error Notification
              </Button>
            </View>
          </View>

          <View style={styles.section}>
            <Text  style={styles.sectionTitle}>Skeleton</Text>
            <View className='flex-row mb-4'>
              <Skeleton
              className='h-12 w-12 rounded-full bg-slate-200 mr-4'
              />

              <Skeleton className="h-12 w-[80%] bg-slate-200" />
            </View>
           
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Form Example</Text>
            <View style={styles.formContainer}>
              <FormField
                name="username"
                value={formData.username}
                onChange={(value) => handleFormChange('username', value)}
                error={validateField('username', formData.username)}
                render={({ value, onChange, error }) => (
                  <>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        className="border rounded-md p-2 bg-background mb-2"
                        placeholder="Enter username"
                      />
                    </FormControl>
                    {error && <FormMessage>{error}</FormMessage>}
                  </>
                )}
              />

              <FormField
                name="email"
                value={formData.email}
                onChange={(value) => handleFormChange('email', value)}
                error={validateField('email', formData.email)}
                render={({ value, onChange, error }) => (
                  <>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        className="border rounded-md p-2 bg-background mb-2"
                        placeholder="Enter email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </FormControl>
                    {error && <FormMessage>{error}</FormMessage>}
                  </>
                )}
              />

              <FormField
                name="password"
                value={formData.password}
                onChange={(value) => handleFormChange('password', value)}
                error={validateField('password', formData.password)}
                render={({ value, onChange, error }) => (
                  <>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        className="border rounded-md p-2 bg-background mb-2"
                        placeholder="Enter password"
                        secureTextEntry
                      />
                    </FormControl>
                    {error && <FormMessage>{error}</FormMessage>}
                  </>
                )}
              />

              <FormField
                name="phone"
                value={formData.phone}
                onChange={(value) => handleFormChange('phone', value)}
                error={validateField('phone', formData.phone)}
                render={({ value, onChange, error }) => (
                  <>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        className="border rounded-md p-2 bg-background mb-2"
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                      />
                    </FormControl>
                    {error && <FormMessage>{error}</FormMessage>}
                  </>
                )}
              />

              <Button 
                onPress={() => console.log('Form Data:', formData)}
                className="mt-4"
              >
                Submit Form
              </Button>
            </View>
          </View>
        </ScrollView>
      </PullToRefresh>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {
    gap: 16,
  },
});
