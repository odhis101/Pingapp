import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Login from "./pages/Login";
import Dailpass from "./pages/DailPass";
import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import Contacts from "./pages/Contacts";
import PhoneNumber from "./pages/PhoneNumber";
import SendToBank from "./pages/SendToBank";

export default function App() {
  return (
   
      <ScrollView>
        <StatusBar style="auto" />
        <SendToBank />
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({});
