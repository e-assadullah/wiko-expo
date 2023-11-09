import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";

const CardActive = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSemi}>There is no active interface.</Text>
    </View>
  );
};

export default CardActive;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    minHeight: 150,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textSemi: {
    fontWeight: "500",
  },
});
