import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Vibration,
  Animated 
} from "react-native";
import { Dimensions } from "react-native";
// import usenavigation from "react-navigation-hooks";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import getEnvVars from "../../.env.js"

const PinInput = ({ maxDigits, route}) => {

  const { API_URL } = getEnvVars();

  const [pinAnimation] = useState(new Animated.Value(0)); // Initialize the animation value
  const [isPasscodeCorrect, setIsPasscodeCorrect] = useState(false);
  const [incorrectPasscodeEntered, setIncorrectPasscodeEntered] = useState(false);

  const navigate = useNavigation();

  const [pin, setPin] = useState("");
  const [imageHeight, setImageHeight] = useState(0);
  const sendCash = route.params?.sendCash || false;
  const balance = route.params?.balance || {};
  const selectedContacts = route.params?.selectedContacts || "";
  console.log(sendCash)

  useEffect(() => {
    const window = Dimensions.get("window");
    setImageHeight(window.height);
    console.log(pin.length)
  }, []);

  const handlePinChange = async (digit) => {
    console.log("testing .... ")
    console.log(pin, 4)
    if (pin.length < 4) {
      setPin((currentPin) => currentPin + digit); // Use callback form to ensure updated value
    }
   let pincheck = pin + digit
    if(pincheck.length === 4){
      console.log("it has reached 4")
      
    try{
      console.log(pin)
      const data = await axios.post(
        `${API_URL}/api/v1/auth/check_pin`,
      {
        pin:pin+digit
      },{withCredentials:true}
      
      )
      if(data){
        if(sendCash){
          console.log("joshuiaasd")
          navigate.navigate("ConfirmPayment",{balance:balance,selectedContacts:selectedContacts})
        }
        else{
          console.log("success")
          setPin(""); // Clear the pin state
          navigate.navigate("Home");
        }

        
        /*
        setIsPasscodeCorrect(true); // Set the state to false for incorrect passcode
        Vibration.vibrate();
  
        Animated.sequence([
          Animated.timing(pinAnimation, {
            toValue: 1, // This value depends on how much you want to move the pins up
            duration: 300, // Animation duration
            useNativeDriver: false,
          }),
          Animated.delay(500), // Add a delay before resetting the animation
          Animated.timing(pinAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
        setTimeout(() => {
        navigate.navigate("Home");
      }, 1000);
      */
      
      }
      else{
        setPin(""); // Clear the pin state

        /*
        setIncorrectPasscodeEntered(true); // Set the state to true for incorrect passcode


        Vibration.vibrate();
        //setPin(""); // Clear the pin state
        // Start the animation
  
        Animated.sequence([
          Animated.timing(pinAnimation, {
            toValue: 1, // This value depends on how much you want to move the pins up
            duration: 300, // Animation duration
            useNativeDriver: false,
          }),
          Animated.delay(500), // Add a delay before resetting the animation
          Animated.timing(pinAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(); // Start the animation sequence
         setTimeout(() => {
        setIncorrectPasscodeEntered(false); // Reset the state after a delay
      }, 1000); // Adjust the delay time as needed
        setPin(""); // Clear the pin state
        //setIncorrectPasscodeEntered(false); // Set the state to false for incorrect passcode
      
    */
   }
    }
    catch(error){
      console.log(error)
      setIncorrectPasscodeEntered(true); // Set the state to true for incorrect passcode


        Vibration.vibrate();
        //setPin(""); // Clear the pin state
        // Start the animation
  
        Animated.sequence([
          Animated.timing(pinAnimation, {
            toValue: 1, // This value depends on how much you want to move the pins up
            duration: 300, // Animation duration
            useNativeDriver: false,
          }),
          Animated.delay(500), // Add a delay before resetting the animation
          Animated.timing(pinAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(); // Start the animation sequence
         setTimeout(() => {
        setIncorrectPasscodeEntered(false); // Reset the state after a delay
      }, 1000); // Adjust the delay time as needed
        setPin(""); // Clear the pin state
        //setIncorrectPasscodeEntered(false); // Set the state to false for incorrect passcode
      
      setPin("");
    }
  }
  }

  const animatedContainerStyle = {
    transform: [
      {
        translateY: pinAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40], // Adjust this value as needed to move the pins up
        }),
      },
    ],
  };

  const handleClearPin = () => {
    setPin("");
  };
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < maxDigits; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < pin.length ? styles.dotFilled : styles.dotEmpty,
            incorrectPasscodeEntered ? styles.dotWrong : null,
            isPasscodeCorrect ? styles.dotCorrect : null,

          ]}
        />
      );
    }

    return <View style={styles.dotsContainer}>{dots}</View>;
  };
  

  return (
    <View style={styles.container}>
       <Animated.View style={[styles.container, animatedContainerStyle]}>
      {renderDots()}

      {/* ... rest of your code ... */}
    </Animated.View>

      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("1")}
        >
          <Text style={styles.pinText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("2")}
        >
          <Text style={styles.pinText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("3")}
        >
          <Text style={styles.pinText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("4")}
        >
          <Text style={styles.pinText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("5")}
        >
          <Text style={styles.pinText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("6")}
        >
          <Text style={styles.pinText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("7")}
        >
          <Text style={styles.pinText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("8")}
        >
          <Text style={styles.pinText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("9")}
        >
          <Text style={styles.pinText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("0")}
        >
          <Text style={styles.pinText}>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pinButton: {
    marginLeft: "5%",
    marginRight: "5%",
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: "white",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    // Add shadow properties
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android shadow
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: "10%",
  },
  pinText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D9195",
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 2,
  },
  dotEmpty: {
    backgroundColor: "#FFFFFF",
    marginLeft: "5%",
  },
  dotFilled: {
    marginLeft: "5%",
    backgroundColor: "#000000",
  },
  dotWrong: {
    backgroundColor: "red",
  },
  dotCorrect: {
    backgroundColor: "green",
  },
  

});

export default PinInput;
