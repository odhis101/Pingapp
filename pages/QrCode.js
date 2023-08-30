import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const QRCodePage = () => {
    const navigation = useNavigation();
    const authState = useSelector((state) => state.auth);
    const selectedContacts = authState.user;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(data){
        navigation.navigate('AmountToSend', {selectedContacts: selectedContacts});
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrCodeContainer}>
        <QRCode value={JSON.stringify(selectedContacts)} size={200} />
        <Text style={styles.qrCodeText}>Scan this QR code to transfer</Text>
      </View>
      {showScanner ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeScanner}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={toggleScanner}>
          <Text style={styles.buttonText}>Open Barcode Scanner</Text>
        </TouchableOpacity>
      )}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodeText: {
    marginTop: 10,
    fontSize: 16,
  },
  barCodeScanner: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QRCodePage;
