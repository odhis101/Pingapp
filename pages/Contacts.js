import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Topnav from '../components/Topnav/Topnav';
import SendMoney from '../components/SendMoney/SendMoney';
import Mycards from '../components/Mycards/Mycards';
import Profile from '../assets/profile.png'
import RecentTransactions from '../components/RecentTransactions/RecentTransactions';



const Contacts = () => {

    return(
            <View style ={styles.ContactContainer}>

                </View>            





    )



};
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height:"100%"// or 'stretch' if you want to stretch the image
      },
      currencyContainer: {
        height: '100%',
      },
      ContactContainer: {
        height: 100,
        borderColor: 'red',
        height: '40%',
        borderWidth: 10,
      },


});

export default Contacts;