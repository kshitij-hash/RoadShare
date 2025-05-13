import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../../screens/HomeScreen';

function Home() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeScreen />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
