import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button,ImageBackground,StyleSheet, } from 'react-native';
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
import { LottieView } from 'lottie-react-native';
import Loading from '../assets/LottieView/Loading.json';
import BackgroundImage from "../assets/background.png";
import Icon from 'react-native-vector-icons/Ionicons'; // Import your preferred icon set
import Topnav from '../components/Topnav/Topnav';
import Blemanager from 'react-native-ble-manager';

const BluetoothScanner = () => {
  
  const [devices, setDevices] = useState([]);
  const [getDiscoveredPeripherals, setDiscoveredPeripherals] = useState([]);
  //const bleManager = new BleManager();
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
    // ask for advertise permission 
    const bluetoothAdvertisePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      {
        title: "need advertise Permission",
        message: "Bluetooth Low Energy requires advertise",
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
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"&&
      cameraPermission === "granted" && 
      bluetoothAdvertisePermission === "granted"
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

      if (device) {
        setDevices((devices) => {
            console.log('Found device', device.id, device.name, device.advertising);
    
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
      // try and send and recieve data 
      
      // Perform actions on the connected device
      // For example, you might discover services and characteristics
      // and interact with them using the connectedDevice instance.
  
      console.log('Connected to device', connectedDevice.id);
    } catch (error) {
      console.error('Error connecting to device', error);
    }
  };
  Blemanager.start({ showAlert: false }).then(() => {
    // Success code
    console.log("Module initialized");
  });

  Blemanager.enableBluetooth()
    .then(() => {
      // Success code
      console.log("The bluetooth is already enabled or the user confirm");
    })
    .catch((error) => {
      // Failure code
      console.log("The user refuse to enable bluetooth");
    });
  // get rrssi
  Blemanager.getConnectedPeripherals([]).then((results) => {
    console.log('this is connected peripherals ',results);
  });

  useEffect(() => {
  Blemanager.getDiscoveredPeripherals([]).then((results) => {
    
    console.log('THIS IS DISCOVERED PERIPHERALS ',results);
    //useffect to set discovered peripherals
    //setDiscoveredPeripherals(results);
  
      });
    }, []);
  Blemanager.scan([], 10, true).then((devices) => {
    console.log('checking devices found ');
    console.log(devices);
  
  });
  console.log('this is discovered peripherals ',getDiscoveredPeripherals);



  return (
    <ImageBackground
    source={BackgroundImage}
    style={styles.backgroundImage}
    >
      <Topnav/>
  
      <Text style={styles.header}>Available Bluetooth Devices:</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => connectToDevice(item)} style={styles.itemContainer}>
            <Icon name="bluetooth" size={30} color="blue" style={styles.icon} /> 
            <Text style={styles.deviceName}>{item.name || 'Unkown device'}</Text> 
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.loadingText}>Searching...</Text>} 
      />

    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
    header: {
    marginTop: 200,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'black', // Add your desired border color
  },
  icon: {
    marginRight: 10,
  },
  deviceName: {
    fontSize: 16,
  },
  loadingText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16,
  },

});
export default BluetoothScanner;
