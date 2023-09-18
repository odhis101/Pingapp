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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";


//q: get dimesnsion of screen and set the height of the container to 100% of the screen
//q: how to make the pin input box responsive to the screen size

const Dailpass = () => {
  //console.log("this is the screen height",Dimension.get('screen').height)
  const [imageHeight, setImageHeight] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const authstate = useSelector((state) => state.auth);
  console.log("this is the authstate", authstate);

  useEffect(() => {
    const window = Dimensions.get("window");
    console.log(window)

    setImageHeight(window.height +10);
  }, []);
  return (
    <View style={{ height: "100%" }}>
        <View className='bg-[#FEFAF4] h-screen'>
          <View className='flex flex-col justify-center items-center h-full'>
            <Image source={Logo} className='w-[26px] h-[26px] my-4' />
            <PinInput maxDigits={4} route = {route} />
          </View>
        </View>
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
