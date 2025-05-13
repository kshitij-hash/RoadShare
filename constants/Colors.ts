/**
 * RoadShare App Color Palette
 * Modern color scheme for our vehicle data sharing application
 */

// Primary colors
const primaryLight = '#4361EE'; // Blue primary color
const primaryDark = '#4CC9F0';  // Lighter blue for dark mode

// Secondary accent colors
const accentLight = '#F72585'; // Vibrant pink accent
const accentDark = '#F72585';  // Same vibrant pink for dark mode

// Success/action colors
const successLight = '#06D6A0'; // Teal for success states
const successDark = '#06D6A0';  // Same teal for dark mode

export const Colors = {
  light: {
    text: '#2B2D42',          // Dark blue-gray for text
    background: '#FFFFFF',    // White background
    card: '#F8F9FA',         // Light gray for cards
    tint: primaryLight,       // Primary blue as tint
    accent: accentLight,     // Pink accent
    success: successLight,   // Teal success color
    warning: '#FFBE0B',      // Amber warning color
    error: '#E63946',        // Red error color
    icon: '#687076',         // Icon color
    border: '#E9ECEF',       // Border color
    tabIconDefault: '#687076',// Default tab icon color
    tabIconSelected: primaryLight, // Selected tab color
    shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
  },
  dark: {
    text: '#F8F9FA',          // Light text for dark mode
    background: '#0A1128',    // Very dark blue background
    card: '#1A2238',         // Slightly lighter dark blue for cards
    tint: primaryDark,       // Light blue as tint
    accent: accentDark,      // Pink accent
    success: successDark,    // Teal success color
    warning: '#FFBE0B',      // Amber warning color
    error: '#E63946',        // Red error color
    icon: '#9BA1A6',         // Icon color
    border: '#2A3950',       // Border color
    tabIconDefault: '#9BA1A6',// Default tab icon color
    tabIconSelected: primaryDark, // Selected tab color
    shadow: 'rgba(0, 0, 0, 0.3)', // Shadow color
  },
};
