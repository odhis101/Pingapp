import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Logo from "../assets/logo.png"
import InputFeild from "../components/inputFeilds/InputFeilds"
import { LinearGradient } from 'expo-linear-gradient';


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
 <Text style={styles.title}>Welcome to Ping</Text>
<Text style={styles.subtitle}>Please sign in to continue</Text>

      <InputFeild title="Username"/>
      <InputFeild title="Password"/>
      <View style={styles.signInContainer}>
  <TouchableOpacity style={styles.signInButton}>
    <LinearGradient
      colors={['#41CFD6', '#5A54D2']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}
    >
      <Text style={styles.signInButtonText}>Sign In</Text>
    </LinearGradient>
  </TouchableOpacity>
  <TouchableOpacity style={styles.forgotPasswordButton}>
    <Text style={styles.forgotPasswordText }>
      Forgot Password?
    </Text>
  </TouchableOpacity>
</View>

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
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:'30%',
    marginBottom:'10%',


   },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom:'10%',

  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom:'2%',

  },
   signInButton: {
    width: '30%',

  },
  gradientBackground: {
    paddingVertical: 12,
    borderRadius: 100,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText:{
    fontSize: 16,
    color: 'white',
    marginLeft:'5%',
  },
  signInButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

   
  });
export default Login;