import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  import Profile from "../../assets/profile.png";
  import React, { useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import Icon from 'react-native-vector-icons/Ionicons'; // If you're using react-native-vector-icons
  
  const ContactList = ({ name, date, lastMessage, onPress,time }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleRadioPress = () => {
      setIsSelected(!isSelected);
    };
  
    return (
      <View style={styles.TransactionDetails}>
      <Image source={Profile} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.nameDateContainer}>
          <Text style={styles.Username}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
        </View>
          <Text style={styles.lastMessage}>{lastMessage}</Text>

      </View>
    </View>
    );
  };
  const styles = StyleSheet.create({
    radioButtonContainer: {
      marginLeft: "auto",
    },
    dateContainer:{
      marginLeft: "100%",
    },
    image: {
      width: 70,
      height: 70,
      resizeMode:'contain',

    },
    infoContainer: {
      flex: 1,

    },
    nameDateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    lastMessage: {
      color: "grey",
      marginTop: 4,
    },
    time: {
      color: "blue",
      textAlign: "right",
      marginTop: 4,
      fontSize: 16,
    },

    TransactionDetails: {
      marginBottom:10,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: "grey",
    },
  

  });
  export default ContactList;
  