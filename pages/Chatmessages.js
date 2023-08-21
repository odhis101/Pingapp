import { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';
import Profile from "../assets/profile.png";
import Icon from 'react-native-vector-icons/Ionicons'; // If you're using react-native-vector-icons
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';

const messages = () => {
  const route = useRoute();
  const { contact,id } = route.params;
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [incomingMessages, setIncomingMessages] = useState([]);
const [outgoingMessages, setOutgoingMessages] = useState([]);


  console.log(id)
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0; // Adjust the offset as needed

    const handleBackButtonPress = () => {
      // Implement the logic to go back or perform any other actions on back button press
      // For example, you can use React Navigation's navigation.goBack() method to go back
    };
    const handleSendMoneyPress = () => {
      // Add the logic to handle the "send money" action here
      // For example, you can navigate to a payment screen or perform the money transfer operation
      // This function will be executed when the "send money" button is pressed
    };
 // Define two separate state variables for incoming and outgoing messages


// ...

useEffect(() => {
  const newSocket = io('https://27df-196-207-134-81.ngrok-free.app');
  setSocket(newSocket);

  newSocket.on('chat_message', (message) => {
    // Add a timestamp to the incoming message
    const messageWithTimestamp = { ...message, timestamp: new Date().toISOString() };
    setIncomingMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
  });

  return () => {
    newSocket.disconnect();
  };
}, []);


const sendMessage = () => {
  if (socket) {
    const currentTime = new Date().toISOString();
    const newOutgoingMessage = {
      text: inputMessage,
      isOutgoing: true,
      timestamp: currentTime, // Add the timestamp
    };
    socket.emit('chat_message', newOutgoingMessage);
    setOutgoingMessages((prevMessages) => [...prevMessages, newOutgoingMessage]);
    
    setInputMessage('');
  }
};

    


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
            <View style={[styles.messageContainer, { flexGrow: 1 }]}>
  {([...incomingMessages, ...outgoingMessages]).sort((a, b) => a.timestamp.localeCompare(b.timestamp)).map((message, index) => (
    <View
      key={index}
      style={
        message.isOutgoing
          ? styles.outgoingMessageContainer
          : styles.incomingMessageContainer
      }
    >
      <Text
        style={
          message.isOutgoing
            ? styles.outgoingMessageText
            : styles.incomingMessageText
        }
      >
        {message.text}
      </Text>
      <Text style={styles.timeIndicator}>{message.time}</Text>
    </View>
  ))}
</View>
            </ScrollView>
      
            <View style={styles.writeMessage}>
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
      position: 'sticky',
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
  });
  export default messages
