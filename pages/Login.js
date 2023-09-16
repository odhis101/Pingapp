import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native"
import BackgroundImage from "../assets/background.png"
import Logo from "../assets/logo.png"
import InputFeild from "../components/inputFeilds/InputFeilds"
import { LinearGradient } from "expo-linear-gradient"
// use navigation
import { useNavigation } from "@react-navigation/native"
import { login, getUser } from "../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Blemanager from "react-native-ble-manager"
import Modal from "react-native-modal"
import RSSI from "./RSSI"
import { styled } from "nativewind"

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)
  const [getDiscoveredPeripherals, setDiscoveredPeripherals] = useState([])
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  let location = "Dailpass"

  const handleLogin = () => {
    try {
      dispatch(login({ email, password, navigation }))
      // Successfully logged in, navigate or perform other actions
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  const handleSendMessage = () => {
    // Add your logic here to send the message
    // You can navigate to another screen or perform any action
    // For now, we'll just close the modal
    toggleModal()
  }

  useEffect(() => {
    try {
      console.log("this is auth state", authState)
      console.log(location)
      dispatch(getUser({ navigation, location }))
      // Successfully logged in, navigate or perform other actions
    } catch (error) {
      setErrorMsg(error.message)
    }
  }, [])

  const StyledText = styled(Text)
  const StyledBtn = styled(TouchableOpacity)
  const StyledView = styled(View)

  if (!authState?.user?.firstName) {
    return (
      <StyledView className='flex-1 '>
        <StyledView style={styles.container} className='bg-[#FEFBF4]'>
          <View style={styles.credentials}>
            <Image source={Logo} style={styles.image} />
            <StyledText className='text-yellow-600 text-3xl'>
              Welcome to Ping
            </StyledText>
            <StyledText className='text-yellow-600 mt-1 mb-6 text-lg'>
              Please sign in to continue
            </StyledText>

            <InputFeild
              title='Email'
              textValue={email}
              textOnchange={setEmail}
            />
            <InputFeild
              title='Password'
              textValue={password}
              textOnchange={setPassword}
              secureTextEntry
            />
            <View style={styles.signInContainer}>
              <StyledBtn className='w-[40%]' onPress={handleLogin}>
                <LinearGradient
                  colors={["#CA8A04", "#FCD34D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBackground}>
                  <StyledText className='text-white text-center'>
                    Sign In
                  </StyledText>
                </LinearGradient>
              </StyledBtn>
              <StyledBtn className=' w-[60%]'>
                <StyledText className='text-yellow-600 mt-1 mb-6 mx-auto my-auto'>
                  Forgot Password?
                </StyledText>
              </StyledBtn>
            </View>
          </View>
        </StyledView>
      </StyledView>
    )
  } else {
    return <></>
  }
}

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
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
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
    backgroundColor: "#41CFD6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    color: "gray",
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
})
export default Login
