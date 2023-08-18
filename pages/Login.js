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

  const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let location = "Dailpass"

    const handleLogin =() => {
      try {
        dispatch(login({email, password,navigation}));
        // Successfully logged in, navigate or perform other actions
      } catch (error) {
        setErrorMsg(error.message);
      }
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
