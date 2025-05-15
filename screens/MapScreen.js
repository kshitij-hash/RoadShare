import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { DataContext } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function MapScreen() {
  const { currentData, isSharing, allData } = useContext(DataContext);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'dark'];

  
  // Update route coordinates when current data changes
  useEffect(() => {
    if (currentData && isSharing) {
      // Add current position to route
      const newCoordinate = {
        latitude: currentData.lat,
        longitude: currentData.lon,
      };
      
      setRouteCoordinates(prev => {
        // Limit the number of points to prevent performance issues
        const updatedRoute = [...prev, newCoordinate];
        if (updatedRoute.length > 100) {
          return updatedRoute.slice(-100);
        }
        return updatedRoute;
      });
    }
  }, [currentData]);

  // If not sharing data, show a message
  if (!isSharing || !currentData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.noDataText, { color: colors.text }]}>Start sharing data to view your location</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentData.lat,
          longitude: currentData.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: currentData.lat,
          longitude: currentData.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
      >
        {/* Current position marker */}
        <Marker
          coordinate={{
            latitude: currentData.lat,
            longitude: currentData.lon,
          }}
          title="Your Vehicle"
          description={`Speed: ${currentData.speed_kmph.toFixed(1)} km/h`}
        />
        
        {/* Route line */}
        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4CAF50"
            strokeWidth={3}
          />
        )}
      </MapView>
      
      <View style={[styles.infoOverlay, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Location Data</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>Latitude: {currentData.lat.toFixed(6)}</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>Longitude: {currentData.lon.toFixed(6)}</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>Speed: {currentData.speed_kmph.toFixed(1)} km/h</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>Last Updated: {new Date().toLocaleTimeString()}</Text>
      </View>
      
      <View style={[styles.sharingIndicator, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <View style={[styles.indicatorDot, { backgroundColor: colors.success }]} />
        <Text style={[styles.indicatorText, { color: colors.text }]}>Sharing Location Data</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#212121',
  },
  infoOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    maxWidth: Dimensions.get('window').width * 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212121',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#424242',
  },
  sharingIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  indicatorText: {
    fontSize: 14,
    color: '#212121',
  },
});

// Custom map style for dark mode
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
