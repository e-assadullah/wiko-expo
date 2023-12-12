import { Alert, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text } from "../../Themed";
import ButtonsIcons from "../../common/ButtonsIcons";
import { router } from "expo-router";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";

type TProps = {
  id: string | string[];
};

const ListDevice = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [device, setDevice] = useState<any[]>([]);
  const [wifi, setWifi] = useState<any[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM device WHERE wifi_id = ${props.id}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setDevice(temp);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM wifi WHERE id = ${props.id as string}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setWifi(temp);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  }, []);

  const deleteDevice = (id: string | number) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM device WHERE id = ${id}`,
        undefined,
        (txObj, resultSet) => {},
        (txObj, error) => {
          console.log(error);
          showToast("error: " + error.message, "error");
          return false;
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM endpoint WHERE device_id = ${id} AND wifi_id = ${props.id}`,
        undefined,
        (txObj, resultSet) => {},
        (txObj, error) => {
          console.log(error);
          showToast("error: " + error.message, "error");
          return false;
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE wifi SET devices_count = ? WHERE id = ${props.id}`,
        [wifi[0].devices_count - 1],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            showToast("success", "success");
            router.replace(`/wifi/${props.id}`);
          }
        }
      );
    });
  };

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

  const showDialogDeleteDevice = (id: string | number) => {
    return Alert.alert(
      "Delete Device",
      "Are you sure you want to delete this device and all endpoint with this device?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteDevice(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.wrap}>
      <Text style={{ fontWeight: "500", fontSize: 20 }}>List Device</Text>
      <FlatList
        data={device}
        keyExtractor={(d) => d.id}
        renderItem={(d) => (
          <View style={styles.container}>
            <Text>
              {d.item.name} ({d.item.base_ip})
            </Text>
            <ButtonsIcons
              icon="ios-trash"
              size={15}
              color="red"
              onAction={() => showDialogDeleteDevice(d.item.id)}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Text style={styles.textCenter}>There is no device</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListDevice;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0.2,
    borderRadius: 3,
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginVertical: 10,
  },
  textCenter: {
    textAlign: "center",
    width: "100%",
  },
});