import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Vibration,
} from "react-native";

const PinInput = ({ maxDigits }) => {
  console.log("this is max digits", maxDigits);
  const [pin, setPin] = useState("");

  const handlePinChange = (digit) => {
    if (pin.length < maxDigits) {
      setPin(pin + digit);
    }
    if (pin.length === maxDigits - 1 && pin + digit !== "1234") {
      // Vibrate the phone and turn the pins red
      console.log("should be vibrating");

      Vibration.vibrate();
      setPin(""); // Clear the pin state
      // Add code to update pin color or apply error styling
    }
  };

  const handleClearPin = () => {
    setPin("");
  };
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < maxDigits; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < pin.length ? styles.dotFilled : styles.dotEmpty,
          ]}
        />
      );
    }

    return <View style={styles.dotsContainer}>{dots}</View>;
  };

  return (
    <View style={styles.container}>
      {renderDots()}

      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("1")}
        >
          <Text style={styles.pinText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("2")}
        >
          <Text style={styles.pinText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("3")}
        >
          <Text style={styles.pinText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("4")}
        >
          <Text style={styles.pinText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("5")}
        >
          <Text style={styles.pinText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("6")}
        >
          <Text style={styles.pinText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("7")}
        >
          <Text style={styles.pinText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pinButton]}
          onPress={() => handlePinChange("8")}
        >
          <Text style={styles.pinText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("9")}
        >
          <Text style={styles.pinText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => handlePinChange("0")}
        >
          <Text style={styles.pinText}>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pinButton: {
    marginLeft: "5%",
    marginRight: "5%",
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: "10%",
  },
  pinText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D9195",
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 2,
  },
  dotEmpty: {
    backgroundColor: "#FFFFFF",
    marginLeft: "5%",
  },
  dotFilled: {
    marginLeft: "5%",
    backgroundColor: "#000000",
  },
});

export default PinInput;
