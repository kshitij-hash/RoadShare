import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { DataContext } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function SettingsScreen() {
  const { isSharing, toggleDataSharing, resetEarnings } = useContext(DataContext);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];
  
  // Settings state - only include working features
  const [settings, setSettings] = useState({
    shareSpeed: true,
    shareLocation: true,
    shareFuel: true,
    shareDiagnostics: true,
    shareEngineTemp: true,
    dataFrequency: 'high', // high, medium, low
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>Customize your data sharing preferences</Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Sharing</Text>
        
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Enable Data Sharing</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>Turn on to start earning rewards</Text>
          </View>
          <Switch
            value={isSharing}
            onValueChange={toggleDataSharing}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={isSharing ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Speed Data</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>Vehicle speed information</Text>
          </View>
          <Switch
            value={settings.shareSpeed}
            onValueChange={() => toggleSetting('shareSpeed')}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={settings.shareSpeed ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Location Data</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>GPS position tracking</Text>
          </View>
          <Switch
            value={settings.shareLocation}
            onValueChange={() => toggleSetting('shareLocation')}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={settings.shareLocation ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Fuel Data</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>Fuel level and consumption</Text>
          </View>
          <Switch
            value={settings.shareFuel}
            onValueChange={() => toggleSetting('shareFuel')}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={settings.shareFuel ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Diagnostics</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>Vehicle diagnostic codes</Text>
          </View>
          <Switch
            value={settings.shareDiagnostics}
            onValueChange={() => toggleSetting('shareDiagnostics')}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={settings.shareDiagnostics ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={styles.settingRow}>
          <View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Engine Temperature</Text>
            <Text style={[styles.settingDescription, { color: colors.icon }]}>Engine thermal data</Text>
          </View>
          <Switch
            value={settings.shareEngineTemp}
            onValueChange={() => toggleSetting('shareEngineTemp')}
            trackColor={{ false: '#767577', true: colors.success }}
            thumbColor={settings.shareEngineTemp ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Frequency</Text>
        
        <View style={styles.frequencyContainer}>
          <TouchableOpacity 
            style={[
              styles.frequencyButton, 
              { backgroundColor: settings.dataFrequency === 'low' ? colors.tint + '20' : 'transparent' },
              { borderColor: settings.dataFrequency === 'low' ? colors.tint : colors.border }
            ]}
            onPress={() => setDataFrequency('low')}
          >
            <Text style={[
              styles.frequencyText, 
              { color: settings.dataFrequency === 'low' ? colors.tint : colors.text }
            ]}>Low</Text>
            <Text style={[styles.frequencySubtext, { color: colors.icon }]}>Every 5 min</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.frequencyButton, 
              { backgroundColor: settings.dataFrequency === 'medium' ? colors.tint + '20' : 'transparent' },
              { borderColor: settings.dataFrequency === 'medium' ? colors.tint : colors.border }
            ]}
            onPress={() => setDataFrequency('medium')}
          >
            <Text style={[
              styles.frequencyText, 
              { color: settings.dataFrequency === 'medium' ? colors.tint : colors.text }
            ]}>Medium</Text>
            <Text style={[styles.frequencySubtext, { color: colors.icon }]}>Every 1 min</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.frequencyButton, 
              { backgroundColor: settings.dataFrequency === 'high' ? colors.tint + '20' : 'transparent' },
              { borderColor: settings.dataFrequency === 'high' ? colors.tint : colors.border }
            ]}
            onPress={() => setDataFrequency('high')}
          >
            <Text style={[
              styles.frequencyText, 
              { color: settings.dataFrequency === 'high' ? colors.tint : colors.text }
            ]}>High</Text>
            <Text style={[styles.frequencySubtext, { color: colors.icon }]}>Every 10 sec</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.frequencyNote, { color: colors.icon }]}>
          Higher frequency provides more accurate data but uses more battery and data.
        </Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.error + '15', borderColor: colors.error }]}
          onPress={() => {
            Alert.alert(
              'Reset Earnings',
              'Are you sure you want to reset your earnings? This cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: resetEarnings }
              ]
            );
          }}
        >
          <Text style={[styles.actionButtonText, { color: colors.error }]}>Reset Earnings</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal</Text>
        
        <TouchableOpacity 
          style={[styles.legalButton, { borderBottomColor: colors.border }]} 
          onPress={showPrivacyPolicy}
        >
          <Text style={[styles.legalButtonText, { color: colors.text }]}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.legalButton} 
          onPress={showTerms}
        >
          <Text style={[styles.legalButtonText, { color: colors.text }]}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: colors.icon }]}>RoadShare v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  frequencyButton: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  frequencySubtext: {
    fontSize: 12,
  },
  frequencyNote: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  legalButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  legalButtonText: {
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
  },
});
