import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../../components/Themed";
import PlatformSettingHeader from "../../components/modules/PlatformSettingScreen/PlatformSettingHeader";
import PlatformInformation from "../../components/modules/PlatformSettingScreen/PlatformInformation";

type TProps = {
  id: string | string[];
};

const PlatformSettingScreen = (props: TProps) => {
  return (
    <View style={styles.container}>
      <PlatformSettingHeader id={props.id} />
      <PlatformInformation />
    </View>
  );
};

export default PlatformSettingScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
