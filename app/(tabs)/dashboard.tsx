import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardScreen from '../../screens/DashboardScreen';

function Dashboard() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DashboardScreen />
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
