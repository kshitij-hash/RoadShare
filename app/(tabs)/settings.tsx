import React from 'react';
import { View, StyleSheet } from 'react-native';
import SettingsScreen from '../../screens/SettingsScreen';

function Settings() {
  return (
    <View style={styles.container}>
      <SettingsScreen />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
