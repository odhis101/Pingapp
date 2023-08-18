import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";

const inputFeilds = ({title,textValue,textOnchange}) => {

  const [hidePassword, setHidePassword] = useState(true);


  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor="#A9A9A9"
        textAlignVertical="center"
        value={textValue}
        onChangeText={textOnchange}
        secureTextEntry={title === 'Password' ? hidePassword : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  vendorName: {
    marginTop: "15%",
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
  },
  wrapper: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "10%",
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#4CCFD4",
  },
  signInButton: {
    backgroundColor: "#4CCFD4",
    paddingVertical: 12,
    width: "30%",
    paddingHorizontal: 20,
    borderRadius: "100%",
    marginBottom: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "white",

    marginBottom: 20,

    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
  },
  registerContainer: {
    flexDirection: "row",

    marginTop: 20,
  },
  registerText: {
    color: "black",
  },
  registerLink: {
    color: "#4CCFD4",
  },
  inputLabel: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    color: "black",
    fontSize: 12,
  },
  input: {
    paddingVertical: "5%",
    paddingLeft: 10,
    color: "black",
  },
});
export default inputFeilds;
