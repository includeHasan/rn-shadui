import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';

import { ImageCarousel } from '~/components/ui/image-carousel';
import { FloatingLabelInput } from '~/components/ui/floating-label-input';
import { FAB } from '~/components/ui/fab';
import { Dialog } from '~/components/ui/dialog';
import { Chip } from '~/components/ui/chip';
import { Checkbox } from '~/components/ui/checkbox';

import { SearchBar } from '~/components/ui/search-bar';
import { RangeSlider } from '~/components/ui/range-slider';

import { Progress } from '~/components/ui/progress';
import { ProgressSteps } from '~/components/ui/progress-steps';
import { PinInput } from '~/components/ui/pin-input';
import { Tooltip } from '~/components/ui/tooltip';
import { Tabs } from '~/components/ui/tabs';
import { Switch } from '~/components/ui/switch';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('tab1');
  const [switchEnabled, setSwitchEnabled] = useState(false);

  const steps = [
    { label: 'Step 1', description: 'Start' },
    { label: 'Step 2', description: 'Details' },
    { label: 'Step 3', description: 'Complete' },
  ];

  const tabItems = [
    { value: 'tab1', label: 'Profile' },
    { value: 'tab2', label: 'Settings' },
    { value: 'tab3', label: 'Messages' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'UI Components Demo' }} />
      <ScrollView style={styles.container}>
        {/* Image Carousel Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image Carousel</Text>
          <ImageCarousel
            images={[
              'https://picsum.photos/400/200?random=1',
              'https://picsum.photos/400/200?random=2',
              'https://picsum.photos/400/200?random=3',
            ]}
            showIndicators
            autoPlay
            className="h-48"
          />
        </View>

        {/* Tabs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tabs Navigation</Text>
          <Tabs
            items={tabItems}
            defaultValue="tab1"
            onChange={setActiveTab}
          />
          <Text style={styles.description}>
            Active section: {activeTab}
          </Text>
        </View>

        {/* Interactive Controls Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Controls</Text>
          <View style={styles.row}>
            <Switch
              checked={switchEnabled}
              onCheckedChange={setSwitchEnabled}
            />
            <Text style={styles.description}>
              Switch is {switchEnabled ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>

        {/* Search and Input Section */}
        {/* Search Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search</Text>
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchValue}
              onChangeText={setSearchValue}
              suggestions={['React', 'React Native', 'TypeScript', 'JavaScript']}
            />
          </View>
        </View>

        {/* PIN Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PIN Input</Text>
          <PinInput
            value={pinValue}
            onChange={setPinValue}
            length={4}
            className="mt-4"
          />
        </View>

        {/* Progress Indicators Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Indicators</Text>
          <Progress value={65} max={100} className="mb-4" />
          <ProgressSteps
            steps={steps}
            currentStep={currentStep}
            onStepPress={setCurrentStep}
          />
        </View>

        {/* Range Control Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Range Control</Text>
          <RangeSlider
            min={0}
            max={100}
            values={[20, 80]}
            onChange={console.log}
          />
        </View>

        {/* Tooltips and Hints Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tooltips and Hints</Text>
            <View style={styles.row}>
            <Tooltip
              trigger={
              <Button title="Help Info" onPress={() => {}} />
              }
              content="This is a helpful tooltip with more information"
            />
            <View style={{ width: 16 }} />
            <Tooltip
              trigger={
              <Text style={styles.link}>More Info ℹ️</Text>
              }
              content="Click for additional details"
            />
            </View>
        </View>

        {/* Selection Controls Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selection Controls</Text>
          <View style={styles.row}>
            <Chip
              label="Featured"
              onPress={() => console.log('Chip pressed')}
              selected={true}
              className="mb-4 mr-2"
            />
            <Chip
              label="Removable"
              onPress={() => console.log('Chip pressed')}
              onRemove={() => console.log('Chip removed')}
              selected={false}
              className="mb-4"
            />
          </View>
          <Checkbox
            label="I agree to the terms"
            checked={false}
            onCheckedChange={console.log}
          />
        </View>

        {/* Floating Action Button */}
        <FAB
          onTap={() => setDialogOpen(true)}
          icon="+"
          className="absolute h-10  bottom-4 right-4"
        />

        {/* Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Component Demo"
          description="This is an example dialog component."
        >
          <Text>Explore our interactive UI components</Text>
        </Dialog>
      </ScrollView>
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
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1000, // Ensure suggestions appear above other content
    minHeight: 90, // Reserve space for suggestions
    marginBottom: 16,
  },
});
