import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../Themed";

type TProps = {
  wifi: any;
};

const WifiInformation = (props: TProps) => {
  return (
    <View style={styles.container}>
      <Text>wifi name: {props.wifi?.name}</Text>
      <Text>ssid: {props.wifi?.ssid}</Text>
      {props.wifi?.ip_address && (
        <Text>Ip Address: {props.wifi?.ip_address}</Text>
      )}
    </View>
  );
};

export default WifiInformation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
