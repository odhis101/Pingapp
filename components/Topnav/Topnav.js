import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "../../assets/background.png";
import Logo from "../../assets/logo.png";
import { LinearGradient } from "expo-linear-gradient";
//import Icon from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/Ionicons'; // Import the appropriate icon set
import { useNavigation } from "@react-navigation/native";
import { BleManager, Characteristic, Service } from 'react-native-ble-plx';
import { useDispatch, useSelector } from "react-redux";
import BLEAdvertiser from 'react-native-ble-advertiser'
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
import getEnvVars from "../../.env.js"

const Topnav = () => {
  const navigation = useNavigation();
  // const bleManager = new BleManager();
  const [hasPermission, setHasPermission] = useState(false);
  const { API_URL } = getEnvVars();


  const handlePress = () => {
    navigation.navigate("messages");
  }
  const handleLogout = () => {
    // Make a GET request to the logout URL
    axios.get(`${API_URL}/api/v1/auth/logout`)
      .then((response) => {
        console.log(response.data.status)
        navigation.navigate("Login")
        // Handle the response as needed (e.g., clearing user data)

        // Navigate the user to the login screen
      })
      .catch((error) => {
        console.error('Logout request failed:', error);
      });
  };
  const authState = useSelector((state) => state.auth);
  

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothAdvertisePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
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
    else if (bluetoothAdvertisePermission === "never_ask_again"){
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
        console.log('Permissions granted from top nave');
        // Start Bluetooth scanning or perform other actions here
      } else {
        console.log('Permissions denied from top nav');
        // Handle the case where permissions are denied
      }
    };

    checkAndRequestPermissions();
  }, []); 
  const handleConnectPress = ()=>{
    navigation.navigate("BluetoothScanner")

  }



  return (
    <View className='flex flex-row items-center m-4'>
    <View style={styles.backgroundImage}>
      <View style={styles.topnav}>
        <View style={styles.topnavLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={Logo} className='w-[28px] h-[28px] m-2' />
          </TouchableOpacity>
        </View>
        <View className='flex flex-row items-center'>
          <TouchableOpacity className='bg-white px-3 py-2 shadow-md flex items-center justify-center rounded-full ' onPress={handleConnectPress}>
            <Icon name="person-add" size={20} color="#B1843D"  className='text-center ' />
          </TouchableOpacity>
          <TouchableOpacity className='bg-white px-3 py-2 shadow-md mx-2 flex items-center justify-center rounded-full ' onPress={handlePress}>
            <Icon name="ios-create" size={20} color="#B1843D"  className='text-center ' />
          </TouchableOpacity>
          {/* Logout button */}
          <TouchableOpacity className='bg-white px-3 py-2 shadow-md flex items-center justify-center rounded-full ' onPress={handleLogout}>
            <Icon name="log-out" size={20} color="#B1843D"  className='text-center ' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
  container: {
    height: "5%",
    marginBottom: "14%",
  },
  topnav: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topnavLeft: {
    width: '40%', // Adjust the width as needed
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Adjust the spacing between icons as needed
  },
});

export default Topnav;
