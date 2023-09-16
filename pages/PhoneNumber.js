import React, { useState } from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Topnav from '../components/Topnav/Topnav';
import SendMoney from '../components/SendMoney/SendMoney';
import Mycards from '../components/Mycards/Mycards';
import Profile from '../assets/profile.png'
import RecentTransactions from '../components/RecentTransactions/RecentTransactions';
import TransactionsRadio from '../components/TransactionsRadio/TransactionsRadio';
import { AntDesign } from '@expo/vector-icons';
import {colors} from "../Colors"

const PhoneNumber = () => {
    const [showCountryCodes, setShowCountryCodes] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+44');
  
    const handleCountryCodePress = (countryCode) => {
      setSelectedCountryCode(countryCode);
      setShowCountryCodes(!showCountryCodes);
    };

return(
    <View style={styles.container}>
              <View
          style={styles.backgroundImage}
        >
         <Text style={styles.sendToNumber}>Send To Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Enter Phone Number</Text>
        <View style={styles.phoneInputContainer}>
        <TouchableOpacity style={styles.countryCode} onPress={() => setShowCountryCodes(!showCountryCodes)}>
            <Text> {selectedCountryCode} </Text>
          </TouchableOpacity>
          <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter Phone Number" />
        </View>
        {showCountryCodes && (
          <View style={styles.countryCodesDropDown}>
            {/* Render your list of country codes here */}
            <TouchableOpacity
              style={styles.countryCodeItem}
              onPress={() => handleCountryCodePress('+254')}
            >
              <Text> +254 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.countryCodeItem}
              onPress={() => handleCountryCodePress('+91')}
            >
              <Text> +91 </Text>
            </TouchableOpacity>
            {/* Add more country codes as needed */}
          </View>
        )}

      </View>
      <TouchableOpacity style={styles.proceedBtn}>
                <Text style={{color:colors.textColor}}> Proceed</Text>

            </TouchableOpacity>

            </View>

    
    </View>
        )


}

const styles = StyleSheet.create({

container:{
    flex:1,
    height:"100%",
},
backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
    height:"100%",
    color: colors.background
  },
  sendToNumber: {
    fontSize: 24, // Large font size
    color: colors.textColor,
  
  position:'absolute',
  top:150,
left:20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    marginLeft:'auto',
    marginRight:'auto',
    marginTop: '60%',

    width: '90%',
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    color:colors.textColor
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryCode: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginRight: 10,
  },
  countryCodesDropDown: {
    position: 'absolute',
    top: 90,
    left: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countryCodeItem: {
    padding: 10,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  proceedBtn: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginTop: 10,
    marginLeft:'auto',
    marginRight:'10%',
    width: '40%',
    alignItems: 'center',
    

  }
  
})
export default PhoneNumber;
