import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useColorScheme } from '@/hooks/useColorScheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  helper?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  variant = 'default',
  helper,
  style,
  containerStyle,
  ...rest
}: InputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Determine input container styles based on variant
  const getInputContainerStyle = () => {
    const baseStyle = {
      borderColor: error ? colors.error : isFocused ? colors.tint : colors.border,
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: colors.inputBackground,
          borderWidth: error || isFocused ? 1 : 0,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderRadius: 0,
        };
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText type="label" style={styles.label}>
          {label}
        </ThemedText>
      )}

      <View
        style={[
          styles.inputContainer,
          getInputContainerStyle(),
          containerStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              paddingLeft: leftIcon ? 0 : 12,
              paddingRight: (rightIcon || isPassword) ? 0 : 12,
            },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !passwordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={colors.tint}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <FontAwesome5
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={18}
              color={colors.icon}
            />
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {(error || helper) && (
        <ThemedText
          type="caption"
          style={[
            styles.helperText,
            { color: error ? colors.error : colors.textSecondary },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {error || helper}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    minHeight: 48,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  input: {
    flex: 1,
    minHeight: 48,
    fontSize: 16,
    paddingVertical: 12,
  },
  leftIcon: {
    paddingLeft: 12,
    paddingRight: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    paddingRight: 12,
    paddingLeft: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
    maxWidth: '95%',
  },
});
