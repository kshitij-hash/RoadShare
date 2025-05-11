import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DataContext } from '../context/DataContext';

// Component for displaying a single metric
const MetricCard = ({ title, value, unit, icon }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricIcon}>{icon}</Text>
      </View>
      <Text style={styles.metricValue}>{value} <Text style={styles.metricUnit}>{unit}</Text></Text>
    </View>
  );
};

// Component for displaying diagnostic trouble codes
const DiagnosticCard = ({ code }) => {
  // Map of common OBD-II codes and their meanings
  const codeDescriptions = {
    'P0171': 'Fuel System Too Lean (Bank 1)',
    'P0300': 'Random/Multiple Cylinder Misfire Detected',
    'P0420': 'Catalyst System Efficiency Below Threshold',
    'P0455': 'Evaporative Emission System Leak Detected',
    'P0401': 'Exhaust Gas Recirculation Flow Insufficient',
    // Add more codes as needed
  };

  const description = codeDescriptions[code] || 'Unknown Issue';
  const severity = code.startsWith('P0') ? 'Medium' : 'High';

  return (
    <View style={styles.diagnosticCard}>
      <View style={styles.diagnosticHeader}>
        <Text style={styles.diagnosticCode}>{code}</Text>
        <View style={[styles.severityIndicator, 
          { backgroundColor: severity === 'High' ? '#F44336' : '#FFC107' }]} />
      </View>
      <Text style={styles.diagnosticDescription}>{description}</Text>
      <Text style={styles.diagnosticSeverity}>Severity: {severity}</Text>
    </View>
  );
};

export default function DashboardScreen() {
  const { currentData, isSharing, diagnosticCodes, allData } = useContext(DataContext);
  const [speedHistory, setSpeedHistory] = useState([0, 0, 0, 0, 0, 0]);
  const [rpmHistory, setRpmHistory] = useState([0, 0, 0, 0, 0, 0]);

  // Update chart data when current data changes
  useEffect(() => {
    if (currentData) {
      setSpeedHistory(prev => [...prev.slice(1), currentData.speed_kmph]);
      setRpmHistory(prev => [...prev.slice(1), currentData.engine_rpm / 100]); // Scale down RPM for chart
    }
  }, [currentData]);

  // If not sharing data, show a message
  if (!isSharing || !currentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Start sharing data to view your dashboard</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Live Performance</Text>
        <LineChart
          data={{
            labels: ['', '', '', '', '', ''],
            datasets: [
              {
                data: speedHistory,
                color: (opacity = 1) => `rgba(65, 131, 215, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: rpmHistory,
                color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ['Speed', 'RPM/100']
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#2A2A2A',
            backgroundGradientFrom: '#2A2A2A',
            backgroundGradientTo: '#2A2A2A',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View style={styles.metricsContainer}>
        <MetricCard 
          title="Speed" 
          value={currentData.speed_kmph.toFixed(1)} 
          unit="km/h"
          icon="🚗"
        />
        <MetricCard 
          title="Engine RPM" 
          value={currentData.engine_rpm.toFixed(0)} 
          unit="rpm"
          icon="⚙️"
        />
        <MetricCard 
          title="Fuel Level" 
          value={currentData.fuel_level_pct.toFixed(1)} 
          unit="%"
          icon="⛽"
        />
        <MetricCard 
          title="Engine Temp" 
          value={currentData.engine_temp_c.toFixed(1)} 
          unit="°C"
          icon="🌡️"
        />
      </View>

      {diagnosticCodes.length > 0 && (
        <View style={styles.diagnosticsContainer}>
          <Text style={styles.sectionTitle}>Diagnostic Codes</Text>
          {diagnosticCodes.map((code, index) => (
            <DiagnosticCard key={index} code={code} />
          ))}
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Vehicle Information</Text>
        <Text style={styles.infoText}>Vehicle ID: {currentData.vehicle_id}</Text>
        <Text style={styles.infoText}>Last Updated: {new Date(currentData.timestamp).toLocaleTimeString()}</Text>
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
  noDataText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  chartContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricTitle: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  metricIcon: {
    fontSize: 20,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricUnit: {
    color: '#BBBBBB',
    fontSize: 14,
    fontWeight: 'normal',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  diagnosticsContainer: {
    marginBottom: 20,
  },
  diagnosticCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  diagnosticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosticCode: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  diagnosticDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  diagnosticSeverity: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    color: '#BBBBBB',
    fontSize: 14,
    marginBottom: 8,
  },
});
