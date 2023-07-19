
import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import BackgroundImage from "../../assets/background.png"
import Logo from "../../assets/logo.png"
import { LinearGradient } from 'expo-linear-gradient'; 
import Icon from 'react-native-vector-icons/Feather';



const Topnav= () => {

    return  (
        <View style={styles.container}>
              <View
              style={styles.backgroundImage}
              >
         <View style={styles.topnav}>
            <View style={styles.topnavLeft}>
                <Image source={Logo} style={styles.image} />
            </View>
            <View style={styles.topnavRight}>
                <Icon name="message-circle" size={30} color="#000000" />
            </View>
        </View>


            </View>


        </View>


    )

}
const styles = StyleSheet.create({
    image: {
      width: "40%",
      height: "40%",
      resizeMode: 'contain',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
      },
      container: {
        height:'5%', 
       },
       topnav: {
       // backgroundColor:'red',
        marginTop: "10%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
 
        
        

      },
 
      topnavRight: {},
      image: {
        width: 80,
        height: 30,
        resizeMode: 'contain',
      },


})
export default Topnav;