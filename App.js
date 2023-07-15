import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Dailpass from './pages/DailPass';
import Home from './pages/Home';

export default function App() {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
