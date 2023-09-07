import React, { useState, useEffect,useRef } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "../assets/background.png";
import Logo from "../assets/logo.png";
import InputFeild from "../components/inputFeilds/InputFeilds";
import { LinearGradient } from "expo-linear-gradient";
// use navigation 
//import { useNavigation } from "@react-navigation/native";
import { login,getUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Blemanager from 'react-native-ble-manager';
import Modal from "react-native-modal";
import RSSI from './RSSI';

import getEnvVars from "../.env.js"

const Login = () => {
  //const navigation = useNavigation();

  const [errorMsg, setErrorMsg] = useState(null);
  const [getDiscoveredPeripherals, setDiscoveredPeripherals] = useState([]);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let location = "Dailpass"
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { API_URL } = getEnvVars();


  const handleLogin = () => {
    // Define your request data (you can use the state variables you've set earlier)
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };
  
    // Make an Axios POST request to the signup URL
    axios.post(`${API_URL}/api/v1/auth/signup`, requestData)
      .then((response) => {
        // If the request is successful (status code 200), navigate to the login page
        if (response.status === 200) {
          navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  };
  const handleSendMessage = () => {
    // Add your logic here to send the message
    // You can navigate to another screen or perform any action
    // For now, we'll just close the modal
    toggleModal();
  };

  useEffect(() => {
    try {
      console.log('this is auth state',authState)
      console.log(location)
      dispatch(getUser({navigation,location}));
      // Successfully logged in, navigate or perform other actions
    }
    catch (error) {
      setErrorMsg(error.message);
    }
  }, []);

  if (!authState?.user?.firstName){
    return (

      <View style={styles.container}>
        
        <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.credentials}>
               <Text style={styles.title}>Welcome to Ping</Text>
              <Text style={styles.subtitle}>Please sign Up to continue</Text>
              <InputFeild title="firstname" textValue = {firstName} textOnchange = {setFirstName}/>
              <InputFeild title="lastName" textValue = {lastName} textOnchange = {setLastName}/>
              <InputFeild title="username" textValue = {username} textOnchange = {setUsername}/>
              <InputFeild title="phoneNumber" textValue = {phoneNumber} textOnchange = {setPhoneNumber}/>
              <InputFeild title="Email" textValue = {email} textOnchange = {setEmail}/>
              <InputFeild title="Password" textValue = {password} textOnchange = {setPassword} secureTextEntry  />
              <View style={styles.signInContainer}>
                <TouchableOpacity
                style={styles.signInButton}
                  onPress={handleLogin}
                >
                  <LinearGradient
                    colors={["#41CFD6", "#5A54D2"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBackground}
                  >
                    <Text style={styles.signInButtonText}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </ImageBackground>
        
      </View>

    );
  }
  else{
    return(
      <>
      </>
    )
  }
  
};

const styles = StyleSheet.create({
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
    height: "100%",
  },
  container: {
    flex: 1,
    height: 800,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  deviceImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#41CFD6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'gray',
    fontSize: 16,
  },
  credentials: {
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "10%",
    marginTop:'20%'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: "10%",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: "2%",
  },
  signInButton: {
    width: "30%",
    marginRight:"auto",
    marginLeft:"auto"
  },
  gradientBackground: {
    paddingVertical: 12,
    borderRadius: 100,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "white",
    marginLeft: "5%",
  },
  signInButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Login;
