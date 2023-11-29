import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "../../Themed";

type Props = {
  id: string | string[];
  name: string;
  devices: number;
};

const WifiHeader = (props: Props) => {
  return (
    <View style={styles.warp}>
      <View style={styles.header}>
        <Link replace href={"/"} asChild>
          <Pressable>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </Link>
        <Text style={styles.textHead}>{props.name}</Text>
        <Link replace href="/" asChild>
          <Pressable>
            <Ionicons name="ios-settings-outline" size={24} color="black" />
          </Pressable>
        </Link>
      </View>
      <View style={styles.header}>
        <Link href={`/add-device/${props.id}`} asChild>
          <Pressable>
            <View style={styles.button}>
              <Ionicons name="add-circle" size={24} color="black" />
              <Text style={styles.textAdd}>Add Device</Text>
            </View>
          </Pressable>
        </Link>
        <Link href={`/add-endpoint/${props.id}`} asChild>
          <Pressable disabled={props.devices === 0}>
            <View
              style={
                props.devices === 0
                  ? [styles.button, styles.onDisable]
                  : styles.button
              }
            >
              <Ionicons name="add-circle" size={24} color="black" />
              <Text style={styles.textAdd}>Add Endpoint</Text>
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default WifiHeader;

const styles = StyleSheet.create({
  warp: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {
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
  onDisable: {
    backgroundColor: "gray",
    opacity: 0.6,
  },
  textAdd: {
    fontWeight: "500",
  },
  textHead: {
    fontSize: 20,
    fontWeight: "500",
  },
});
