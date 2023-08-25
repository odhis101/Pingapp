import React, { useEffect, useState } from "react";
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
} from "react-native";
import BackgroundImage from "../assets/background.png";
import Topnav from "../components/Topnav/Topnav";
import SendMoney from "../components/SendMoney/SendMoney";
import Mycards from "../components/Mycards/Mycards";
import Profile from "../assets/profile.png";
import RecentTransactions from "../components/RecentTransactions/RecentTransactions";
import TransactionsRadio from "../components/TransactionsRadio/TransactionsRadio";
import { AntDesign } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import getEnvVars from "../.env.js"
const Contacts = () => {
  const { API_URL } = getEnvVars();

  const navigation = useNavigation();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const route = useRoute();
  let sendMoney = route.params.sendMoney;

  const fetchContactIds = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/contacts/get_contact`);
      const { data } = response;
  
      if (data.status === 'ok') {
        setContactsData(data.data.contactItems); // Store the list of contact IDs in state
      } else {
        console.error('Failed to fetch contact IDs:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching contact IDs:', error);
    }
  };
  
  // Call fetchContactIds when the component mounts
  useEffect(() => {
    fetchContactIds();
    console.log(contactsData)
  }, []);


  const handlePress = () => {
    navigation.navigate('AmountToSend', {
      selectedContacts: selectedContacts,
      sendMoney: sendMoney,

    });
  };
  /*
  const contactsData = [
    { name: "John Doe", date: "15/04/23", isSelected: false, email:"joshodhiambo5@gmail.com", phoneNumber:"0703757369" },
    { name: "asds Doe", date: "15/04/23", isSelected: false,email:"joshodh5@gmail.com", phoneNumber:"0703757368" },
    { name: "Chris Evans", date: "12/04/23", isSelected: true ,email:"josh12@gmail.com", phoneNumber:"0703757367" },
    // Add more data items as needed...
  ];
  */
  const handleContactPress = (contactName, isSelected,contact) => {
    console.log("this is contact ",contact)
    //useffect to test contact

    if (isSelected) {
      setSelectedContacts((prevSelectedContacts) =>
        [...prevSelectedContacts,contact]
      );
    } else {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((name) => name !== contactName)
      );
    }
  };
  // useffect to see changes if selected contact changes 
  React.useEffect(() => {
    console.log("Selected contacts: ", selectedContacts);
  }, [selectedContacts]);
  
  const sortContactsByName = (contacts) => {
    // Sorting contacts by name
    console.log(contacts)
    const sortedContacts = contacts.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
      const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });


    const sortedContactsByLetter = sortedContacts.reduce((acc, contact) => {
      const firstLetter = `${contact.firstName} ${contact.lastName}`.charAt(0).toUpperCase();
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

  return (
    <View style={styles.container}>
      <View style={styles.contactContainer}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundImage}
        >
          <Topnav />
          <View style={styles.contactFlex}>
            <Text style={styles.contactText}>Contact</Text>

            <TouchableOpacity 
            style={styles.doneButton}
            onPress={handlePress}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="white"
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
          data={sortedContactData}
          keyExtractor={(item) => item.letter}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.sectionHeader}>{item.letter}</Text>
              {item.contacts.map((contact) => (
                <TransactionsRadio
                key={contact.name}
                name={`${contact.firstName} ${contact.lastName}`}
                date={contact.date}
                lastMessage={contact.lastMessage}
                isSelected={contact.isSelected}
                time={contact.time}
                onPress={handleContactPress}
                contactDetails = {contact}

                />
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 800,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
  contactContainer: {
    height: "40%",

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden", // This ensures the content inside is clipped to the rounded shape
  },
  contactFlex: {
    marginTop: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },

  ContactContainer: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  contactText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  doneButton: {
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  doneButtonText: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    marginTop: 40,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
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

export default Contacts;
