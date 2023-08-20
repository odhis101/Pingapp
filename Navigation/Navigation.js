// Navigation.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../pages/Home";
import SendMoney from "../pages/SendMoney";
import Contacts from "../pages/Contacts";
import PhoneNumber from "../pages/PhoneNumber";
import SendToBank from "../pages/SendToBank";
import AmountToSend from "../pages/AmountToSend";
import ConfirmPayment from "../pages/ConfirmPayment";
import Login from "../pages/Login";
import Dailpass from "../pages/DailPass";
import messages from "../pages/Messages";
import Deposit from "../pages/Deposit";
import Request from "../pages/Request"
import DepositFromNumber from "../pages/DepositFromNumber"
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dailpass" component={Dailpass} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="SendToBank" component={SendToBank} />
        <Stack.Screen name="AmountToSend" component={AmountToSend} />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
        <Stack.Screen name="Deposit" component={Deposit} />
        <Stack.Screen name="Request" component={Request} />
        <Stack.Screen name="DepositFromNumber" component={DepositFromNumber} />


      
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
