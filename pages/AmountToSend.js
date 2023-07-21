import React, { useEffect, useState } from "react";
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Topnav from '../components/Topnav/Topnav';
import SendMoney from '../components/SendMoney/SendMoney';
import Mycards from '../components/Mycards/Mycards';
import Profile from '../assets/profile.png'
import RecentTransactions from '../components/RecentTransactions/RecentTransactions';
import TransactionsRadio from '../components/TransactionsRadio/TransactionsRadio';
import { AntDesign } from '@expo/vector-icons';
import PinInput from '../components/PinInput/PinInput';
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

const AmountToSend = (maxDigits) => {
    const [imageHeight, setImageHeight] = useState(0);
    const [balance, setBalance] = useState('');

    // Calculate the imageHeight dynamically once the component is mounted
    useEffect(() => {
      const window = Dimensions.get("window");
      setImageHeight(window.height);
    }, []);
    console.log(imageHeight);
    const [pin, setPin] = useState("");
  
    const handlePinChange = (num) => {
        // Update the balance state with the new value
        setBalance((prevBalance) => prevBalance + num);
      };
    const handleClearPin = () => {
      setPin("");
    };
    const handleBackspace = () => {
        if (balance.length > 0) {
          // Remove the last character from the balance state
          setBalance((prevBalance) => prevBalance.slice(0, -1));
        }
    };
    const formatBalance = (balance) => {
        // Convert balance to a string
        const balanceStr = balance.toString();
        
        // Add commas when it passes three digits
        if (balanceStr.length > 3) {
          return balanceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    
        return balanceStr;
      };
    return (
     
       <ImageBackground
          source={BackgroundImage}
          style={{ ...styles.backgroundImage, height: imageHeight }}
        >
            <Topnav />

<View style={styles.infoContainer}>
            <Image source={Profile} style={styles.image} />
            <Text style={styles.name}>Dan Bilzerian</Text>
            <View style={styles.currentBalance}>
              <Text style={styles.currency}>£</Text>
              <Text style={styles.balance}>{formatBalance(balance)}</Text>
            </View>
            <Text style={styles.recentTransactions}> GBP </Text>
          </View>
          <View style={styles.moneyButtons}>
          <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("1")}
        >
          <Text style={styles.pinText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("2")}
        >
          <Text style={styles.pinText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("3")}
        >
          <Text style={styles.pinText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("4")}
        >
          <Text style={styles.pinText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("5")}
        >
          <Text style={styles.pinText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("6")}
        >
          <Text style={styles.pinText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("7")}
        >
          <Text style={styles.pinText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("8")}
        >
          <Text style={styles.pinText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("9")}
        >
          <Text style={styles.pinText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        {/* ... (Number key 0) ... */}
        <TouchableOpacity style={styles.pinButton} onPress={() => handlePinChange("0")}>
          <Text style={styles.pinText}>0</Text>
        </TouchableOpacity>

        {/* Backspace button */}
        <TouchableOpacity style={styles.pinButton} onPress={handleBackspace}>
          <Text style={styles.pinText}>⌫</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.buttonContainer}>

        <LinearGradient
          colors={["#5087D3", "#2AA5D6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <FontAwesome5 name="credit-card" size={24} color="white" style={styles.icon} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={["#4CB8C4", "#5BC7A5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <FontAwesome5 name="credit-card" size={24} color="white" style={styles.icon} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>

            </View>


        </ImageBackground>
        
        
        
        
        )
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        borderWidth: 1,

        },
        infoContainer: {
            alignItems: "center",
            paddingBottom: 24,
            marginTop: 'auto',
            marginBottom: 'auto',
            height:'30%',
          },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 16,
          },
          name: {
            fontSize: 14,
            color: "#FFFFFF",
            marginBottom: 16,
          },
          currentBalance: {
            flexDirection: "row",
            alignItems: "center",
          },
          currency: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginRight: 8,
          },
          balance: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#FFFFFF",
          },
          recentTransactions: {
            fontSize: 14,
            color: "#FFFFFF",
            marginTop: 8,
          },
          moneyButtons:{
  
            height: 430,
            marginLeft: '5%',
            marginRight: '5%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "white",
            
          },
          container: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          },
          rowContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          },
          pinButton: {
            marginLeft: "5%",
            marginRight: "5%",
            width: 70,
            height: 70,
            borderRadius: 30,
            backgroundColor: "white",
            marginHorizontal: "2.5%",
            justifyContent: "center",
            alignItems: "center",
            // Add shadow properties
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 5, // This is for Android shadow
          },
          dotsContainer: {
            flexDirection: "row",
            marginTop: 10,
            marginBottom: "10%",
          },
          pinText: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#3D9195",
          },
          dot: {
            width: 40,
            height: 40,
            borderRadius: 40,
            marginHorizontal: 2,
          },
          dotEmpty: {
            backgroundColor: "#FFFFFF",
            marginLeft: "5%",
          },
          dotFilled: {
            marginLeft: "5%",
            backgroundColor: "#000000",
          },
          buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            marginBottom: 30,
           
          },
          gradientButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            paddingVertical: 12,
            paddingHorizontal: 20,
            marginVertical: 10,
            width: "48%",
            height: 50,
            overflow: "hidden",
          },
          icon: {
            marginRight: 10,
          },
          button: {
            flex: 1,
            alignItems: "center",
          },
          buttonText: {
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
          },

})

export default AmountToSend;