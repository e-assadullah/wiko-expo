import { StyleSheet, Image, Pressable } from "react-native";

import React from "react";

import { View, Text } from "../../Themed";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./logo-app.png")} />
      <View>
        <Text style={styles.textBold}>Hello There...</Text>
        <Text>This is your wifi assistant</Text>
      </View>
      <Link replace href={"/info"} asChild>
        <Pressable>
          <Ionicons name="information-circle-outline" size={20} color="black" />
        </Pressable>
      </Link>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    borderRadius: 15,
    marginTop: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    width: 43,
    height: 40,
    marginVertical: "auto",
  },
  textBold: {
    fontWeight: "500",
    fontSize: 20,
  },
});
