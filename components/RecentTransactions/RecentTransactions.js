import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native"
import Profile from "../../assets/Reject.png"

const RecentTransactions = ({ name, date, amount, negative, image }) => {
  console.log(name)
  return (
    <View className='flex flex-row items-center justify-between'>
      <View className='flex flex-row items-center my-2'>
        <Image source={image} className='h-12 w-12 rounded-full' />
        <View style={styles.textContainer}>
          <Text className='text-base'>{name}</Text>
          <Text className='text-[#06672B] text-sm'>{date}</Text>
        </View>
      </View>
      <Text className='text-[#06672B] text-xl'>
        {negative ? "-" : ""} £ {amount}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  MyTransactions: {
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  Transactiontitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  TransactionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  recents: {
    // ... styles for recents button ...
  },
  TransactionDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  image: {
    // ... styles for image ...
  },
  textContainer: {
    marginLeft: 8,
  },
  Username: {
    // ... styles for Username ...
  },
  Date: {
    // ... styles for Date ...
  },
  TransactionAmt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00FF00",
    marginLeft: "auto",
  },
})
export default RecentTransactions
