import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BackgroundImage from "../assets/background.png";
import Logo from "../assets/logo.png";
import InputFeild from "../components/inputFeilds/InputFeilds";
import { LinearGradient } from "expo-linear-gradient";
import PinInput from "../components/PinInput/PinInput";
import { Dimensions } from "react-native";

//q: get dimesnsion of screen and set the height of the container to 100% of the screen
//q: how to make the pin input box responsive to the screen size

const Dailpass = () => {
  //console.log("this is the screen height",Dimension.get('screen').height)
  const [imageHeight, setImageHeight] = useState(0);
  useEffect(() => {
    const window = Dimensions.get("window");
    setImageHeight(window.height +10);
  }, []);
  return (
    <View style={{ height: imageHeight }}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} >
        <View style={styles.container}>
          <View style={styles.credentials}>
            <Image source={Logo} style={styles.image} />
            <PinInput maxDigits={4} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
    height: "100%",
    
  },
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  pinContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  credentials: {
    margin: "5%",
  },
  pinInput: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    height: "100%",
  },
});
export default Dailpass;
