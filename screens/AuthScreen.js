import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import OTPVerificationComponent from '../components/OTPVerificationComponent';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { randomTestEmail } from '../utils/random';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState(randomTestEmail());
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmail, verifyEmail, resendVerificationCode, setUserEmail } = useContext(AuthContext);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];

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
          // User already exists and is logged in, navigate to Home
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleVerify = async (verificationCode) => {
    if (!verificationCode) return;
    try {
      const result = await verifyEmail(verificationCode);
      if (result.success) {
        // Successfully verified and registered passkey
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleResendOTP = async () => {
    await resendVerificationCode();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>RoadShare</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>
              {showOTP ? 'Verify Your Account' : 'Welcome Back'}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          
          <View style={[styles.authContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.authTitle, { color: colors.text }]}>
              {showOTP ? "Enter Verification Code" : "Email Authentication"}
            </Text>
            <Text style={[styles.authSubtitle, { color: colors.icon }]}>
              {showOTP
                ? "Enter the code sent to your email. When using @test.usepara.com, a random 6-digit code is auto-filled for rapid testing."
                : "Sign in or create an account with your email. A random test email is pre-filled for quick testing."}
            </Text>

            {!showOTP ? (
              <View style={styles.formContainer}>
                <Input
                  label="Email"
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={[styles.input, { borderColor: colors.border }]}
                  inputStyle={[styles.inputText, { color: colors.text }]}
                  labelStyle={[styles.inputLabel, { color: colors.text }]}
                  maxLength={50}
                  autoCorrect={false}
                  spellCheck={false}
                  placeholderTextColor={`${colors.text}80`}
                />
                <Button
                  title="Continue"
                  onPress={handleContinue}
                  disabled={!email || isLoading}
                  loading={isLoading}
                  buttonStyle={[styles.button, { backgroundColor: colors.tint }]}
                  containerStyle={styles.buttonContainer}
                  titleStyle={styles.buttonText}
                  disabledStyle={{ backgroundColor: colors.tint, opacity: 0.6 }}
                  disabledTitleStyle={{ color: '#FFFFFF' }}
                />
              </View>
            ) : (
              <OTPVerificationComponent
                onVerify={handleVerify}
                resendOTP={handleResendOTP}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  authContainer: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    height: 48,
    backgroundColor: 'transparent',
    width: '100%',
  },
  inputText: {
    fontSize: 16,
    paddingLeft: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
