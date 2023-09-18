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
} from "react-native"
import React from "react"
import BackgroundImage from "../assets/open.png"
import Topnav from "../components/Topnav/Topnav"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Logo from "../assets/logo.png"
import Icon from "react-native-vector-icons/Ionicons" // Import the appropriate icon set
import TransactionsRadio from "../components/ContactList/ContactList"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import getEnvVars from "../.env.js"

const Messages = () => {
  const navigation = useNavigation()
  // an endpoint that gets and returns contactId
  const { API_URL } = getEnvVars()
  const [contactsData, setContactsData] = useState([])

  const fetchContactIds = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/contacts/get_contact`)
      const { data } = response

      if (data.status === "ok") {
        setContactsData(data.data.contactItems) // Store the list of contact IDs in state
      } else {
        console.error("Failed to fetch contact IDs:", data.message)
      }
    } catch (error) {
      console.error("An error occurred while fetching contact IDs:", error)
    }
  }

  // Call fetchContactIds when the component mounts
  useEffect(() => {
    fetchContactIds()
    console.log(contactsData)
  }, [])

  const contactPress = async (contact) => {
    console.log(contact)
    console.log("this is contact from messages ", contact)
    navigation.navigate("Chatmessages", { contact: contact, contactsData })
  }
  const handlePress = () => {
    console.log("joshua ")
  }
  const [searchQuery, setSearchQuery] = useState("")

  /*
      const contactsData = [
        {
          "email": "benardogutu@gmail.com",
          "firstName": "Ben",
          "id": "64e283552df6ac93a1baafd8",
          "lastName": "Ogutu",
          "phoneNumber": "+254745021809",
          "username": "Lethal"
        }
        // ... other contact objects ...
      ];

    */
  const sortContactsByName = (contacts) => {
    // Sorting contacts by name
    const sortedContacts = contacts.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toUpperCase()
      const nameB = `${b.firstName} ${b.lastName}`.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })

    const sortedContactsByLetter = sortedContacts.reduce((acc, contact) => {
      const firstLetter = `${contact.firstName} ${contact.lastName}`
        .charAt(0)
        .toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(contact)
      return acc
    }, {})

    return Object.entries(sortedContactsByLetter).map(([letter, contacts]) => ({
      letter,
      contacts,
    }))
  }
  const sortedContactData = sortContactsByName(contactsData)

  const filteredSortedContactData = sortedContactData.map(
    ({ letter, contacts }) => ({
      letter,
      contacts: contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    })
  )

  return (
    <View className='bg-[#FEFAF4]'>
      <ImageBackground source={BackgroundImage}>
        <View className='bg-gradient-to-tr from-[#A77835] to-[#FCF7A8] my-4'>
          <View style={styles.headerContainer}>
            <Image source={Logo} className='w-[26px] h-[26px]' />
            <Text className='text-white text-lg'>Messages</Text>
            <TouchableOpacity onPress={handlePress}>
              <Icon name='ios-create' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <View className='flex flex-row py-2 px-4 bg-white items-center justify-between rounded-lg mx-4 my-4'>
            <TextInput
              className='bg-white text-[#AB7D3A] flex items-center '
              placeholder='Search'
              placeholderTextColor='#AB7D3A'
              onChangeText={(text) => setSearchQuery(text)}
            />
            <AntDesign
              name='search1'
              size={24}
              color='#AB7D3A'
              // style={styles.searchIcon}
            />
          </View>
        </View>
      </ImageBackground>
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
                  className='text-[#B1843D]'>
                  <TransactionsRadio
                    key={contact.name}
                    name={`${contact.firstName} ${contact.lastName}`}
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

export default Messages

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
    resizeMode: "contain",
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
    marginRight: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
})
