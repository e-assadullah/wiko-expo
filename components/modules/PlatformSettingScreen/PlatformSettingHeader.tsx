import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type TProps = {
  id: string | string[];
};

const PlatformSettingHeader = (props: TProps) => {
  return (
    <View style={styles.header}>
      <Link replace href={`/platform/${props.id}`} asChild>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </Link>
      <Text style={styles.textHeader}>Setting Platform</Text>
    </View>
  );
};

export default PlatformSettingHeader;

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
