import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View ,ScrollView} from 'react-native';
import Login from './pages/Login';
import Dailpass from './pages/DailPass';
import Home from './pages/Home';
import SendMoney from './pages/SendMoney';
import Contacts from './pages/Contacts';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
    <StatusBar style="auto" />
    <Dailpass/>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    flex: 1,
    
  },
});
