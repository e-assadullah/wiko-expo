import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import WifiSettingScreen from "../../screen/WfiSettingScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <WifiSettingScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
