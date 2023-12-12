import { Alert, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";
import ButtonsIcons from "../../common/ButtonsIcons";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";
import { router } from "expo-router";

type TProps = {
  id: string | string[];
};

const ListEndpoint = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [endpoint, setEndpoint] = useState<any[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM endpoint WHERE wifi_id = ${props.id}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setEndpoint(temp);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  }, []);

  const deleteEndpoint = (id: string | number) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM endpoint WHERE id = ${id}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rowsAffected) {
            router.replace(`/wifi/${props.id}`);
          }
        },
        (txObj, error) => {
          console.log(error);
          showToast("error: " + error.message, "error");
          return false;
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

  const showDialogDeleteEndpoint = (id: string | number) => {
    return Alert.alert(
      "Delete Endpoint",
      "Are you sure you want to delete this endpoint ?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteEndpoint(id);
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
      <Text style={{ fontWeight: "500", fontSize: 20 }}>List Endpoint</Text>
      <FlatList
        data={endpoint}
        keyExtractor={(d) => d.id}
        renderItem={(d) => (
          <View style={styles.container}>
            <Text>
              {d.item.name} ({"http://" + d.item.base_ip + d.item.value_primary}
              )
            </Text>
            <ButtonsIcons
              icon="ios-trash"
              size={15}
              color="red"
              onAction={() => showDialogDeleteEndpoint(d.item.id)}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Text style={styles.textCenter}>There is no endpoint</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListEndpoint;

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
  },
  textCenter: {
    textAlign: "center",
    width: "100%",
  },
});
