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

const Topnav = () => {
  const navigation = useNavigation();
  const bleManager = new BleManager();
  const [hasPermission, setHasPermission] = useState(false);

  const handlePress = () => {
    navigation.navigate("messages");
  }
  const authState = useSelector((state) => state.auth);
  function generateUuid() {
    let uuid = '';
    const characters = 'abcdef0123456789';
  
    // Generate a string of 32 hexadecimal characters
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters[randomIndex];
    }
  
    // Insert dashes at specific positions to create a UUID format
    uuid =
      uuid.substr(0, 8) +
      '-' +
      uuid.substr(8, 4) +
      '-' +
      uuid.substr(12, 4) +
      '-' +
      uuid.substr(16, 4) +
      '-' +
      uuid.substr(20);
  
    return uuid;
  }

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



  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.topnav}>
          <View style={styles.topnavLeft}>
            <Image source={Logo} style={styles.image} />
          </View>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="ios-create" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: "40%",
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
    // backgroundColor:'red',
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topnavRight: {},
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
export default Topnav;
