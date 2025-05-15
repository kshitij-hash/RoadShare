/**
 * RoadShare App Color Palette
 * Modern, consistent dark theme for our vehicle data sharing application
 */

// Primary colors - vibrant blues with better contrast
const primaryLight = '#5C7CFA'; // Brighter blue for light mode
const primaryDark = '#4263EB';  // Deeper blue for dark mode

// Secondary accent colors - vibrant teal
const accentLight = '#38D9A9'; // Brighter teal accent
const accentDark = '#20C997';  // Vibrant teal for dark mode

// Success/action colors - clear green
const successLight = '#40C057'; // Clear green for success states
const successDark = '#37B24D';  // Slightly darker green for dark mode

// Common colors
const errorColor = '#FA5252'; // Bright red for errors (better contrast)
const warningColor = '#FD7E14'; // Bright orange for warnings

// Neutral shades for dark mode
const darkBackground = '#121212';
const darkSurface = '#1E1E1E';
const darkBorder = '#2C2C2C';
const darkText = '#F8F9FA';
const darkTextSecondary = '#CED4DA';

export const Colors = {
  light: {
    text: '#212529',          // Dark gray for text
    textSecondary: '#495057', // Secondary text color
    background: '#FFFFFF',    // White background
    surface: '#F8F9FA',      // Light gray for surfaces
    card: '#FFFFFF',         // White for cards
    tint: primaryLight,       // Bright blue as tint
    accent: accentLight,     // Teal accent
    success: successLight,   // Clear green success color
    warning: warningColor,   // Bright orange warning color
    error: errorColor,       // Bright red error color
    icon: '#495057',         // Icon color
    border: '#DEE2E6',       // Border color
    tabIconDefault: '#ADB5BD',// Default tab icon color
    tabIconSelected: primaryLight, // Selected tab color
    shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
    cardBackground: '#FFFFFF', // Card background
    inputBackground: '#F8F9FA', // Input background
    buttonBackground: primaryLight, // Button background
    buttonText: '#FFFFFF',    // Button text color
    divider: '#E9ECEF',       // Divider color
  },
  dark: {
    text: darkText,          // Very light gray text for dark mode
    textSecondary: darkTextSecondary, // Secondary text color
    background: darkBackground, // Very dark background (near black)
    surface: darkSurface,     // Slightly lighter dark for surfaces
    card: darkSurface,        // Slightly lighter dark for cards
    tint: primaryDark,        // Deeper blue as tint
    accent: accentDark,       // Vibrant teal accent
    success: successDark,     // Green success color
    warning: warningColor,    // Bright orange warning color
    error: errorColor,        // Bright red error color
    icon: '#ADB5BD',          // Lighter icon color for better contrast
    border: darkBorder,       // Border color
    tabIconDefault: '#868E96',// Default tab icon color
    tabIconSelected: primaryDark, // Selected tab color
    shadow: 'rgba(0, 0, 0, 0.5)', // Shadow color
    cardBackground: darkSurface, // Card background
    inputBackground: '#2A2A2A', // Input background
    buttonBackground: primaryDark, // Button background
    buttonText: '#FFFFFF',     // Button text color
    divider: '#343A40',        // Divider color
  },
};
