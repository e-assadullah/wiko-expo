import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import PlatformScreen from "../../screen/PlatformScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <PlatformScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
