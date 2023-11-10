import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";

const EndpointContainer = () => {
  return (
    <View style={styles.container}>
      <Text>EndpointContainer</Text>
    </View>
  );
};

export default EndpointContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    marginTop: 5,
  },
});
