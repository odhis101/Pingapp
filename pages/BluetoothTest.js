import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BleManager from 'react-native-ble-plx';

const BluetoothTest = () => {
  const [discoveredDevices, setDiscoveredDevices] = useState([]);



 
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
