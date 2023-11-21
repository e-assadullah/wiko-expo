import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  id: string | string[];
};

const AddFunctionHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <Link replace href={`/platform/${props.id}`} asChild>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </Link>
      <Text style={styles.textHeader}>Add new function</Text>
    </View>
  );
};

export default AddFunctionHeader;

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
