import React, { useState, useEffect,useRef } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Blemanager from 'react-native-ble-manager';

export default function RSSI() {
    const [DiscoveredPeripherals, setDiscoveredPeripherals] = useState([]);
    const [servicesAndCharacteristics, setServicesAndCharacteristics] = useState(null);
    let i = 0 
    

    const navigateSomewhere = () => {
        // Implement your navigation logic here
        // For example, you can use React Navigation to navigate to a different screen
        // navigation.navigate('YourTargetScreen');
        console.log('Navigating somewhere...');
      };
      const [showModal, setShowModal] = useState(false);

    
      const showAcceptModal = () => {
        console.log("this is true")
        setShowModal(true);
        i+=1 
      };
      const toggleModal = () => {
        setShowModal(!showModal);
      };
    
      // Function to hide the modal
      const hideModal = () => {

        setShowModal(false);
      };
    
      Blemanager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });
    
      Blemanager.enableBluetooth()
        .then(() => {
          // Success code
          console.log("The bluetooth is already enabled or the user confirm");
        })
        .catch((error) => {
          // Failure code
          console.log("The user refuse to enable bluetooth");
        });
      // get rrssi
      Blemanager.getConnectedPeripherals([]).then((results) => {
        console.log('this is connected peripherals ',results);
      });
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          Blemanager.getDiscoveredPeripherals([]).then((results) => {
            console.log('THIS IS DISCOVERED PERIPHERALS ', results);
    
            const peripheralsWithLowRssi = results.filter((peripheral) => peripheral.rssi < -70);
            console.log("this is rssi check ",peripheralsWithLowRssi)
            if (peripheralsWithLowRssi.length > 0) {
              // Do something when there are peripherals with low rssi
              if (i===0){
                const firstPeripheralWithLowRssi = peripheralsWithLowRssi[0];
                setDiscoveredPeripherals(firstPeripheralWithLowRssi.id)
                console.log('Peripherals with low RSSI:', firstPeripheralWithLowRssi);
                showAcceptModal()

              }
              else{
                console.log("the guy has said NOOOO")
              }
             
              // Here, you can perform any specific action you want when the condition is met.
              // For example, you can set some state, show a notification, or perform any other task.
            }
            // Use state update to set discovered peripherals
            setDiscoveredPeripherals(results);
          });
        }, 2000); // 5000 milliseconds = 5 seconds
      
        // Cleanup the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
      }, []); // Empty dependency array to run this effect once when the component mounts

      
    
      Blemanager.scan([], 10, true).then((devices) => {
        console.log('checking devices found ');
        console.log(devices);
      
      });
      const handleSendMessage = () => {
        console.log('this is after i have sent cash ',DiscoveredPeripherals[0])
        console.log(typeof(DiscoveredPeripherals))
        
        // i 
        /*
        Blemanager.connect(DiscoveredPeripherals)
        .then((peripheralInfo) => {
            console.log('Services and characteristics discovered', peripheralInfo);
            setServicesAndCharacteristics(peripheralInfo.services);
            // After successful connection, retrieve services
            return Blemanager.retrieveServices(DiscoveredPeripherals);
  })
  .then(() => {
    console.log('Services and characteristics discovered');

    // Now that services are discovered, you can read or write data

    const serviceUUID = 'YOUR_SERVICE_UUID'; // this is saved in state 
    const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';

    // Example: Write data to the characteristic
    return Blemanager.write(DiscoveredPeripherals, serviceUUID, characteristicUUID, [0x48, 0x65, 0x6C, 0x6C, 0x6F]);
  })
  .then(() => {
    // if succesfull navigate to amount to send after using a get request to get the account 

    console.log('Data sent successfully');

    // You can continue with more actions or handle success here
  })
  .catch((error) => {
    console.error('Error:', error);

    // Handle any errors that occur during the process
  });
  */


        
        
        toggleModal();
      };
    
     



  return (
    <View>
             <Modal isVisible={showModal} backdropOpacity={0.7}>
        <View style={styles.modalContent}>
          <Image
            source={require('../assets/handshake.gif')}
            style={styles.deviceImage}
          />
          <Text style={styles.messageText}>
            📡 Device found near you!
          </Text>
          <Text style={styles.messageText}>
            Would you like to Some cash? 
          </Text>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send Cash !</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideModal}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({

modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  deviceImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#41CFD6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'gray',
    fontSize: 16,
  },
  credentials: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
    marginBottom: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: "10%",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: "2%",
  },
})