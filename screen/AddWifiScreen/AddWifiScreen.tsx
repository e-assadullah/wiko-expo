import { Button, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import * as SQLite from "expo-sqlite";
import { TextInput } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type TData = {
  id: number;
  name: string;
  ssid: string;
  ipAddress: string;
  icons: string;
};

const AddWifiScreen = () => {
  const db = SQLite.openDatabase("sqlite.db");
  const [loading, setLoading] = useState<boolean>(false);

  const emptyData: TData = {
    id: 0,
    name: "",
    ssid: "",
    ipAddress: "",
    icons: "",
  };

  const [data, setData] = useState<TData>(emptyData);

  const [dbData, setDbData] = useState<any[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS wifi (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ssid TEXT, ip_address TEXT, icons TEXT, devices_count INTEGER)`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM wifi",
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
    setLoading(false);
  }, []);

  const addData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO wifi (id, name, ssid, ip_address, icons, devices_count) VALUES (null, ?, ?, ?, ?, 0)`,
        [data.name, data.ssid, data.ipAddress, data.icons],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            setData(emptyData);
            router.replace("/");
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  };

  const deleteData = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM wifi WHERE id = ?`,
        [id],
        (txObj, resultSet: SQLite.SQLResultSet) => {
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
  };

  const showDb = () => {
    if (dbData?.length) {
      return dbData?.map((data: any, i) => {
        return (
          <View key={data.id} style={styles.showData}>
            <Text>{data.name}</Text>
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link replace href={"/"} asChild>
          <Pressable>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </Link>
        <Text style={styles.textHeader}>Add new wifi interface</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Name wifi"
          value={data?.name}
          onChangeText={(name) =>
            setData((prev): TData => {
              return { ...prev, name };
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Wifi ssid"
          value={data?.ssid}
          onChangeText={(ssid) =>
            setData((prev): TData => {
              return { ...prev, ssid };
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="icons"
          value={data?.icons}
          onChangeText={(icons) =>
            setData((prev): TData => {
              return { ...prev, icons };
            })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Ip address (optional)"
          value={data?.ipAddress}
          onChangeText={(ipAddress) =>
            setData((prev): TData => {
              return { ...prev, ipAddress };
            })
          }
        />
        <Button title="Add Data" onPress={() => addData()} />
      </View>
      <View style={{ marginTop: 20 }}>{showDb()}</View>
    </View>
  );
};

export default AddWifiScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 26,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
  inputWrapper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
