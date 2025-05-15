import { useColorScheme as _useColorScheme } from 'react-native';

export type ColorSchemeName = 'light' | 'dark';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This function narrows the type so it's
// always defined as either 'light' or 'dark'.
export function useColorScheme(): ColorSchemeName {
  // Force dark mode for this application
  return 'dark';
  // If you want to use the device's color scheme, uncomment below:
  // return _useColorScheme() === 'dark' ? 'dark' : 'light';
}
