import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { useRoute, useNavigation } from "@react-navigation/native";
import BackgroundImage from "../assets/background.png";
import { Dimensions } from "react-native";
import CorrectImg from "../assets/Success.png"
import WrongImg from "../assets/Reject.png"

const Success = () => {
  const [imageHeight, setImageHeight] = useState(0);
  navigation = useNavigation()
  //const isSuccess = false
  const route = useRoute()
  const isSuccess = route.params?.isSuccess || false;
  const backHome =()=>{
    navigation.navigate("")
  }




  useEffect(() => {
    const window = Dimensions.get("window");
    setImageHeight(window.height);
  }, []);
  console.log(imageHeight);

  return (
    <ImageBackground
      source={BackgroundImage}
      style={{ ...styles.backgroundImage, height: imageHeight }}
    >
      <View style={styles.container}>

      
         <Image
        source={isSuccess ? CorrectImg : WrongImg}
        style={styles.centeredImage}
      />
        <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={backHome}
        style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>New Transaction</Text>
        </TouchableOpacity>
      </View>

    </View>

     
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height:"100%",
    borderColor:"red",
    marginLeft:"5%",
    marginRight:"5%"
  },
  buttonContainer: {

    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3E80B2', // Greyish color
    //backgroundColor: 'rgba(204, 204, 204, 0.34)', // Greyish color with reduced opacity
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  centeredImage:{
    width:"100%",
    height:"50%",
    marginRight:"auto",
    marginLeft:"auto",
     marginTop:"40%"

  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',

  },
  whiteText: {
    color: 'white',
    fontSize: 16,
  },
  amountText: {
    color: 'white',
    fontSize: 32,
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
   
  },
  nameText: {
    color: 'white',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#42b72a', // Green background color
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    height: 40,
    width: "100%",
    alignSelf: 'center',
  },
  
  backgroundImage: {
    resizeMode: 'cover',
  },
});

export default Success;
