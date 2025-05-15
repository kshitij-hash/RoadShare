import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const EmailInputComponent = ({ onContinue, initialEmail, setEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailValue, setEmailValue] = useState(initialEmail || "");
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];

  const handleContinue = async () => {
    if (!emailValue || !emailValue.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      // Update the parent component's email state
      if (setEmail) {
        setEmail(emailValue);
      }
      await onContinue(emailValue);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <View>
      <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
      <TextInput
        placeholder="Enter your email address"
        value={emailValue}
        onChangeText={(text) => {
          setEmailValue(text);
          setError(""); // Clear error when user types
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.icon}
        autoCorrect={false}
        spellCheck={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={!emailValue || isLoading}
        style={[styles.button, { backgroundColor: colors.tint, opacity: (!emailValue || isLoading) ? 0.5 : 1 }]}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Processing...' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EmailInputComponent;
