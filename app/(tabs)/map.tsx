import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapScreen from '../../screens/MapScreen';

function Map() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MapScreen />
    </SafeAreaView>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
