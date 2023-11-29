import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "../../Themed";

const PlatformHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Platform IOT</Text>
      <Link href="/add-platform" asChild>
        <Pressable>
          <View style={styles.button}>
            <Ionicons name="add-circle" size={24} color="black" />
            <Text style={styles.textAdd}>Add Platform</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default PlatformHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textAdd: {
    fontWeight: "500",
  },
});
