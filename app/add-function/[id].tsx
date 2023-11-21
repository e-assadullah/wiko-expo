import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import AddFunctionScreen from "../../screen/AddFunctionScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <AddFunctionScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
