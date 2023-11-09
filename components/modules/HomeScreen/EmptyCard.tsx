import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";

const EmptyCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSemi}>There is no wifi interface!</Text>
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    minWidth: "100%",
  },
  textSemi: {
    fontWeight: "500",
  },
});
