import { Alert, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import ButtonsIcons from "../../common/ButtonsIcons";
import { IWifi } from "../HomeScreen/CardInterface";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";

type TProps = {
  wifi: any;
};

const WifiInformation = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");

  const [editWifi, setEditWifi] = useState<boolean>(false);

  useEffect(() => {
    setDataWifi(emptyDataWifi);
  }, [editWifi, setEditWifi]);

  let emptyDataWifi: IWifi = {
    id: 0,
    name: props.wifi?.name,
    ssid: props.wifi?.ssid,
    ipAddress: props.wifi?.ip_address,
    icons: "",
    devices_count: 0,
  };

  const [dataWifi, setDataWifi] = useState<IWifi>(emptyDataWifi);

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

  const deleteWifi = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM wifi WHERE id = ${props.wifi.id as string}`,
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

  const showDialogDeleteWifi = () => {
    return Alert.alert(
      "Delete Wifi",
      "Are you sure you want to delete this wifi?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteWifi();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const updateWifi = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE wifi SET name = ?, ssid = ?, ip_address = ? WHERE id = ${
            props.wifi.id as string
          }`,
          [dataWifi.name, dataWifi.ssid, dataWifi.ipAddress],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected) {
              router.replace(`/wifi/${props.wifi.id}`);
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

  const showDialogUpdateWifi = () => {
    return Alert.alert(
      "Update Wifi",
      "Are you sure you want to update this wifi?",
      [
        {
          text: "Yes",
          onPress: () => {
            updateWifi();
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
          Wifi Information
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <ButtonsIcons
            icon={editWifi ? "ios-close" : "ios-pencil"}
            size={15}
            color={editWifi ? "red" : "#fcbf49"}
            onAction={() => setEditWifi((prev) => !prev)}
          />
          {editWifi && (
            <ButtonsIcons
              icon="ios-checkmark"
              size={15}
              color="green"
              onAction={() => showDialogUpdateWifi()}
            />
          )}
          <ButtonsIcons
            icon="ios-trash"
            size={15}
            color="red"
            onAction={() => showDialogDeleteWifi()}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text>Wifi Name:</Text>
          {editWifi ? (
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={dataWifi.name}
              onChangeText={(name) =>
                setDataWifi((prev): IWifi => {
                  return { ...prev, name };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>{props.wifi?.name}</Text>
          )}
        </View>
        <View>
          <Text>SSID:</Text>
          {editWifi ? (
            <TextInput
              style={styles.input}
              placeholder="SSID"
              value={dataWifi.ssid}
              onChangeText={(ssid) =>
                setDataWifi((prev): IWifi => {
                  return { ...prev, ssid };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>{props.wifi?.ssid}</Text>
          )}
        </View>
        <View>
          <Text>Ip Address:</Text>
          {editWifi ? (
            <TextInput
              style={styles.input}
              placeholder="Ip Address"
              value={dataWifi.ipAddress}
              onChangeText={(ipAddress) =>
                setDataWifi((prev): IWifi => {
                  return { ...prev, ipAddress };
                })
              }
            />
          ) : (
            <Text style={{ fontWeight: "500" }}>{props.wifi?.ip_address}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default WifiInformation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
    padding: 10,
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    padding: 5,
    height: 30,
    width: "100%",
    borderColor: "#000000",
    borderWidth: 0.2,
    borderRadius: 5,
  },
});
