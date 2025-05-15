import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { AuthContext } from '../../context/AuthContext';
import OTPVerificationComponent from '../../components/OTPVerificationComponent';
import { randomTestEmail } from '../../utils/random';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../../components/ThemedText';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AuthScreen() {
  const [email, setEmail] = useState(randomTestEmail());
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmail, verifyEmail, resendVerificationCode, setUserEmail } = useContext(AuthContext);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleContinue = async () => {
    if (!email) return;
    setIsLoading(true);
    try {
      setUserEmail(email); // Store email for later use in verification
      const result = await loginWithEmail(email);
      if (result.success) {
        if (result.needsVerification) {
          setShowOTP(true);
        } else {
          // User already exists and is logged in, navigate to tabs
          router.replace('/(tabs)');
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleVerify = async (verificationCode: string) => {
    if (!verificationCode) return;
    try {
      const result = await verifyEmail(verificationCode);
      if (result.success) {
        // Successfully verified and registered passkey
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleResendOTP = async () => {
    await resendVerificationCode();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        
        {/* Header with gradient */}
        <LinearGradient
          colors={[colors.background, colors.surface]}
          style={styles.headerSection}
        >
          <View style={styles.headerContent}>
            <View style={[styles.logoContainer, { backgroundColor: `${colors.tint}20` }]}>
              <FontAwesome5 name="car" size={32} color={colors.tint} />
            </View>
            <ThemedText type="title" style={styles.title}>
              RoadShare
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              {showOTP ? 'Verify Your Account' : 'Welcome Back'}
            </ThemedText>
          </View>
        </LinearGradient>

        <Card 
          variant="elevated" 
          padding="large" 
          style={styles.authCard}
        >
          <ThemedText type="heading" style={styles.authTitle}>
            {showOTP ? "Enter Verification Code" : "Email Authentication"}
          </ThemedText>
          
          <ThemedText type="caption" style={styles.authSubtitle}>
            {showOTP
              ? "Enter the code sent to your email. When using @test.usepara.com, a random 6-digit code is auto-filled for rapid testing."
              : "Sign in or create an account with your email. A random test email is pre-filled for quick testing."}
          </ThemedText>

          {!showOTP ? (
            <View style={styles.formContainer}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<FontAwesome5 name="envelope" size={16} color={colors.icon} />}
                containerStyle={styles.inputContainer}
              />
              
              <Button
                title={isLoading ? 'Loading...' : 'Continue'}
                onPress={handleContinue}
                disabled={!email || isLoading}
                loading={isLoading}
                fullWidth
                style={styles.submitButton}
              />
            </View>
          ) : (
            <OTPVerificationComponent
              onVerify={handleVerify}
              resendOTP={handleResendOTP}
            />
          )}
        </Card>
        
        <View style={styles.footer}>
          <ThemedText type="caption" style={styles.footerText}>
            Powered by Para SDK
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 18,
    maxWidth: '90%',
  },
  authCard: {
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
    width: 'auto',
    maxWidth: 500,
    alignSelf: 'center',
  },
  authTitle: {
    marginBottom: 10,
    fontSize: 22,
  },
  authSubtitle: {
    marginBottom: 24,
    lineHeight: 20,
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  footerText: {
    opacity: 0.6,
  },
});
