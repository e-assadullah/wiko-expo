import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddEndpointHeader from "../../components/modules/AddEndpointScreen/AddEndpointHeader";
import DevicesModal from "../../components/modules/AddEndpointScreen/DevicesModal";

type Props = {
  id: string | string[];
};

const AddEndpointScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <AddEndpointHeader id={props.id} />
      <Text>AddEndpointScreen {props.id}</Text>
      <DevicesModal />
    </View>
  );
};

export default AddEndpointScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
  },
});
