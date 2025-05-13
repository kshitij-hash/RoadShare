import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '../../screens/SettingsScreen';

function Settings() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SettingsScreen />
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
