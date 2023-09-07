import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from 'react-redux';

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
import Chatmessages from "../pages/Chatmessages"
import Success from "../pages/Success";
import BarcodeScanner from "../pages/QrCode";
import BluetoothScanner from "../pages/BluetoothTest";
import SendWithQrCode from "../pages/SendWithQrCode";

const Stack = createStackNavigator();

const Navigation = () => {
  const authState = useSelector((state) => state.auth);
// make authstate an await function 

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
        <Stack.Screen name="Chatmessages" component={Chatmessages} />
        <Stack.Screen name="messages" component={messages} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        <Stack.Screen name="BluetoothScanner" component={BluetoothScanner} />
        <Stack.Screen name="SendWithQrCode" component={SendWithQrCode} />

        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
