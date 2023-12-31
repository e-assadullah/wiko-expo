import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link replace href="/" style={styles.link}>
          <Ionicons name="md-home" size={50} color="#2e78b7" />
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  linkText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e78b7",
  },
});
