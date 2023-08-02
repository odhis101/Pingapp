import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-plx';

const BluetoothTest = () => {
  const [discoveredDevices, setDiscoveredDevices] = useState([]);

  useEffect(() => {
    const bleManager = new BleManager();

    const startScanning = async () => {
      try {
        await bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Error scanning for devices:', error);
            return;
          }

          setDiscoveredDevices(prevDevices => {
            // Check if the device is already in the list
            const existingDevice = prevDevices.find(prevDevice => prevDevice.id === device.id);

            // If the device is not in the list, add it
            if (!existingDevice) {
              return [...prevDevices, device];
            }

            // Otherwise, update the device in the list with the new data
            return prevDevices.map(prevDevice => {
              if (prevDevice.id === device.id) {
                return device;
              }
              return prevDevice;
            });
          });
        });
        console.log('Scanning for Bluetooth devices...');
      } catch (error) {
        console.log('Error starting Bluetooth scan:', error);
      }
    };

    startScanning();

    return () => {
      bleManager.stopDeviceScan();
      console.log('Stopped scanning for Bluetooth devices.');
    };
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Discovered Devices:</Text>
      {discoveredDevices.length > 0 ? (
        discoveredDevices.map(device => (
          <Text key={device.id}>{device.name || 'Unknown Device'}</Text>
        ))
      ) : (
        <Text>No devices available</Text>
      )}
    </View>
  );
};

export default BluetoothTest;
