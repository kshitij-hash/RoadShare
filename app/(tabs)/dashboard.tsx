import React from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardScreen from '../../screens/DashboardScreen';

function Dashboard() {
  return (
    <View style={styles.container}>
      <DashboardScreen />
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
