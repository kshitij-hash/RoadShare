import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EarningsScreen from '../../screens/EarningsScreen';

function Earnings() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <EarningsScreen />
    </SafeAreaView>
  );
}

export default Earnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
