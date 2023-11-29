import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface TProps {
  setIcon: (text: string) => void;
}

const SelectIcons = () => {
  const [press, setPress] = useState<boolean>(false);
  const [selected, setSelected] = useState();
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Pressable
        style={press ? [styles.input, styles.bgGray] : styles.input}
        onPress={() => setModal(true)}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
      >
        <View style={styles.wrap}>
          <Text style={styles.text}>Select Icon </Text>
          <Ionicons name="add-circle-outline" size={20} color="gray" />
        </View>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <Text>Select Icon</Text>
            <View>
              <Ionicons name="add-circle-outline" size={20} color="gray" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectIcons;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 40,
    borderColor: "#000000",
    borderWidth: 0.2,
    borderRadius: 5,
  },
  bgGray: {
    backgroundColor: "#e9ecef",
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  text: {
    color: "gray",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
  },
});
