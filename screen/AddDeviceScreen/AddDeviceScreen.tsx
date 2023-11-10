import { StyleSheet, View } from "react-native";
import React from "react";
import AddDeviceHeader from "../../components/modules/AddDevice/AddDeviceHeader";
import InputDevice from "../../components/modules/AddDevice/InputDevice";

type Props = {
  id: string | string[];
};

const AddDeviceScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <AddDeviceHeader />
      <InputDevice {...props} />
    </View>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
