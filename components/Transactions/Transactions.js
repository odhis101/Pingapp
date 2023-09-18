import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from "react-native"
import Profile1 from "../../assets/img1.jpg"
import Profile2 from "../../assets/img2.jpg"
import Profile3 from "../../assets/img3.jpg"
import RecentTransactions from "../RecentTransactions/RecentTransactions"
import { colors } from "../../Colors"
const Transactions = () => {
  return (
    <View>
      <Text style={styles.Transactiontitle}>Transactions</Text>
      <View style={styles.TransactionsContainer}>
        <TouchableOpacity style={styles.recents}>
          <Text>Sort by recents</Text>
        </TouchableOpacity>

        <RecentTransactions
          name='Benard Ogutu'
          negative={false}
          date={"8/18/23"}
          amount={700}
          image={Profile1}
        />
        <RecentTransactions
          name='Joshua Odhiambo'
          negative={false}
          date={"8/10/23"}
          amount={400}
          image={Profile2}
        />
        <RecentTransactions
          name='Arthur Oyugi'
          negative={true}
          date={"7/01/23"}
          amount={200}
          image={Profile3}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you want to stretch the image
  },
  currencyContainer: {
    height: "100%",

    // ... other styles for background image or color
  },
  MyTransactions: {
    height: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    // ... other styles for MyTransactions container
  },
  infoContainer: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 14,
    color: colors.textColor,
  },
  currentBalance: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 42,
    color: colors.textColor,
    marginRight: 8,
  },
  balance: {
    fontSize: 42,
    color: colors.textColor,
  },
  recentTransactions: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 8,
  },
  moneyButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  Mycards: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  Mycard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "15%",
  },
  cardIcon: {
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
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
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    color: colors.textColor,
    marginLeft: 16,
  },
  TransactionsContainer: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
})
export default Transactions
