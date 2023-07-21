import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ImageBackground, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import BackgroundImage from "../assets/background.png";
import Topnav from '../components/Topnav/Topnav';
import SendMoney from '../components/SendMoney/SendMoney';
import Mycards from '../components/Mycards/Mycards';
import Profile from '../assets/profile.png';
import RecentTransactions from '../components/RecentTransactions/RecentTransactions';
import TransactionsRadio from '../components/TransactionsRadio/TransactionsRadio';
import { AntDesign } from '@expo/vector-icons';
import PinInput from '../components/PinInput/PinInput';
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

const ConfirmPayment = () => {
  const [imageHeight, setImageHeight] = useState(0);
  const [balance, setBalance] = useState('');
  useEffect(() => {
    const window = Dimensions.get("window");
    setImageHeight(window.height);
  }, []);
  console.log(imageHeight);

  return (
    <ImageBackground
      source={BackgroundImage}
      style={{ ...styles.backgroundImage, height: imageHeight }}
    >
      <View style={styles.container}>
        <Text style={styles.whiteText}> Amount </Text>
        <Text style={styles.amountText}> £ 17,890 </Text>
        <Text style={styles.whiteText}> to </Text>
        <View style={styles.nameContainer}>
          <Image source={Profile} style={styles.profileImage} />
          <Text style={styles.nameText}> John Doe </Text>
        </View>
        <View style={styles.phoneInputContainer}>
          <TextInput style={styles.input} placeholder="for lunch"  />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome5 name="check" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
    marginTop: "50%",
    marginLeft: "10%",
    marginRight: "10%",
    
    

  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',

  },
  whiteText: {
    color: 'white',
    fontSize: 16,
  },
  amountText: {
    color: 'white',
    fontSize: 32,
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
   
  },
  nameText: {
    color: 'white',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#42b72a', // Green background color
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    height: 40,
    width: "100%",
    alignSelf: 'center',
  },
  
  backgroundImage: {
    resizeMode: 'cover',
  },
});

export default ConfirmPayment;
