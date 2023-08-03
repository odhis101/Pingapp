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
  
  const ContactList = ({ name, date, onPress }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleRadioPress = () => {
      setIsSelected(!isSelected);
    };
  
    return (
      <View style={styles.TransactionDetails}>
        <Image source={Profile} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.Username}>{name}</Text>

        </View>
        <View style={styles.dateContainer}>
    <Text style={styles.Date}>{date}</Text>
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

    MyTransactions: {
      backgroundColor: "#FFFFFF",
      paddingTop: 16,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    Transactiontitle: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8,
      marginTop: 8,
    },
    TransactionsContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    recents: {
      // ... styles for recents button ...
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
    image: {
      // ... styles for image ...
    },
  
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "black",
      justifyContent:"space-between",
      alignItems: "center",
    },
    radioButtonSelected: {
      backgroundColor: "green",
    },
  });
  export default ContactList;
  