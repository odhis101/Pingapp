import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackgroundImage from "../assets/background.png";
import Topnav from "../components/Topnav/Topnav";
import SendMoney from "../components/SendMoney/SendMoney";
import Mycards from "../components/Mycards/Mycards";
import Profile from "../assets/profile.png";
import RecentTransactions from "../components/RecentTransactions/RecentTransactions";
import axios from "axios";
const Sendmoney = () => {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("GBP");
  useEffect(() => {
    // Fetch balance and currency data here
    fetchBalanceAndCurrency();
  },  []);
// use effect to see changes if balance changes
  React.useEffect(() => {
    console.log("Balance: ", balance);
  }, [balance]);

  const fetchBalanceAndCurrency = async () => {
    try {
      const response = await axios.get(
        "https://15c0-196-207-134-81.ngrok-free.app/api/v1/user/wallet",
      );

      
      console.log("Response: ", response.data.data.wallet.balance);

    
      setBalance(response.data.data.wallet.balance);
      setCurrency(currency);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ScrollView style={{ height: "100%" }}>
      <View style={styles.currencyContainer}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >
          <Topnav />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Balance</Text>
            <View style={styles.currentBalance}>
              <Text style={styles.currency}>£</Text>
              <Text style={styles.balance}>{balance}</Text>
            </View>
            <Text style={styles.recentTransactions}>+ £ 790</Text>
          </View>
          <View style={styles.moneyButtons}></View>
          <Text style={styles.title}>SendMoney</Text>

          <View style={styles.Mycards}>
            <Text style={styles.heading}>My Cards</Text>
            <Mycards title={"Send to contact"} iconImage={"user"} onPress ={'Contacts'} sendMoney = {true}/>
            <Mycards title={"Send to Phone Number "} iconImage={"smartphone"} onPress={'PhoneNumber'} />
            <Mycards title={"Send To Bank "} iconImage={"dollar-sign"} onPress ={'SendToBank'}/>
          </View>
          <View style={styles.MyTransactions}>
            <Text style={styles.Transactiontitle}>Transactions</Text>
            <View style={styles.TransactionsContainer}>
              <TouchableOpacity style={styles.recents}>
                <Text>Sort by recents</Text>
              </TouchableOpacity>

              <RecentTransactions />
              <RecentTransactions />
              <RecentTransactions />
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
  currencyContainer: {
    height: "100%",

    // ... other styles for background image or color
  },
  MyTransactions: {
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    // ... other styles for MyTransactions container
  },
  infoContainer: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  currentBalance: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 8,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  recentTransactions: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 8,
  },
  moneyButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  Mycards: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  Mycard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "15%",
  },
  cardIcon: {
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#FFFFFF",
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
});
export default Sendmoney;
