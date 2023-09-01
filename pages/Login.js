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
  import { useNavigation } from "@react-navigation/native";
  import { login,getUser } from '../features/auth/authSlice';
  import { useDispatch, useSelector } from 'react-redux';
  import axios from "axios";
  import Blemanager from 'react-native-ble-manager';
  import Modal from "react-native-modal";


  
  const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [getDiscoveredPeripherals, setDiscoveredPeripherals] = useState([]);
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let location = "Dailpass"
    console.log('hello world')
    const navigateSomewhere = () => {
      // Implement your navigation logic here
      // For example, you can use React Navigation to navigate to a different screen
      // navigation.navigate('YourTargetScreen');
      console.log('Navigating somewhere...');
    };
    const [showModal, setShowModal] = useState(true);

    const showAcceptModal = () => {
      setShowModal(true);
    };
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    // Function to hide the modal
    const hideModal = () => {
      setShowModal(false);
    };

    Blemanager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  
    Blemanager.enableBluetooth()
      .then(() => {
        // Success code
        console.log("The bluetooth is already enabled or the user confirm");
      })
      .catch((error) => {
        // Failure code
        console.log("The user refuse to enable bluetooth");
      });
    // get rrssi
    Blemanager.getConnectedPeripherals([]).then((results) => {
      console.log('this is connected peripherals ',results);
    });
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        Blemanager.getDiscoveredPeripherals([]).then((results) => {
          console.log('THIS IS DISCOVERED PERIPHERALS ', results);

          const peripheralsWithLowRssi = results.filter((peripheral) => peripheral.rssi > -40);
          console.log("this is rssi check ",peripheralsWithLowRssi)
          if (peripheralsWithLowRssi.length > 0) {
            // Do something when there are peripherals with low rssi
            console.log('Peripherals with low RSSI:', peripheralsWithLowRssi);
            // Here, you can perform any specific action you want when the condition is met.
            // For example, you can set some state, show a notification, or perform any other task.
          }
          // Use state update to set discovered peripherals
          setDiscoveredPeripherals(results);
        });
      }, 2000); // 5000 milliseconds = 5 seconds
    
      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, []); // Empty dependency array to run this effect once when the component mounts
    

    Blemanager.scan([], 10, true).then((devices) => {
      console.log('checking devices found ');
      console.log(devices);
    
    });
    const handleLogin =() => {
      try {
        dispatch(login({email, password,navigation}));
        // Successfully logged in, navigate or perform other actions
      } catch (error) {
        setErrorMsg(error.message);
      }
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
                <Image source={Logo} style={styles.image} />
                <Text style={styles.title}>Welcome to Ping</Text>
                <Text style={styles.subtitle}>Please sign in to continue</Text>
  
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
                      <Text style={styles.signInButtonText}>Sign In</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </ImageBackground>
          <Modal isVisible={showModal} backdropOpacity={0.7}>
        <View style={styles.modalContent}>
          <Image
            source={require('../assets/handshake.gif')}
            style={styles.deviceImage}
          />
          <Text style={styles.messageText}>
            📡 Device found near you!
          </Text>
          <Text style={styles.messageText}>
            Would you like to Some cash? 
          </Text>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send Cash !</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideModal}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
      marginTop: "30%",
      marginBottom: "10%",
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
