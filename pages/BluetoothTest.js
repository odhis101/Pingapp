import { SafeAreaView, StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React, { useEffect } from 'react';
import { NfcManager } from "react-native-nfc-manager";
import { useState } from "react";


const BluetoothTest = () => {
    const [nfcManager, setNfcManager] = useState(undefined);

    const createNfcManager = async() => {
        const nfcManager = new NfcManager();
        setNfcManager(nfcManager);
    };

    return ( 
    
    <View style = {{ marginTop: 200 }} >
        <Text > Advertising... </Text> 
        <Button onPress = { createNfcManager }
        title = "Create NFC Manager" />
        </View>
    );
}

export default BluetoothTest;