import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import { router } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import ButtonsIcons from "../../common/ButtonsIcons";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";
import { IPlatform } from "../AddPlatformScreen/InputPlatform";

type TProps = {
  id: string | string[];
};

const ListFunction = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [func, setFunc] = useState<any[]>();
  const [platform, setPlatform] = useState<IPlatform>({
    id: "",
    name: "",
    platform: "",
    icons: "",
    token: "",
    function_count: 0,
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM function WHERE platform_id = ${props.id}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setFunc(temp);
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
        `SELECT * FROM platform WHERE id = ${props.id}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            console.log(temp[0]);
            return setPlatform(temp[0]);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  }, []);

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

  const deletePlatform = (id: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM function WHERE id = ${id}`,
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
        `UPDATE platform SET function_count = ? WHERE id = ${props.id}`,
        [platform.function_count - 1],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            showToast("success", "success");
            console.log(platform);
            router.replace(`/platform/${props.id}`);
          }
        }
      );
    });
  };

  const showDialogDeletePlatform = (id: string) => {
    return Alert.alert(
      "Delete Device",
      "Are you sure you want to delete this device and all endpoint with this device?",
      [
        {
          text: "Yes",
          onPress: () => {
            deletePlatform(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.header}>
      <Text style={styles.textHeader}>List Function</Text>
      <FlatList
        data={func}
        keyExtractor={(d) => d.id}
        renderItem={(d) => (
          <View style={styles.container}>
            <Text>
              {d.item.name} ({d.item.mode})
            </Text>
            <ButtonsIcons
              icon="ios-trash"
              size={15}
              color="red"
              onAction={() => showDialogDeletePlatform(d.item.id)}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Text style={styles.textCenter}>
              There is no Function in this platform
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListFunction;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: 15,
    gap: 15,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
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
