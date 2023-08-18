import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Login from "./pages/Login";
import Dailpass from "./pages/DailPass";
import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import Contacts from "./pages/Contacts";
import PhoneNumber from "./pages/PhoneNumber";
import SendToBank from "./pages/SendToBank";
import AmountToSend from "./pages/AmountToSend";
import ConfirmPayment from "./pages/ConfirmPayment";
import Navigation from "././Navigation/Navigation";
import { Provider } from "react-redux";
import store from "./store";
import BluetoothTest from "./pages/BluetoothTest";
import Chatmessages from './pages/Chatmessages'
import Messages from "./pages/Messages";
export default function App() {
  return (
   
      <>
          <Provider store={store}>
        <StatusBar style="auto" />
        <Chatmessages />
        </Provider>

      </>
    
  );
}

const styles = StyleSheet.create({});