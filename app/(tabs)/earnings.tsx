import React from 'react';
import { View, StyleSheet } from 'react-native';
import EarningsScreen from '../../screens/EarningsScreen';

function Earnings() {
  return (
    <View style={styles.container}>
      <EarningsScreen />
    </View>
  );
}

export default Earnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
