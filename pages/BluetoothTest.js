import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
// import expo camera
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-camera';
import { TouchableOpacity } from 'react-native';

const BluetoothScanner = () => {
  
  const [devices, setDevices] = useState([]);
  const bleManager = new BleManager();
  // CHECK API LEVEL 
//const api_level = Platform.Version;
const api_level = Platform.Version;
console.log(api_level);




const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
        }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
 if (bluetoothScanPermission === "never_ask_again"){
        Alert.alert(
            "Bluetooth Scan needed Permission",
            "Bluetooth Low Energy requires Connection Permission",

            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Open Settings", onPress: () => Linking.openSettings() }
            ]
        );
    }
    else if (bluetoothConnectPermission === "never_ask_again"){
        Alert.alert(
            "bluetooth Connect Permission Permission",
            "Bluetooth Low Energy requires Connection Permission",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Open Settings", onPress: () => Linking.openSettings() }
            ]
        );
    }
    return (
      bluetoothScanPermission === "never_ask_again" &&
      bluetoothConnectPermission === "never_ask_again" &&
      fineLocationPermission === "granted"&&
      cameraPermission === "granted"
    );
  };
  
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if (api_level < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        console.log('Requesting Android 31 permissions')
        const permissions = await requestAndroid31Permissions();
        console.log(permissions)
        
        const isAllPermissionsGranted = Object.values(permissions).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        console.log(isAllPermissionsGranted)
        
        return isAllPermissionsGranted;
      }
    } else {
      return true;
    }
  };
  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      const granted = await requestPermissions();
      if (granted) {
        console.log('Permissions granted');
        // Start Bluetooth scanning or perform other actions here
        startBluetoothScanning();

      } else {
        console.log('Permissions denied');
        // Handle the case where permissions are denied
      }
    };

    checkAndRequestPermissions();
  }, []); 
  const startBluetoothScanning = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {

        if (error) {
        console.log('Error scanning devices', error);
        return;
      }

      if (device && device.name) {
        setDevices((devices) => {
            console.log('Found device', device.id, device.name);
    
            if (!devices.some((d) => d.id === device.id)) {
                return [...devices, device];
            }
    
            return devices;
        });
    }
    
    });
  };
  const connectToDevice = async (device) => {
    console.log('Connecting to device', device.id, device.name);
  
    try {
      // Connect to the device
      const connectedDevice = await bleManager.connectToDevice(device.id);
  
      // Perform actions on the connected device
      // For example, you might discover services and characteristics
      // and interact with them using the connectedDevice instance.
  
      console.log('Connected to device', connectedDevice.id);
    } catch (error) {
      console.error('Error connecting to device', error);
    }
  };



  return (
    <View>
        <Text style={{marginTop:200,}}>Availablse Bluetooth Devices:</Text>
        <FlatList
  data={devices}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => connectToDevice(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )}
/>      
    </View>
  );
};

export default BluetoothScanner;
