// Navigation.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import Contacts from "./pages/Contacts";
import PhoneNumber from "./pages/PhoneNumber";
import SendToBank from "./pages/SendToBank";
import AmountToSend from "./pages/AmountToSend";
import ConfirmPayment from "./pages/ConfirmPayment";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="SendToBank" component={SendToBank} />
        <Stack.Screen name="AmountToSend" component={AmountToSend} />
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
