import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";

type TProps = {
  icon: string;
  size: number;
  color: string;
  onAction: () => void;
};

const ButtonsIcons = (props: TProps) => {
  const styles = StyleSheet.create({
    container: {
      padding: 5,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: props.color,
    },
  });

  return (
    <Pressable onPress={() => props.onAction()}>
      <View style={styles.container}>
        <Ionicons name={props.icon} size={props.size} color={props.color} />
      </View>
    </Pressable>
  );
};

export default ButtonsIcons;
