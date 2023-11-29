import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { IPlatform } from "../AddPlatformScreen/InputPlatform";

const CardPlatform = (props: IPlatform) => {
  return (
    <Link href={`/platform/${props.id}`} asChild>
      <Pressable>
        <View style={styles.container}>
          <View style={styles.icons}>
            <Ionicons
              name={props.icons || "ios-home"}
              size={22}
              color="black"
            />
            <Ionicons name="ios-git-network-outline" size={22} color="black" />
          </View>
          <View>
            <Text style={styles.textHeadline}>{props.name}</Text>
            <Text style={styles.textCenter}>{props.platform}</Text>
          </View>
          <View style={styles.devices}>
            <Ionicons name="code-working-outline" size={20} color="black" />
            <Text>{props.function_count} function</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default CardPlatform;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    height: 150,
    width: 130,
    marginVertical: 4,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 5,
  },
  textHeadline: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  devices: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
