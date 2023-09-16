import { useEffect, useState,useRef } from 'react';
import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';
import Profile from "../assets/profile.png";
import Icon from 'react-native-vector-icons/Ionicons'; // If you're using react-native-vector-icons
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from "../.env.js"
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import axios from 'axios';
const messages = () => {
  const { API_URL } = getEnvVars();
  const scrollViewRef = useRef();

  const route = useRoute();
  const { contact,id } = route.params;
  console.log("this is the contact",contact)
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [incomingMessages, setIncomingMessages] = useState([]);
const [outgoingMessages, setOutgoingMessages] = useState([]);
const navigation = useNavigation();
const [showModal, setShowModal] = useState(true);
const [showModalTwo,setShowModalTwo] = useState(false)
const authState = useSelector((state) => state.auth);
const [transactMessage,SetTransactMessage] = useState("")
const [mergedMessages,setmergedMessages] = useState([...incomingMessages, ...outgoingMessages]);
useEffect(() => {
  setmergedMessages([...mergedMessages, ...incomingMessages, ...outgoingMessages])
}, [incomingMessages, outgoingMessages]);
console.log("this is the merged messages",mergedMessages)
useEffect(async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/conversations/get_conversation`, {
      params: {
        sender: authState.user.id,
        recepient: contact.id,
      },
    });

    const { data } = response;
    console.log("This is data", data.data.messages);
    setmergedMessages(data.data.messages);

    
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}, []);



console.log(authState)

const handleSendMessage = () => {
  // Check if a balance is available and it's a positive number
  if (balance > 0) {
    // Create a formatted message asking for money with a link
    const message = `[BalanceRequest] Hey, can you please send me $${balance}? Click here to send.`;

    // Send the formatted message using your messaging functionality
    // For now, let's log it as an example
    console.log(message);

    // Also, send the message using your messaging socket or method
    if (socket) {
      const currentTime = new Date().toISOString();
      const newOutgoingMessage = {
        recepient: contact.id, 
        message: message,
        sender:authState.user.id,
        timestamp: currentTime,
      };
      socket.emit('chat_message', newOutgoingMessage);
      setOutgoingMessages((prevMessages) => [...prevMessages, newOutgoingMessage]);
      setInputMessage('');
    }
    hideModal();
  }
};
const handleBalanceRequestClick = (message) => {
  // Extract the balance amount from the message
  const balanceRequestText = message.message.replace('[BalanceRequest]', '');
  

  console.log("this is balances ",message)
  // You can parse the balanceRequestText to extract the balance amount

  // Perform the navigation to the desired screen or action
  // For example, you can use navigation.navigate('YourScreenName')
  // Replace 'YourScreenName' with the actual name of the screen you want to navigate to
  setShowModalTwo(true)
  SetTransactMessage(message)
};
const handleSendMessageTwo = () => {
  const message = transactMessage.message;
  console.log(message)

  // Use a regular expression to search for a dollar amount pattern (e.g., $47)
  const dollarAmountPattern = /\$\d+/;

  // Search for the pattern in the message
  const match = message.match(dollarAmountPattern);

  // Extract the dollar amount if a match is found
  if (match) {
    const dollarAmount = match[0]; // Get the first match (e.g., "$47")
    const amount = dollarAmount.slice(1); // Remove the "$" to get the numeric value
    console.log("Extracted amount:", amount); // Output: "Extracted amount: 47"
    console.log('calling contact agaiin ',contact)
    navigation.navigate("Dailpass", { balance: amount, selectedContacts: [contact],sendCash: true }); 

  } else {
    console.log("No dollar amount found in the message.");
  }
};

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
const hideModalTwo = () => {
  setShowModalTwo(false);
}
const balance = route.params && route.params.balance ? route.params.balance : null;

console.log('this is balance asked for ', balance)


  console.log(id)
    //const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0; // Adjust the offset as needed
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;


    const handleBackButtonPress = () => {
      // Implement the logic to go back or perform any other actions on back button press
      // For example, you can use React Navigation's navigation.goBack() method to go back
      navigation.goBack();
    };
    const handleSendMoneyPress = () => {
      // reroute to amountTosend and pass the email gotten from contact 
      console.log(contact)
      navigation.navigate("AmountToSend",{selectedContacts:[contact],request:true })

    };
 // Define two separate state variables for incoming and outgoing messages


// ...

useEffect(() => {
  const newSocket = io(`${API_URL}`);
  setSocket(newSocket);

  newSocket.on('chat_message', (message) => {
    // Add a timestamp to the incoming message
    const messageWithTimestamp = { ...message, timestamp: new Date().toISOString(), isOutgoing: authState.user.id === message.sender };
    setIncomingMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
    console.log("this is the messagesssssss",messageWithTimestamp)
  });

  return () => {
    newSocket.disconnect();
  };
}, []);


const sendMessage = () => {
  if (socket) {
    const currentTime = new Date().toISOString();
    const newOutgoingMessage = {
      recepient: contact.id, 
      message: inputMessage,
      sender:authState.user.id,
      timestamp: currentTime,
    };
    console.log("checking neeeee",newOutgoingMessage)
    socket.emit('chat_message', newOutgoingMessage);
    setOutgoingMessages((prevMessages) => [...prevMessages, newOutgoingMessage]);
    
    setInputMessage('');
  }
};
useEffect(() => {
  // Whenever a new message is received, scroll to the end
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }
}, [mergedMessages]);

  


      return (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1 }}
          >
          <View style={styles.container}>
            <View style={styles.topBar}>
            <TouchableOpacity onPress={() => handleBackButtonPress()}>
    <Icon name="arrow-back" size={24} color="black" /> 
  </TouchableOpacity>
              {/* Replace the comments with your image and name */}
              <Image source={Profile} style={styles.image} />
              <Text>{contact.firstName} {contact.lastName}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>

            </ScrollView>
      
            <View style ={styles.writeMessage}>
              {/* Input box */}
              <TouchableOpacity style={styles.sendMoneyButton} onPress={handleSendMoneyPress}>
    {/* Replace 'send-money-icon.png' with your send money icon image */}
    <Icon name="ios-cash-outline" size={24} color="#000000" style={{marginLeft:5,marginRight:5}} />
  </TouchableOpacity>
              <TextInput
                style={{ flex: 1, marginRight: 8, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#F2F2F2' }}
                placeholder="Type your message here..."
                value={inputMessage} // Set the value of the input to the state
                onChangeText={setInputMessage} // Handle changes to the input
              />
              {/* Send icon */}
              <TouchableOpacity 
                onPress={sendMessage} // Replace with the appropriate function

              style={{ padding: 8, backgroundColor: '#007BFF', borderRadius: 4 }}>
                <Text style={{ color: '#FFFFFF' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal isVisible={showModalTwo} backdropOpacity={0.7}>
    <View style={styles.modalContent}>
      <Text style={styles.messageText}>
        If you Click Yes you will send {balance} To {contact.firstName} {contact.lastName}?
      </Text>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendMessageTwo}
      >
        <Text style={styles.sendButtonText}>Yes!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={hideModalTwo}>
        <Text style={styles.cancelText}>Rather Not </Text>
      </TouchableOpacity>
    </View>
  </Modal>
          {balance && (
  <Modal isVisible={showModal} backdropOpacity={0.7}>
    <View style={styles.modalContent}>
      <Text style={styles.messageText}>
        Are you sure you want to request for {balance} from {contact.firstName} {contact.lastName}?
      </Text>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendMessage}
      >
        <Text style={styles.sendButtonText}>Yes!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={hideModal}>
        <Text style={styles.cancelText}>Changed my Mind</Text>
      </TouchableOpacity>
    </View>
  </Modal>
)}
        </KeyboardAvoidingView>
      );
      
}


const styles = StyleSheet.create({
    container: {
        marginTop:30,
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#EFEFEF',
    },
    incomingMessageContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'flex-start', // Align messages to the left
        maxWidth: '60%', // Set maximum width to 40%
  
      },
    
      incomingMessageText: {
        backgroundColor: '#007BFF', // Blue background for incoming messages
        color: '#FFFFFF', // Text color for incoming messages
        padding: 10,
        borderRadius: 8,
        marginBottom: 8, // Add some space between messages
      },
    
      timeIndicator: {
        alignSelf: 'flex-end', // Align the time to the bottom right
        color: '#555555',
      },
    sentMessages: {
      padding: 16,
      justifyContent: 'flex-end',
    },
    writeMessage: {
      bottom: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#EFEFEF',
    },
      outgoingMessageContainer: {
    alignSelf: 'flex-end', // Align outgoing messages to the right
    backgroundColor: '#DCF8C6', // Some background color for outgoing messages
    maxWidth: '60%', // Set maximum width to 60%
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },

  outgoingMessageText: {
    color: '#000000', // Text color for outgoing messages
  },
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
    color: 'red',
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
  });
  export default messages
