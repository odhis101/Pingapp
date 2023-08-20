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

const RecentTransactions = ({ name, date,onPress,contactDetails}) => {
  const [isSelected, setIsSelected] = useState(false);
console.log(contactDetails)
  const handleRadioPress = () => {
    setIsSelected(!isSelected);
    onPress(name, !isSelected,contactDetails); 
  };
  return (
    <View style={styles.TransactionDetails}>
      <Image source={Profile} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.Username}>{name}</Text>
        <Text style={styles.Date}>{date}</Text>
      </View>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={handleRadioPress}>
          <View
            style={[
              styles.radioButton,
              isSelected && styles.radioButtonSelected,
            ]}
          >
            {isSelected && <AntDesign name="check" size={20} color="white" />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  radioButtonContainer: {
    marginLeft: "auto",
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
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "green",
  },
});
export default RecentTransactions;
