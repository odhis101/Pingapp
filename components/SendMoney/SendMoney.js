import React from "react";
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
import {useNavigation} from '@react-navigation/native';

const SendMoney = ({ name, onPress}) => {
  const navigation = useNavigation();
  const handleSendMoney = () => {
    navigation.navigate(onPress);
  };

  return (
    <TouchableOpacity 
    style={styles.sendButton}
    onPress={handleSendMoney}
    >
      <View style={styles.gradientBackground}>
        <Icon name="credit-card" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    width: "35%",
    borderRadius: 50,
    overflow: "hidden",
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 14,
    paddingLeft:"5%",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default SendMoney;
