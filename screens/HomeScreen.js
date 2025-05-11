import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { DataContext } from '../context/DataContext';

export default function HomeScreen() {
  const { isSharing, toggleDataSharing } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>CarData</Text>
        <Text style={styles.subtitle}>Monetize Your Vehicle Data</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: isSharing ? '#4CAF50' : '#F44336' }]} />
        <Text style={styles.statusText}>
          {isSharing ? 'Data Sharing Active' : 'Data Sharing Inactive'}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.sharingButton, { backgroundColor: isSharing ? '#F44336' : '#4CAF50' }]}
        onPress={toggleDataSharing}
      >
        <Text style={styles.sharingButtonText}>
          {isSharing ? 'STOP SHARING' : 'START SHARING'}
        </Text>
      </TouchableOpacity>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/dashboard')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>🚗</Text>
          </View>
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/map')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>🗺️</Text>
          </View>
          <Text style={styles.menuText}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/earnings')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>💰</Text>
          </View>
          <Text style={styles.menuText}>Earnings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>⚙️</Text>
          </View>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Securely share your vehicle data and earn rewards</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  sharingButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  sharingButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
});
