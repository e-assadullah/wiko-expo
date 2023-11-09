import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import WifiScreen from "../../screen/WifiScreen/WifiScreen";
import { View } from "../../components/Themed";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <WifiScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
