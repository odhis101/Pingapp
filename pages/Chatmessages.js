import { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';
import Profile from "../assets/profile.png";
import Icon from 'react-native-vector-icons/Ionicons'; // If you're using react-native-vector-icons
import { useRoute } from '@react-navigation/native';

const messages = () => {
  const route = useRoute();
  const { contact,id } = route.params;

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
    

      const [allMessages, setAllMessages] = useState([]);

      // Simulate fetching messages from the backend
      useEffect(() => {
        // Replace this with your actual backend API endpoint
        const backendAPIEndpoint = 'https://your-backend-api.com/messages';
    
        // Function to fetch messages from the backend API
        const fetchMessagesFromBackend = async () => {
          try {
            // Simulate API response with dummy data
            const dummyData = [
              {
                text: 'Hi, how are you?',
                time: '2023-08-03T12:34:00',
                isOutgoing: false,
              },
              {
                text: 'Sure, I completed the project yesterday.',
                time: '2023-08-03T14:35:00',
                isOutgoing: true,
              },
              {
                text: 'Sure, I completed the project yesterday.',
                time: '2023-08-03T14:35:00',
                isOutgoing: false,
              },
              // Add more messages as needed
            ];
    
            // Simulate API response delay using setTimeout
            setTimeout(() => {
              // Sort the messages based on their timestamps in ascending order
              const sortedMessages = dummyData.sort((a, b) => {
                const timeDifference = new Date(a.time) - new Date(b.time);
                if (timeDifference === 0) {
                  // If the timestamps are the same, sort outgoing messages before incoming messages
                  return a.isOutgoing ? -1 : 1;
                }
                return timeDifference;
              });
    
              setAllMessages(sortedMessages);
            }, 1000); // Simulate 1 second delay
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        };
    
        fetchMessagesFromBackend();
      }, []);
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
              <Text>{contact.name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={[styles.messageContainer, { flexGrow: 1 }]}>
                {allMessages.map((message, index) => (
                  <View key={index} style={message.isOutgoing ? styles.outgoingMessageContainer : styles.incomingMessageContainer}>
                    <Text style={message.isOutgoing ? styles.outgoingMessageText : styles.incomingMessageText}>{message.text}</Text>
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
              />
              {/* Send icon */}
              <TouchableOpacity style={{ padding: 8, backgroundColor: '#007BFF', borderRadius: 4 }}>
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
