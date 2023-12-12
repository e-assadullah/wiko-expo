import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import PlatformSettingScreen from "../../screen/PlatformSettingScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <PlatformSettingScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
