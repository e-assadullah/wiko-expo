import { StyleSheet } from "react-native";
import React from "react";
import AddEndpointHeader from "../../components/modules/AddEndpointScreen/AddEndpointHeader";
import InputEndpoint from "../../components/modules/AddEndpointScreen/InputEndpoint";
import { View } from "../../components/Themed";

type Props = {
  id: string | string[];
};

const AddEndpointScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <AddEndpointHeader id={props.id} />
      <InputEndpoint id={props.id} />
    </View>
  );
};

export default AddEndpointScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
