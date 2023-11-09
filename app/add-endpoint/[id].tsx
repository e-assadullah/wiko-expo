import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "../../components/Themed";
import AddEndpointScreen from "../../screen/AddEndpointScreen";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <AddEndpointScreen id={id} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
