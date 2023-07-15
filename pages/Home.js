import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/background.png"
import Logo from "../assets/logo.png"
import InputFeild from "../components/inputFeilds/InputFeilds"
import { LinearGradient } from 'expo-linear-gradient';
import Topnav from '../components/Topnav/Topnav';


const Home= () => {

    return  (
       <View>
            
              <Topnav/>
       </View>
    )

}
const styles = StyleSheet.create({


})
export default Home;