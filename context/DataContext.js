import React, { createContext, useState, useEffect } from 'react';
import obdData from '../assets/synthetic_obd_data_24h.json';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState(null);
  const [dataIndex, setDataIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [diagnosticCodes, setDiagnosticCodes] = useState([]);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isSharing) return;

    const interval = setInterval(() => {
      // Cycle through the data to simulate real-time updates
      const nextIndex = (dataIndex + 1) % obdData.length;
      setDataIndex(nextIndex);
      setCurrentData(obdData[nextIndex]);

      // Add to earnings if sharing is enabled
      const newEarning = calculateEarning(obdData[nextIndex]);
      setEarnings(prev => prev + newEarning);

      // Track earnings history
      const timestamp = new Date().toISOString();
      setEarningsHistory(prev => [...prev, { timestamp, amount: newEarning }]);

      // Track diagnostic codes
      if (obdData[nextIndex].dtc_code && !diagnosticCodes.includes(obdData[nextIndex].dtc_code)) {
        setDiagnosticCodes(prev => [...prev, obdData[nextIndex].dtc_code]);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [dataIndex, isSharing]);

  // Calculate earnings based on data shared
  // More valuable data = higher earnings
  const calculateEarning = (data) => {
    // Base rate
    let rate = 0.001;

    // Bonus for higher speeds (more data generated)
    if (data.speed_kmph > 60) rate += 0.0005;

    // Bonus for diagnostic codes (valuable for manufacturers)
    if (data.dtc_code) rate += 0.002;

    // Bonus for extreme engine temps (valuable for research)
    if (data.engine_temp_c > 100 || data.engine_temp_c < 50) rate += 0.001;

    // Random factor to simulate market fluctuations
    rate += (Math.random() * 0.0005);

    return parseFloat(rate.toFixed(4));
  };

  // Toggle data sharing
  const toggleDataSharing = () => {
    setIsSharing(!isSharing);
    if (!isSharing && !currentData) {
      // Initialize with first data point
      setCurrentData(obdData[0]);
    }
  };

  // Reset earnings
  const resetEarnings = () => {
    setEarnings(0);
    setEarningsHistory([]);
  };

  return (
    <DataContext.Provider
      value={{
        currentData,
        isSharing,
        toggleDataSharing,
        earnings,
        resetEarnings,
        earningsHistory,
        diagnosticCodes,
        allData: obdData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
