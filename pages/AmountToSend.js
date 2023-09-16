import React, { useEffect, useState,useRef  } from "react";
import { StyleSheet, Text,ImageBackground, View,Image,Modal,TouchableOpacity,TextInput,FlatList,ScrollView  } from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package
import axios from "axios";
import { useSelector } from "react-redux";
import getEnvVars from "../.env.js"
import {colors} from "../Colors"

const AmountToSend = (maxDigits) => {
    const [imageHeight, setImageHeight] = useState(0);
    const [balance, setBalance] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const phoneNumber = route.params?.phoneNumber || ""; // Use optional chaining and provide a default value
    const email = route.params?.email || ""; // Use optional chaining and provide a default value
    const deposit = route.params?.deposit || false;
    const selectedContacts = route.params?.selectedContacts || [];
    const request = route.params?.request || false; // Use a default value of false if "request" is not provided

    
    const { API_URL } = getEnvVars();


    
    console.log("this is selected contactsssssssss ",selectedContacts)

    const sendMoney = route.params?.sendMoney || false;
    console.log(sendMoney)
    const [selectedCurrency, setSelectedCurrency] = useState("GBP"); // Default currency
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Ref to the triggering element
    const authState = useSelector((state) => state.auth);
    const renderCurrencyOption = ({ item }) => (
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => {
          setSelectedCurrency(item);
          setIsDropdownVisible(false);
        }}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
    console.log(selectedContacts);

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
      const sendCash = async () => {
        // we navigate to the pin screen with the balance 
        navigation.navigate("Dailpass", { balance: balance, selectedContacts: selectedContacts,sendCash: true }); 
      }
      const requestCash = () => {
        // we navigate to the pin screen with the balance
        // navigate to messages and send a message to the selected contact
        console.log("this is selected contact from amt to sendsss ", selectedContacts)
        
        navigation.navigate("Chatmessages", { balance: balance, contact: selectedContacts[0] });
      }

      const depositAmt = async () => {
        try {
          const response = await axios.post(
            `${API_URL}/api/v1/transaction/deposit_money`,
            {
              receiver: authState.email, // Use the email from your Redux state
              currency: selectedCurrency.toLowerCase(),
              amount: balance, // Use the amount from your state
            }
          );
          console.log(response.data);
    
          if (response.data.status == "ok"){
            navigation.navigate("Success");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const currencyOptions = ["GBP", "USD", "EUR"]; // Add more currency options here
      const calculateDropdownPosition = () => {
        if (dropdownRef.current) {
          dropdownRef.current.measureInWindow((x, y, width) => {
            setIsDropdownVisible(true);
          });
        }
      };
      
    
    return (
     
       <View
          style={{ ...styles.backgroundImage, height: "100%" }}
        >
            <Topnav />

<View style={styles.infoContainer}>
{deposit ? (
        <Text  style={styles.DepositText}>Deposit to Your Account</Text>
      ) : (
        <>
 {selectedContacts.length <= 1 ? (
    <Image source={Profile} style={styles.image} />
  ) : null}
<FlatList
  data={selectedContacts}
  keyExtractor={(contact) => contact.id} // Use the 'id' as the key
  renderItem={({ item: contact }) => (
    <View style={styles.contactItem}>
      <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
    </View>
  )}
/>


     
</>
      )}
            <View style={styles.currentBalance}>
            <Text style={styles.currency}>{selectedCurrency}</Text>

              <Text style={styles.balance}>{formatBalance(balance)}</Text>

            </View>
            

    
            <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={styles.recentTransactions}>{selectedCurrency}</Text>
      </TouchableOpacity>
            {isDropdownVisible && (
        <View style={styles.currencyDropdown}>
          <FlatList
            data={currencyOptions}
            renderItem={renderCurrencyOption}
            keyExtractor={(item) => item}
          />
        </View>
      )}

 
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
      {deposit ? (
        <View style={styles.depositButtonContainer}>
          <LinearGradient
            colors={["white", "white"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <FontAwesome5 name="credit-card" size={24} color={colors.textColor} style={styles.icon} />
            <TouchableOpacity
            // here we call the axios endpoint we dont have to navigate 
            onPress={depositAmt} // Pass the props
            style={styles.button}
            >
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ) : (
<View style={styles.buttonContainer}>
  {request ? ( // Conditionally render based on the "request" prop
    <LinearGradient
      colors={["white", "white"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientButton}
    >
      <FontAwesome5 name="credit-card" size={24} color="white" style={styles.icon} />
      <TouchableOpacity
        onPress={requestCash}
        >
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={["#5087D3", "#2AA5D6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientButton}
    >
      <FontAwesome5 name="credit-card" siz e={24} color="white" style={styles.icon} />
      <TouchableOpacity
        style={styles.button}
        onPress={sendCash}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </LinearGradient>
  )}
</View>

      )}

    </View>

            </View>


        </View>
        
        
        
        
        )
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: colors.background,

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
            color: colors.textColor,
            marginRight: 8,
          },
          balance: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.textColor,
          },
          DepositText:{
            fontSize: 20,
            color: colors.textColor,
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
            color: colors.textColor,
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
            marginRight: 'auto',
            marginLeft: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            paddingVertical: 12,
            paddingHorizontal: 20,
            marginVertical: 10,
            width: '48%',
            height: 50,
            overflow: 'hidden',
            // Shadow properties for Android
            elevation: 5, // You can adjust the elevation value for the desired shadow depth
            // Shadow properties for iOS
            shadowColor: 'rgba(0, 0, 0, 0.2)', // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.5, // Shadow opacity
            shadowRadius: 2, // Shadow radius
          },
          
          icon: {
            marginRight: 10,
          },
          button: {
            flex: 1,
            alignItems: "center",
         

          },
          buttonText: {
            color: colors.textColor,
            fontSize: 12,
            fontWeight: "bold",
          },

})

export default AmountToSend;