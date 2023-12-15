import { Alert, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import ButtonsIcons from "../../common/ButtonsIcons";
import { IPlatform } from "../AddPlatformScreen/InputPlatform";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";

type TProps = {
  platform: any;
};

const PlatformInformation = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");

  const [editPlatform, setEditPlatform] = useState<boolean>(false);

  useEffect(() => {
    setDataPlatform(emptyData);
  }, [editPlatform, setEditPlatform]);

  const emptyData: IPlatform = {
    id: "",
    icons: "",
    platform: props.platform?.platform,
    function_count: 0,
    name: props.platform?.name,
    token: props.platform?.token,
  };

  const [dataPlatform, setDataPlatform] = useState<IPlatform>(emptyData);

  const showToast = (text: string, severity: TSeverity) => {
    Toast.show(text, {
      duration: 200,
      position: Toast.positions.BOTTOM - 30,
      animation: true,
      hideOnPress: true,
      backgroundColor: getSeverity(severity),
      textColor: "white",
      opacity: 1,
    });
  };

  const deletePlatform = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM platform WHERE id = ${props.platform.id as string}`,
          undefined,
          (txObj, resultSet) => {
            if (resultSet.rowsAffected) {
              router.replace("/");
            }
          },
          (txObj, error) => {
            console.log(error);
            return false;
          }
        );
      });
    } catch (error: any) {
      showToast(`error: ${error.message}`, "error");
    }
  };

  const showDialogDeletePlatform = () => {
    return Alert.alert(
      "Delete Platform",
      "Are you sure you want to delete this platform?",
      [
        {
          text: "Yes",
          onPress: () => {
            deletePlatform();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const updatePlatform = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE platform SET name = ?, platform = ?, token = ? WHERE id = ${
            props.platform.id as string
          }`,
          [dataPlatform.name, dataPlatform.platform, dataPlatform.token],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected) {
              router.replace(`/platform/${props.platform.id}`);
            }
          },
          (txObj, error) => {
            console.log(error);
            return false;
          }
        );
      });
    } catch (error: any) {
      showToast(`error: ${error.message}`, "error");
    }
  };

  const showDialogUpdatePlatform = () => {
    return Alert.alert(
      "Update Platform",
      "Are you sure you want to update this platform?",
      [
        {
          text: "Yes",
          onPress: () => {
            updatePlatform();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>
          Platform Information
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <ButtonsIcons
            icon={editPlatform ? "ios-close" : "ios-pencil"}
            size={15}
            color={editPlatform ? "red" : "#fcbf49"}
            onAction={() => setEditPlatform((prev) => !prev)}
          />
          {editPlatform && (
            <ButtonsIcons
              icon="ios-checkmark"
              size={15}
              color="green"
              onAction={() => showDialogUpdatePlatform()}
            />
          )}
          <ButtonsIcons
            icon="ios-trash"
            size={15}
            color="red"
            onAction={() => showDialogDeletePlatform()}
          />
        </View>
      </View>
      <View style={{ paddingTop: 10, display: "flex", gap: 5 }}>
        <View style={{ display: "flex", gap: 5 }}>
          <Text>Platform Name :</Text>
          {editPlatform ? (
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={dataPlatform.name}
              onChangeText={(name) =>
                setDataPlatform((prev): IPlatform => {
                  return { ...prev, name };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>{props.platform?.name}</Text>
          )}
        </View>
        <View style={{ display: "flex", gap: 5 }}>
          <Text>From :</Text>
          {editPlatform ? (
            <TextInput
              style={styles.input}
              placeholder="Platform"
              value={dataPlatform.platform}
              onChangeText={(platform) =>
                setDataPlatform((prev): IPlatform => {
                  return { ...prev, platform };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>
              {props.platform?.platform}
            </Text>
          )}
        </View>
        <View style={{ display: "flex", gap: 5 }}>
          <Text>Token :</Text>
          {editPlatform ? (
            <TextInput
              style={styles.input}
              placeholder="Token"
              value={dataPlatform.token}
              onChangeText={(token) =>
                setDataPlatform((prev): IPlatform => {
                  return { ...prev, token };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>{props.platform?.token}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default PlatformInformation;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    paddingHorizontal: 10,
    height: 35,
    width: "100%",
    borderColor: "#000000",
    borderWidth: 0.2,
    borderRadius: 5,
  },
});
