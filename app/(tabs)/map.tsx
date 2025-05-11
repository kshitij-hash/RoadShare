import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapScreen from '../../screens/MapScreen';

function Map() {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
