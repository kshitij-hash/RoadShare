import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import EarningsScreen from './screens/EarningsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import data context
import { DataProvider } from './context/DataContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ title: 'Vehicle Dashboard' }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Location Tracking' }}
          />
          <Stack.Screen 
            name="Earnings" 
            component={EarningsScreen} 
            options={{ title: 'Data Sharing Earnings' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
