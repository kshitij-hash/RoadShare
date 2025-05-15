import { router } from 'expo-router';
import { useEffect, useMemo, useContext } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Animation values - using useMemo to prevent recreation on every render
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.9), []);
  
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      })
    ]).start();

    // Navigate after animation
    const timeout = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)');
        }
      }
    }, 2200);
    
    return () => clearTimeout(timeout);
  }, [fadeAnim, scaleAnim, isAuthenticated, isLoading]);
  
  return (
    <LinearGradient
      colors={[colors.background, colors.surface, colors.background]}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: `${colors.tint}20` }]}>
              <View style={[styles.logoInner, { backgroundColor: colors.background }]}>
                {/* Replace with your actual logo or icon */}
                <Image 
                  source={require('../assets/images/icon.png')} 
                  style={[styles.logoImage, { tintColor: colors.tint }]}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          
          <ThemedText type="title" style={styles.title}>
            RoadShare
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            Your vehicle data sharing platform
          </ThemedText>
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        <ThemedText type="caption" style={styles.footerText}>
          Powered by Para SDK
        </ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoImage: {
    width: 55,
    height: 55,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: '80%',
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    opacity: 0.7,
    fontSize: 14,
  },
});
