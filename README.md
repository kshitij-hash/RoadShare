# RoadShare: Car-as-a-Node Explorer 🚗💰

## Overview

RoadShare is a mobile application that demonstrates the potential of decentralized physical infrastructure networks (DePIN) for vehicle data. The app allows users to visualize what their car is emitting in real-time—including speed, GPS location, fuel levels, and diagnostic information—while simulating potential earnings for sharing this valuable data.

Built for the DeCharge Network's DePIN for Car Data hackathon challenge, RoadShare aims to create a transparent ecosystem where vehicle owners can monetize their car's data while maintaining control over what is shared.

## Quick Demo
[demo video.webm](https://github.com/user-attachments/assets/8f2d8a3b-745c-45b3-9ed7-006da035eb98)

## Problem Statement

Vehicles generate massive amounts of valuable data that currently benefits only manufacturers and service providers. RoadShare addresses this imbalance by:

1. Giving car owners visibility into the data their vehicles generate
2. Providing a simulation of how this data could be monetized
3. Creating a framework for secure, permissioned data sharing
4. Building a foundation for a decentralized vehicle data marketplace

## Features

- **Real-time Data Visualization**: View your vehicle's speed, RPM, fuel level, engine temperature, and other metrics in real-time
- **Earnings Simulation**: See potential earnings from sharing different types of vehicle data
- **Location Tracking**: Visualize your routes and location data on an interactive map
- **Diagnostic Information**: View and understand diagnostic trouble codes from your vehicle
- **Data Sharing Controls**: Choose what data to share and when to share it
- **Earnings Dashboard**: Track simulated earnings with detailed breakdowns and projections

## Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation
- **Data Visualization**: React Native Chart Kit
- **Maps**: React Native Maps
- **Blockchain Integration**: Para Wallet for potential token transactions
- **Location Services**: Expo Location

## Project Structure

- `/app`: Core application components and navigation
- `/assets`: Images, icons, and other static assets
- `/components`: Reusable UI components
- `/constants`: Application constants and configuration
- `/context`: React context providers for state management
- `/hooks`: Custom React hooks
- `/screens`: Main application screens
- `/utils`: Utility functions and helpers

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. Clone the repository

```bash
git clone https://github.com/kshitij-hash/RoadShare.git
cd RoadShare
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start
```

4. Run on a device or emulator
   - Press `a` for Android
   - Press `i` for iOS

## How It Works

1. **Connect**: The app simulates connecting to your vehicle's OBD-II port (in a real implementation, this would use Bluetooth or Wi-Fi)
2. **Visualize**: See your vehicle's data displayed in real-time on the dashboard
3. **Share**: Toggle data sharing on/off to simulate sharing vehicle data with the network
4. **Earn**: Watch as simulated earnings accumulate based on the value of the data shared

## Data Monetization Model

RoadShare implements a simulated monetization model where different types of vehicle data have varying values:

- **Base Rate**: $0.001 per data point
- **Speed Bonus**: +$0.0005 for speeds over 60km/h
- **Diagnostic Bonus**: +$0.002 for diagnostic trouble codes
- **Temperature Bonus**: +$0.001 for extreme engine temperatures
- **Market Fluctuation**: ±$0.0005 random market variation

In a production environment, this would connect to a blockchain network for actual token rewards.

## Future Development

- Integration with actual OBD-II hardware for real vehicle data
- Blockchain implementation for secure, verifiable data transactions
- Marketplace for data consumers to bid on specific types of vehicle data
- Advanced privacy controls and data anonymization options
- Community features for comparing earnings and optimizing data sharing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DeCharge Network for hosting the DePIN for Car Data hackathon
- Superteam for the hackathon platform
- The Solana ecosystem for enabling decentralized applications
