import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Logo from "../assets/logo.png"

const Login= () => {

    return(
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
    container: {
    height:'100%', 
    borderColor: "red",
    borderWidth: 2,
    
   },
   credentials:{
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'10%',
    marginBottom:'10%',
    borderColor: "purple",
    borderWidth: 4,

   }
   
  });
export default Login;