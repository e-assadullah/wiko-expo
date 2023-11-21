import { StyleSheet } from "react-native";
import React from "react";
import { View } from "../../components/Themed";
import AddFunctionHeader from "../../components/modules/AddFunctionScreen/AddFunctionHeader";
import InputFunction from "../../components/modules/AddFunctionScreen/InputFunction";

type TProps = {
  id: string | string[];
};

const AddFunctionScreen = (props: TProps) => {
  return (
    <View style={styles.container}>
      <AddFunctionHeader id={props.id} />
      <InputFunction id={props.id} />
    </View>
  );
};

export default AddFunctionScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
