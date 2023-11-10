import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import AddDeviceScreen from "../../screen/AddDeviceScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <AddDeviceScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
