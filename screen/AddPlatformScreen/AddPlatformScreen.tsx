import { StyleSheet } from "react-native";
import React from "react";
import { View } from "../../components/Themed";
import AddPlatformHeader from "../../components/modules/AddPlatformScreen/AddPlatformHeader";
import InputPlatform from "../../components/modules/AddPlatformScreen/InputPlatform";

const AddPlatformScreen = () => {
  return (
    <View style={styles.container}>
      <AddPlatformHeader />
      <InputPlatform />
    </View>
  );
};

export default AddPlatformScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 26,
    marginTop: 5,
  },
});
