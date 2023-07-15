import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity,TextInput } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Logo from "../assets/logo.png"
import InputFeild from "../components/inputFeilds/InputFeilds"
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import PinInput from '../components/PinInput/PinInput';



const Dailpass= () => {

    


    return (
        <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
        >
             <View  style={styles.container}>
                <View style={styles.credentials}>
                <Image
        source={Logo}
        style={styles.image}
      />
      <PinInput maxDigits={4} />


      </View>
      </View>
        

        </ImageBackground>
        
        
        
        )

}
const styles = StyleSheet.create({

      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
      },
      image: {
        width: "30%",
        height: "30%",
        resizeMode: 'contain',
      },
      pinContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      credentials:{
        margin: '5%',

      },
      pinInput: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
        container: {
            height: '100%',
            borderColor: 'red',
            borderWidth: 4,
        },
    
    });
export default Dailpass;