import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { randomTestOTP } from '../utils/random';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const OTPVerificationComponent = ({ onVerify, resendOTP }) => {
  const [otp, setOtp] = useState(randomTestOTP());
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];

  const handleVerify = async () => {
    setIsVerifying(true);
    setError("");
    try {
      await onVerify(otp);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
    setIsVerifying(false);
  };

  const handleResend = async () => {
    try {
      await resendOTP();
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <View>
      <Text style={[styles.inputLabel, { color: colors.text }]}>Verification Code</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.icon}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        onPress={handleVerify}
        disabled={otp.length !== 6 || isVerifying}
        style={[styles.button, { backgroundColor: colors.tint, opacity: (otp.length !== 6 || isVerifying) ? 0.5 : 1 }]}
      >
        <Text style={styles.buttonText}>
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleResend}
        style={styles.resendButton}
      >
        <Text style={[styles.resendButtonText, { color: colors.tint }]}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: '#E63946', // Using error color from Colors.ts
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OTPVerificationComponent;
