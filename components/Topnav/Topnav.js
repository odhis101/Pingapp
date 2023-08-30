import React from "react";
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

const Topnav = () => {
  const navigation = useNavigation();
  const bleManager = new BleManager();

  const handlePress = () => {
    navigation.navigate("messages");
  }
  const authState = useSelector((state) => state.auth);
  console.log("this is the authstate", authState);
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
  const deviceUuid = generateUuid();
const serviceUuid = generateUuid();
const characteristicUuid = generateUuid()
const manufacturerData = [1, 2, 3, 4, 5]; // Example manufacturer data
const companyId = 0x004C;
const companyIdDouble = Number(companyId); // Convert to Double
// Define broadcast options (optional)
const broadcastOptions = {
  txPowerLevel: 2,
  advertiseMode: 1,
  includeDeviceName: true,
  includeTxPowerLevel: true,
  connectable: true,
};
// Broadcast the data
console.log(typeof companyIdDouble); //
BLEAdvertiser.setCompanyId(76); // Replace with your company's code
BLEAdvertiser.broadcast(serviceUuid, manufacturerData, broadcastOptions)
  .then(success => {
    console.log('Broadcasting successful', success);
  })
  .catch(error => {
    console.log('Broadcasting error', error);
  });
// need company id to be a number
console.log(serviceUuid, manufacturerData, {})

/*
BleAdvertiser.broadcast([serviceUuid], [manufacturerData], {})
  .then(success => console.log('Broadcasting Successful', success))
  .catch(error => console.log('Broadcasting Error', error));
*/
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
