import React from 'react';
import { View, StyleSheet, ViewProps, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CardProps extends ViewProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  title,
  subtitle,
  children,
  variant = 'default',
  padding = 'medium',
  style,
  ...rest
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Determine card styles based on variant
  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          ...styles.elevated,
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        };
      case 'outlined':
        return {
          ...styles.outlined,
          borderColor: colors.border,
        };
      default:
        return {
          backgroundColor: colors.cardBackground,
        };
    }
  };

  // Determine padding based on size
  const getPadding = () => {
    switch (padding) {
      case 'none':
        return styles.paddingNone;
      case 'small':
        return styles.paddingSmall;
      case 'large':
        return styles.paddingLarge;
      default:
        return styles.paddingMedium;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getCardStyle(),
        getPadding(),
        style,
      ]}
      {...rest}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <ThemedText 
              type="subtitle" 
              numberOfLines={2} 
              ellipsizeMode="tail"
            >
              {title}
            </ThemedText>
          )}
          {subtitle && (
            <ThemedText 
              type="caption" 
              style={styles.subtitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    maxWidth: '100%',
    overflow: 'visible', // Changed from 'hidden' to prevent clipping of shadows
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  header: {
    marginBottom: 12,
    width: '100%',
  },
  subtitle: {
    marginTop: 4,
  },
  content: {
    width: '100%',
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: 12,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
});
