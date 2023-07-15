import React from 'react';
import { StyleSheet, Text,ImageBackground, View,Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const Mycards = () => {

return(

    <View style={styles.Mycard}>
      <View style={styles.cardIcon}>
        <Icon name="cc-visa" size={20} color="#FFFFFF" />
      </View>
      <Text style={styles.cardText}>Travel Card</Text>
    </View>


)

}
const styles = StyleSheet.create({
      Mycard: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      cardIcon: {
        backgroundColor: '#000000',
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