import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  id: string | string[];
};

const AddDeviceHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.replace(`/wifi/${props.id as string}`)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text style={styles.textHead}>Add new device</Text>
    </View>
  );
};

export default AddDeviceHeader;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHead: {
    fontSize: 20,
    fontWeight: "500",
  },
});
