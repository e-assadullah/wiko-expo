import { Button, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";

type Props = {
  id: string | string[];
};

type TData = {
  id: number;
  nameDevice: string;
  ipAddressDevice: string;
  idWifi: number;
};

const InputDevice = (props: Props) => {
  const db = SQLite.openDatabase("database2.db");

  const emptyData: TData = {
    id: 0,
    nameDevice: "",
    ipAddressDevice: "",
    idWifi: parseInt(props.id as string),
  };

  const [data, setData] = useState<TData>(emptyData);

  const [dbData, setDbData] = useState<any[]>([]);

  const [wifi, setWifi] = useState<any[]>([]);

  useEffect(() => {
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

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS device (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, base_ip TEXT, wifi_id INTEGER)`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM device",
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setDbData(temp);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  }, []);

  const addData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO device (id, name, base_ip, wifi_id) VALUES (null, ?, ?, ?)`,
        [data.nameDevice, data.ipAddressDevice, data.idWifi],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
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
        `UPDATE wifi SET devices_count = ? WHERE id = ${data.idWifi}`,
        [wifi[0].devices_count + 1],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            setData(emptyData);
            router.replace(`/add-device/${data.idWifi}`);
          }
        }
      );
    });
  };

  const deleteData = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM device WHERE id = ?`,
        [id],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
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
        `UPDATE wifi SET devices_count = ? WHERE id = ${data.idWifi}`,
        [wifi[0].devices_count - 1],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            router.replace(`/add-device/${data.idWifi}`);
          }
        }
      );
    });
  };

  const showDb = () => {
    if (dbData?.length) {
      return dbData?.map((data: any, i) => {
        return (
          <View key={data.id} style={styles.showData}>
            <Text>{data.name}</Text>
            <Text>{data.wifi_id}</Text>
            <Button
              title="Delete"
              color={"#c1121f"}
              onPress={() => deleteData(data.id)}
            />
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Name device"
        value={data?.nameDevice}
        onChangeText={(nameDevice) =>
          setData((prev): TData => {
            return { ...prev, nameDevice };
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Base ip address"
        value={data?.ipAddressDevice}
        onChangeText={(ipAddressDevice) =>
          setData((prev): TData => {
            return { ...prev, ipAddressDevice };
          })
        }
      />
      <Button title="Add Device" onPress={() => addData()} />
      <View style={{ marginTop: 20 }}>{showDb()}</View>
    </View>
  );
};

export default InputDevice;

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    height: "100%",
  },
  input: {
    padding: 10,
    height: 40,
    borderColor: "#000000",
    borderWidth: 0.2,
    borderRadius: 5,
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
