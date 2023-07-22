import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import BleManager from 'react-native-ble-manager';
import React, { useEffect } from 'react';


const BluetoothTest = () => {
    useEffect(() => {
        BleAdvertiser.setCompanyId(0x004C); // You can set your custom company ID here
        BleAdvertiser.broadcast('MyApp', null, null, (error) => {
          if (error) {
            console.log('Advertising error:', error);
          } else {
            console.log('Advertising started.');
          }
        });
    
        return () => {
          BleAdvertiser.stopBroadcast(() => {
            console.log('Advertising stopped.');
          });
        };
      }, []);
    return (
        <View style={{marginTop:200}}>
      <Text>Advertising...</Text>
        </View>
    );
}

export default BluetoothTest;

