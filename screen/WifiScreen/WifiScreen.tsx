import { StyleSheet, View } from "react-native";
import React from "react";
import WifiHeader from "../../components/modules/WifiScreen/WifiHeader";
import EndpointContainer from "../../components/modules/WifiScreen/EndpointContainer";

type Props = {
  id: string | string[];
};

const WifiScreen = (props: Props) => {
  const name = "Home";
  return (
    <View style={styles.container}>
      <WifiHeader id={props.id} name={name} devices={1} />
      <EndpointContainer />
    </View>
  );
};

export default WifiScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
