import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { DataContext } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function HomeScreen() {
  const { isSharing, toggleDataSharing, earnings } = useContext(DataContext);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];


  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>RoadShare</Text>
          <Text style={styles.subtitle}>Drive. Share. Earn.</Text>
        </View>
      </LinearGradient>

      {/* Earnings Card */}
      <View style={[styles.earningsCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <View style={styles.earningsHeader}>
          <Text style={[styles.earningsTitle, { color: colors.text }]}>Total Earnings</Text>
          <View style={[styles.statusPill, { backgroundColor: isSharing ? '#4CAF50' : '#F44336' }]}>
            <Text style={styles.statusPillText}>{isSharing ? 'Active' : 'Inactive'}</Text>
          </View>
        </View>
        <Text style={[styles.earningsAmount, { color: colors.text }]}>
          ${earnings.toFixed(4)}
        </Text>
        <TouchableOpacity 
          style={[styles.sharingButton, { backgroundColor: isSharing ? '#F44336' : '#4CAF50' }]}
          onPress={toggleDataSharing}
        >
          <Text style={styles.sharingButtonText}>
            {isSharing ? 'STOP SHARING' : 'START SHARING'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          onPress={() => router.push('/(tabs)/dashboard')}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(67, 97, 238, 0.15)' }]}>
            <Text style={styles.menuIconText}>🚗</Text>
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Dashboard</Text>
          <Text style={[styles.menuDescription, { color: colors.icon }]}>View vehicle metrics</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          onPress={() => router.push('/(tabs)/map')}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(6, 214, 160, 0.15)' }]}>
            <Text style={styles.menuIconText}>🗺️</Text>
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Location</Text>
          <Text style={[styles.menuDescription, { color: colors.icon }]}>Track your routes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          onPress={() => router.push('/(tabs)/earnings')}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(247, 37, 133, 0.15)' }]}>
            <Text style={styles.menuIconText}>💰</Text>
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Earnings</Text>
          <Text style={[styles.menuDescription, { color: colors.icon }]}>View your rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(76, 201, 240, 0.15)' }]}>
            <Text style={styles.menuIconText}>⚙️</Text>
          </View>
          <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.menuDescription, { color: colors.icon }]}>Customize sharing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          RoadShare securely monetizes your vehicle data
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  earningsCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#212529',
  },
  sharingButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sharingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 15,
    color: '#212529',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
    width: '100%',
  },
  menuItem: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212529',
  },
  menuDescription: {
    fontSize: 12,
    color: '#495057',
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6c757d',
  },
});
