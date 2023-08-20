import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
  } from "react-native";import React from 'react'
  import BackgroundImage from "../assets/background.png";
  import Topnav from "../components/Topnav/Topnav";
  import { AntDesign } from "@expo/vector-icons";
  import {useNavigation} from '@react-navigation/native';
  import Logo from "../assets/logo.png";
  import Icon from 'react-native-vector-icons/Ionicons'; // Import the appropriate icon set
  import TransactionsRadio from "../components/ContactList/ContactList";
  import { useState, useEffect,useRef } from 'react';
  import axios from "axios";

const messages = () => {
    const navigation = useNavigation();
  // an endpoint that gets and returns contactId 
const getContactId = async () => {
  try {
    const response = await axios.get('https://15c0-196-207-134-81.ngrok-free.app/api/v1/contacts/get_contact');
    const { data } = response;
    console.log(data)

    if (data.status === 'ok') {
      return data.data.contactItems; // Return the list of contact IDs
    } else {
      console.error('Failed to fetch contact IDs:', data.message);
      return [];
    }
  } catch (error) {
    console.error('An error occurred while fetching contact IDs:', error);
    return [];
  }
};



    const contactPress = (contact) => {
      console.log(contact)
      navigation.navigate('Chatmessages',{contact:contact, id:getContactId});
        
      }
      const handlePress = () => {
        console.log("joshua ")
      }
      const [searchQuery, setSearchQuery] = useState("");



      const contactsData = [
        { name: "John Doe", date: "15/04/23", isSelected: false, email:"joshodhiambo5@gmail.com", phoneNumber:"0703757369",id:getContactId },
        { name: "John Doe", date: "ping 400$", time:"9:30", isSelected: false },
        { name: "Alice Johnson", date: "14/04/23",time:"9:30", isSelected: true },
        { name: "Alice Johnson", date: "14/04/23",time:"9:30", isSelected: true },
        { name: "Bob Smith", date: "13/04/23",time:"9:30", isSelected: false },
        { name: "Chris Evans", date: "12/04/23",time:"9:30", isSelected: true },

        // Add more data items as needed...
      ];
      const sortContactsByName = (contacts) => {
        // Sorting contacts by name
        const sortedContacts = contacts.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
   

        // Grouping contacts by first letter
        const sortedContactsByLetter = sortedContacts.reduce((acc, contact) => {
          const firstLetter = contact.name.charAt(0).toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(contact);
          return acc;
        }, {});
    
        return Object.entries(sortedContactsByLetter).map(([letter, contacts]) => ({
          letter,
          contacts,
        }));
      };
      
      
      
    
      const sortedContactData = sortContactsByName(contactsData);
      
      const filteredSortedContactData = sortedContactData.map(({ letter, contacts }) => ({
        letter,
        contacts: contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }));
    
  return (
    <View style={styles.container}>
        <View style={styles.contactContainer}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >         
        <View style={styles.headerContainer}>
          <Image source={Logo} style={styles.logoImage} />
          <Text style={styles.messagesHeaderText}>Messagess</Text>
          <TouchableOpacity onPress={handlePress}>
            <Icon name="ios-create" size={30} color="white" />
          </TouchableOpacity>
        </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="white"
              onChangeText={text => setSearchQuery(text)}

            />
            <AntDesign
              name="search1"
              size={24}
              color="white"
              style={styles.searchIcon}
            />
          </View>
        </ImageBackground>
        </View>
        <View style={styles.container}>
        <FlatList
          data={filteredSortedContactData}
          keyExtractor={(item) => item.letter}
          renderItem={({ item }) => (
            <View>
              {item.contacts.map((contact) => (
                  <TouchableOpacity
                  key={contact.name}
                  onPress={() => contactPress(contact)}
                 
                >
                <TransactionsRadio
                  key={contact.name}
                  name={contact.name}
                  date={contact.date}
                  lastMessage={contact.lastMessage}
                  isSelected={contact.isSelected}
                  time={contact.time}
                />
            </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>


    </View>
  )
}

export default messages

const styles = StyleSheet.create({
    container: {
      height: 800,
    },

    backgroundImage: {
      flex: 1,
      resizeMode: "cover", // or 'stretch' if you want to stretch the image
    },
    headerContainer: {

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
        paddingHorizontal: 20,
      },
      logoImage: {
        height: 40,
        width: 40,
        resizeMode:'contain',
      },
      messagesHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
      },
    contactContainer: {
      height: "20%",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden", // This ensures the content inside is clipped to the rounded shape
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 40, // Adjust this value to move the header down
    },
    contactFlex: {
      marginTop: "10%",
     marginRight:'5%',
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'space-between'

    },
  
    ContactContainer: {
      backgroundColor: "blue",
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    contactText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  
  
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
      },
    searchInput: {
      flex: 1,
      color: "white",
      fontSize: 16,
      paddingVertical: 10,
    },
    searchIcon: {
      marginLeft: 10,
    },
    sectionHeader: {
      fontSize: 20,
      marginLeft: "5%",
      color: "#5087D3",
    },
  });