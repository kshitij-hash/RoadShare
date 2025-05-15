import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DataProvider } from '../context/DataContext';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Add additional modern fonts if needed
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider value={DarkTheme}>
            <StatusBar style="light" />
            <Stack initialRouteName="splash" screenOptions={{ 
              headerShown: false,
              animation: 'fade',
              contentStyle: { backgroundColor: '#121212' } 
            }}>
              <Stack.Screen name="splash" options={{ animation: 'fade' }} />
              <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
              <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
