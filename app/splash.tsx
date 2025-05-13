import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  // Animation values - using useMemo to prevent recreation on every render
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.8), []);
  
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      })
    ]).start();
    
    // Navigate to main app after delay
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View 
        style={[{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }]}
      >
        <Image 
          source={require('../assets/images/splash-icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>RoadShare</Text>
        <Text style={styles.subtitle}>Drive. Share. Earn.</Text>
      </Animated.View>
      
      <Animated.View style={{ opacity: fadeAnim, position: 'absolute', bottom: 50 }}>
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1128',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4CC9F0',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  }
});
