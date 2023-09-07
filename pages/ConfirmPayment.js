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
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import getEnvVars from "../.env.js"

const ConfirmPayment = () => {
  const [imageHeight, setImageHeight] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const selectedContacts = route.params?.selectedContacts || ""; // Use optional chaining and provide a default value
  const deposit = route.params?.deposit || false;
  const balance = parseInt(route.params.balance) || 0; // Convert balance to an integer, use 0 if NaN
  // lets use a useffect to check for balance 
const { API_URL } = getEnvVars();

console.log()
console.log(selectedContacts[0].email)

const sendCash = async () => {
  const apiUrl =`${API_URL}/api/v1/transaction/send_money`

  const data = {
    receiver: selectedContacts[0].email, // Replace with your actual global variable
    currency: "Euro", // Replace with your actual global variable
    amount: balance,     // Replace with your actual global variable
  };

  try {
    const response = await axios.post(apiUrl, data);
    console.log("THIS IS RESSSSPOSNE", response)
    

    // Handle the response here (e.g., show a success message)
    console.log('Response:', response.data.message);
    if (response.status === 200) {
      navigation.navigate("Success",isSuccess=true)
      console.log("success")
    }
    else{
      navigation.navigate("Success",isSuccess=false) 
      console.log("success")
     
    }
  } catch (error) {
    // Handle errors here (e.g., show an error message)
    console.error('Error:', error);
    navigation.navigate("Success",isSuccess=false) 

  }
};

// Usage example:



  useEffect(() => {
  console.log("this the balance", selectedContacts)
  }, [selectedContacts]);
 
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
        <Text style={styles.amountText}> £ {balance} </Text>
        <Text style={styles.whiteText}> to </Text>

        <View style={styles.nameContainer}>
          <Image source={Profile} style={styles.profileImage} />
          
          <FlatList
  data={selectedContacts}
  keyExtractor={(contact) => contact.name}
  renderItem={({ item: contact }) => (
    <View style={styles.contactItem}>
      <Text style={styles.nameText}> {contact.firstName} {contact.lastName} </Text>

      {/* Add more text components for other properties */}
    </View>
  )}
/>
        </View>
        <View style={styles.phoneInputContainer}>
          <TextInput style={styles.input} placeholder="for lunch"  />
        </View>
        <TouchableOpacity 
        style={styles.sendButton}
        onPress={sendCash}
        >
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
