import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "../../assets/background.png";
import Logo from "../../assets/logo.png";
import { LinearGradient } from "expo-linear-gradient";
//import Icon from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/Ionicons'; // Import the appropriate icon set
import { useNavigation } from "@react-navigation/native";
const Topnav = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("messages");
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <View style={styles.topnav}>
          <View style={styles.topnavLeft}>
            <Image source={Logo} style={styles.image} />
          </View>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="ios-create" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
  container: {
    height: "5%",
    marginBottom: "14%",
  },
  topnav: {
    // backgroundColor:'red',
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topnavRight: {},
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
export default Topnav;
