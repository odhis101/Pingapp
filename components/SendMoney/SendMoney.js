import React from "react"
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"

const SendMoney = ({ name, onPress }) => {
  const navigation = useNavigation()
  const handleSendMoney = () => {
    navigation.navigate(onPress) // we plan on sending a prop saying sending and requesting
  }

  return (
    <TouchableOpacity 
    className='w-[40%]'
    onPress={handleSendMoney}
    >
      <View className='rounded-full bg-white flex flex-row items-center justify-center shadow-md p-4'>
        <Icon name="credit-card" size={24} color="#B1843D" />
        <Text className='font-light text-[#B1843D] pl-2'>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}


export default SendMoney
