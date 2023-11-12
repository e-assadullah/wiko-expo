import { Button, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";

type Props = {
  id: string | string[];
};

type TData = {
  id: number;
  nameEndpoint: string;
  baseIp: string;
  mode: string;
  valuePrimary: string;
  valueSecondary: string | null;
};

const InputEndpoint = (props: Props) => {
  const db = SQLite.openDatabase("database.db");

  const emptyData: TData = {
    id: 0,
    nameEndpoint: "",
    baseIp: "",
    mode: "",
    valuePrimary: "",
    valueSecondary: "",
  };

  const [data, setData] = useState<TData>(emptyData);

  const [dbDataDevice, setDbDataDevice] = useState<any[]>([]);
  const [dbDataEndpoint, setDbDataEndpoint] = useState<any[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS endpoint (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, base_ip TEXT, mode TEXT, value_primary TEXT, value_secondary TEXT )`
      );
    });

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
            return setDbDataDevice(temp);
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
        `SELECT * FROM endpoint`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setDbDataEndpoint(temp);
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
        `INSERT INTO endpoint (id, name, base_ip, mode, value_primary, value_secondary) VALUES (null, ?, ?, ?, ? ,?)`,
        [
          data.nameEndpoint,
          data.baseIp,
          data.mode,
          data.valuePrimary,
          data.valueSecondary?.length ? data.valueSecondary : null,
        ],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            setData(emptyData);
            router.replace(`/wifi/${props.id}`);
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
        `DELETE FROM endpoint WHERE id = ?`,
        [id],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            router.replace(`/add-endpoint/${props.id}`);
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
    if (dbDataEndpoint?.length) {
      return dbDataEndpoint?.map((data: any, i) => {
        return (
          <View key={data.id} style={styles.showData}>
            <Text>{data.name}</Text>
            <Text>{"http://" + data.base_ip + data.value_primary}</Text>
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

  const optionMode = [
    { key: "1", value: "button" },
    { key: "2", value: "switch" },
    { key: "3", value: "monitoring" },
    { key: "4", value: "input" },
  ];

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Name endpoint"
        value={data?.nameEndpoint}
        onChangeText={(nameEndpoint) =>
          setData((prev): TData => {
            return { ...prev, nameEndpoint };
          })
        }
      />
      <SelectList
        setSelected={(val: any) =>
          setData((prev): TData => {
            return { ...prev, baseIp: val };
          })
        }
        data={dbDataDevice.map((data) => {
          return {
            key: data.base_ip,
            value: data.name,
          };
        })}
        save="key"
        placeholder="Select device"
        boxStyles={styles.inputBox}
      />
      <SelectList
        setSelected={(val: any) =>
          setData((prev): TData => {
            return { ...prev, mode: val };
          })
        }
        data={optionMode}
        save="value"
        placeholder="Select mode"
        boxStyles={styles.inputBox}
      />
      <TextInput
        style={styles.input}
        placeholder="Path 1 e.g /led/0"
        value={data?.valuePrimary}
        onChangeText={(valuePrimary) =>
          setData((prev): TData => {
            return { ...prev, valuePrimary };
          })
        }
      />
      <TextInput
        style={styles.inputDisable}
        placeholder="Path 2"
        value={data?.valueSecondary as string}
        onChangeText={(valueSecondary) =>
          setData((prev): TData => {
            return { ...prev, valueSecondary };
          })
        }
        editable={false}
      />
      {data.baseIp && (
        <View style={styles.showData}>
          <View>
            <Text style={styles.textHeader}>Endpoint 1</Text>
            <Text>{data.baseIp + data.valuePrimary}</Text>
          </View>
          {data.valueSecondary?.length ? (
            <View>
              <Text style={styles.textHeader}>Endpoint 2</Text>
              <Text>{data.baseIp + data.valueSecondary}</Text>
            </View>
          ) : (
            ""
          )}
        </View>
      )}
      <Button title="Add Endpoint" onPress={() => addData()} />
      <View style={{ marginTop: 20 }}>{showDb()}</View>
    </View>
  );
};

export default InputEndpoint;

const styles = StyleSheet.create({
  textHeader: {
    fontWeight: "500",
  },
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
    borderWidth: 0.5,
    borderRadius: 5,
  },
  inputDisable: {
    padding: 10,
    height: 40,
    borderColor: "#000000",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#e9ecef",
  },
  inputBox: {
    borderColor: "#000000",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dropdownWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
});
