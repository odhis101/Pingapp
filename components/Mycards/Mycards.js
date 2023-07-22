import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Mycards = ({title,iconImage,onPress}) => {
const navigate = useNavigation();
const handlePress = () => {
  navigate.navigate(onPress);
}
return(

    <TouchableOpacity 
    style={styles.Mycard}
    onPress={handlePress}
    >
      <View style={styles.cardIcon}>
        <Icon name={iconImage} size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>


)

}
const styles = StyleSheet.create({
      Mycard: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      cardIcon: {

        borderRadius: 20,
        padding: 8,
        marginRight: 8,
      },
      cardText: {
        fontSize: 16,
        color: '#FFFFFF',
      },
    
})
export default Mycards;