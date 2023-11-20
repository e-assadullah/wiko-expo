import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddPlatformHeader = () => {
  return (
    <View style={styles.header}>
      <Link replace href={"/"} asChild>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </Link>
      <Text style={styles.textHeader}>Add new iot platform</Text>
    </View>
  );
};

export default AddPlatformHeader;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
});
