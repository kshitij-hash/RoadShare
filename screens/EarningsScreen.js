import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DataContext } from '../context/DataContext';

export default function EarningsScreen() {
  const { earnings, earningsHistory, resetEarnings, isSharing } = useContext(DataContext);
  const [timeframe, setTimeframe] = useState('hour'); // 'hour', 'day', 'week'

  // Prepare chart data based on earnings history
  const getChartData = () => {
    if (earningsHistory.length === 0) {
      return {
        labels: ['0m', '10m', '20m', '30m', '40m', '50m', '60m'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
      };
    }

    // For simplicity, we'll just show the last 7 data points
    const dataPoints = earningsHistory.slice(-7);
    const values = dataPoints.map(point => point.amount);
    
    // Generate labels based on timeframe
    let labels = [];
    if (timeframe === 'hour') {
      labels = ['0m', '10m', '20m', '30m', '40m', '50m', '60m'];
    } else if (timeframe === 'day') {
      labels = ['0h', '4h', '8h', '12h', '16h', '20h', '24h'];
    } else {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }

    return {
      labels,
      datasets: [{ data: values }]
    };
  };

  // Calculate estimated earnings
  const getEstimatedEarnings = () => {
    const hourly = earnings * (60 / Math.max(1, earningsHistory.length));
    
    return {
      hourly: hourly.toFixed(3),
      daily: (hourly * 24).toFixed(2),
      monthly: (hourly * 24 * 30).toFixed(2)
    };
  };

  const estimated = getEstimatedEarnings();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Total Earnings</Text>
        <Text style={styles.earningsAmount}>${earnings.toFixed(3)}</Text>
        <Text style={styles.earningsSubtext}>
          {isSharing ? 'Currently earning' : 'Start sharing to earn'}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.timeframeSelector}>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'hour' && styles.activeTimeframe]}
            onPress={() => setTimeframe('hour')}
          >
            <Text style={[styles.timeframeText, timeframe === 'hour' && styles.activeTimeframeText]}>Hour</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'day' && styles.activeTimeframe]}
            onPress={() => setTimeframe('day')}
          >
            <Text style={[styles.timeframeText, timeframe === 'day' && styles.activeTimeframeText]}>Day</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'week' && styles.activeTimeframe]}
            onPress={() => setTimeframe('week')}
          >
            <Text style={[styles.timeframeText, timeframe === 'week' && styles.activeTimeframeText]}>Week</Text>
          </TouchableOpacity>
        </View>

        <LineChart
          data={getChartData()}
          width={Dimensions.get('window').width - 60}
          height={220}
          chartConfig={{
            backgroundColor: '#2A2A2A',
            backgroundGradientFrom: '#2A2A2A',
            backgroundGradientTo: '#2A2A2A',
            decimalPlaces: 3,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#4CAF50'
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      <View style={styles.estimatesContainer}>
        <Text style={styles.sectionTitle}>Estimated Earnings</Text>
        <View style={styles.estimateRow}>
          <View style={styles.estimateCard}>
            <Text style={styles.estimateLabel}>Hourly</Text>
            <Text style={styles.estimateValue}>${estimated.hourly}</Text>
          </View>
          <View style={styles.estimateCard}>
            <Text style={styles.estimateLabel}>Daily</Text>
            <Text style={styles.estimateValue}>${estimated.daily}</Text>
          </View>
          <View style={styles.estimateCard}>
            <Text style={styles.estimateLabel}>Monthly</Text>
            <Text style={styles.estimateValue}>${estimated.monthly}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Base Rate</Text>
            <Text style={styles.infoValue}>$0.001 per data point</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Speed Bonus</Text>
            <Text style={styles.infoValue}>+$0.0005 (speeds &gt; 60km/h)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Diagnostic Bonus</Text>
            <Text style={styles.infoValue}>+$0.002 (with DTC codes)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Temperature Bonus</Text>
            <Text style={styles.infoValue}>+$0.001 (extreme temps)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Fluctuation</Text>
            <Text style={styles.infoValue}>±$0.0005 (random)</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetEarnings}>
        <Text style={styles.resetButtonText}>Reset Earnings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: '#BBBBBB',
    fontSize: 16,
    marginBottom: 8,
  },
  earningsAmount: {
    color: '#4CAF50',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  earningsSubtext: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  chartContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeTimeframe: {
    backgroundColor: '#4CAF50',
  },
  timeframeText: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  activeTimeframeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  estimatesContainer: {
    marginBottom: 24,
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  estimateCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  estimateLabel: {
    color: '#BBBBBB',
    fontSize: 14,
    marginBottom: 8,
  },
  estimateValue: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  infoValue: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#F44336',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
