import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { DataContext } from '../context/DataContext';

export default function SettingsScreen() {
  const { isSharing, toggleDataSharing } = useContext(DataContext);
  
  // Settings state
  const [settings, setSettings] = useState({
    shareSpeed: true,
    shareLocation: true,
    shareFuel: true,
    shareDiagnostics: true,
    shareEngineTemp: true,
    dataFrequency: 'high', // high, medium, low
    darkMode: true,
    notifications: true,
  });

  // Toggle a boolean setting
  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Set data frequency
  const setDataFrequency = (value) => {
    setSettings(prev => ({
      ...prev,
      dataFrequency: value
    }));
  };

  // Show privacy policy
  const showPrivacyPolicy = () => {
    Alert.alert(
      "Privacy Policy",
      "Your vehicle data is securely transmitted and stored. We use industry-standard encryption to protect your data. You can stop sharing data at any time. Your data is used to provide services to you and to improve our platform. We may share anonymized data with partners for research purposes.",
      [{ text: "OK" }]
    );
  };

  // Show terms of service
  const showTerms = () => {
    Alert.alert(
      "Terms of Service",
      "By using this app, you agree to share your vehicle data in exchange for rewards. You retain ownership of your data. We provide no warranty for the accuracy of earnings calculations. Rewards rates may change based on market conditions.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Sharing</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Data Sharing</Text>
          <Switch
            value={isSharing}
            onValueChange={toggleDataSharing}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={isSharing ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share Speed Data</Text>
          <Switch
            value={settings.shareSpeed}
            onValueChange={() => toggleSetting('shareSpeed')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.shareSpeed ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share Location Data</Text>
          <Switch
            value={settings.shareLocation}
            onValueChange={() => toggleSetting('shareLocation')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.shareLocation ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share Fuel Data</Text>
          <Switch
            value={settings.shareFuel}
            onValueChange={() => toggleSetting('shareFuel')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.shareFuel ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share Diagnostics</Text>
          <Switch
            value={settings.shareDiagnostics}
            onValueChange={() => toggleSetting('shareDiagnostics')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.shareDiagnostics ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Share Engine Temperature</Text>
          <Switch
            value={settings.shareEngineTemp}
            onValueChange={() => toggleSetting('shareEngineTemp')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.shareEngineTemp ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Frequency</Text>
        
        <View style={styles.frequencyContainer}>
          <TouchableOpacity 
            style={[styles.frequencyButton, settings.dataFrequency === 'low' && styles.activeFrequency]}
            onPress={() => setDataFrequency('low')}
          >
            <Text style={[styles.frequencyText, settings.dataFrequency === 'low' && styles.activeFrequencyText]}>Low</Text>
            <Text style={styles.frequencySubtext}>Every 5 min</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.frequencyButton, settings.dataFrequency === 'medium' && styles.activeFrequency]}
            onPress={() => setDataFrequency('medium')}
          >
            <Text style={[styles.frequencyText, settings.dataFrequency === 'medium' && styles.activeFrequencyText]}>Medium</Text>
            <Text style={styles.frequencySubtext}>Every 1 min</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.frequencyButton, settings.dataFrequency === 'high' && styles.activeFrequency]}
            onPress={() => setDataFrequency('high')}
          >
            <Text style={[styles.frequencyText, settings.dataFrequency === 'high' && styles.activeFrequencyText]}>High</Text>
            <Text style={styles.frequencySubtext}>Every 10 sec</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.frequencyNote}>
          Higher frequency provides more accurate data but uses more battery and data.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={() => toggleSetting('darkMode')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.darkMode ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={settings.notifications}
            onValueChange={() => toggleSetting('notifications')}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={settings.notifications ? '#FFFFFF' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        
        <TouchableOpacity style={styles.legalButton} onPress={showPrivacyPolicy}>
          <Text style={styles.legalButtonText}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.legalButton} onPress={showTerms}>
          <Text style={styles.legalButtonText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>CarData v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  frequencyButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  activeFrequency: {
    backgroundColor: '#4CAF50',
  },
  frequencyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activeFrequencyText: {
    color: '#FFFFFF',
  },
  frequencySubtext: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  frequencyNote: {
    color: '#BBBBBB',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
  },
  legalButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  legalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    color: '#888888',
    fontSize: 14,
  },
});
