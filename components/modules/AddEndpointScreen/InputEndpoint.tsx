import { Button, FlatList, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";

type Props = {
  id: string | string[];
};

type TData = {
  id: number;
  nameEndpoint: string;
  baseIp: string;
  idDevice: number;
  mode: string;
  valuePrimary: string;
  valueSecondary: string | null;
};

const InputEndpoint = (props: Props) => {
  const db = SQLite.openDatabase("database3.db");

  const emptyData: TData = {
    id: 0,
    nameEndpoint: "",
    baseIp: "",
    idDevice: 0,
    mode: "",
    valuePrimary: "",
    valueSecondary: "",
  };

  const [data, setData] = useState<TData>(emptyData);

  const [dbDataDevice, setDbDataDevice] = useState<any[]>([]);
  // const [dbDataEndpoint, setDbDataEndpoint] = useState<any[]>([]);

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
            return setDbDataDevice(temp);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `SELECT * FROM endpoint`,
    //     undefined,
    //     (txObj, resultSet) => {
    //       if (resultSet.rows.length) {
    //         let temp: any[] = [];
    //         for (let i = 0; i < resultSet.rows.length; ++i) {
    //           temp.push(resultSet.rows.item(i));
    //         }
    //         return setDbDataEndpoint(temp);
    //       }
    //     },
    //     (txObj, error) => {
    //       console.log(error);
    //       return false;
    //     }
    //   );
    // });
  }, []);

  const validate = () => {
    if (
      data.baseIp.length &&
      data.nameEndpoint.length &&
      data.baseIp.length &&
      data.valuePrimary.length
    ) {
      if (data.mode.length) {
        if (data.mode === "switch") {
          if (data.valueSecondary?.length) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const showToast = (text: string, severity: TSeverity) => {
    Toast.show(text, {
      duration: 2000,
      position: Toast.positions.BOTTOM - 30,
      animation: true,
      hideOnPress: true,
      backgroundColor: getSeverity(severity),
      textColor: "white",
      opacity: 1,
    });
  };

  const addData = () => {
    if (!validate()) {
      return showToast("Error: Input field must be not empty", "error");
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO endpoint (id, name, base_ip, mode, device_id, wifi_id, value_primary, value_secondary) VALUES (null, ?, ?, ?, ?, ?, ? ,?)`,
        [
          data.nameEndpoint,
          data.baseIp,
          data.mode,
          data.idDevice,
          props.id as string,
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

  // const deleteData = (id: number) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `DELETE FROM endpoint WHERE id = ?`,
  //       [id],
  //       (txObj, resultSet: SQLite.SQLResultSet) => {
  //         if (resultSet.rowsAffected) {
  //           router.replace(`/add-endpoint/${props.id}`);
  //         }
  //       },
  //       (txObj, error) => {
  //         console.log(error);
  //         return false;
  //       }
  //     );
  //   });
  // };

  // const ComponentView = (props: any) => {
  //   return (
  //     <View key={props.id} style={styles.showData}>
  //       <Text>{props.id}</Text>
  //       <Text>{"http://" + props.base_ip + props.value_primary}</Text>
  //       <Button
  //         title="Delete"
  //         color={"#c1121f"}
  //         onPress={() => deleteData(props.id)}
  //       />
  //     </View>
  //   );
  // };

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
            return {
              ...prev,
              idDevice: val,
              baseIp: dbDataDevice.filter((device: any) => val == device.id)[0]
                .base_ip,
            };
          })
        }
        data={dbDataDevice.map((data) => {
          return {
            key: data.id,
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
        placeholder="Path 1 e.g /led/1"
        value={data?.valuePrimary}
        onChangeText={(valuePrimary) =>
          setData((prev): TData => {
            return { ...prev, valuePrimary };
          })
        }
      />
      {data.mode === "switch" && (
        <TextInput
          style={styles.input}
          placeholder="Path 2 e.g /led/0"
          value={data?.valueSecondary as string}
          onChangeText={(valueSecondary) =>
            setData((prev): TData => {
              return { ...prev, valueSecondary };
            })
          }
        />
      )}
      {!!data.baseIp && (
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
      {/* <FlatList
        data={dbDataEndpoint}
        renderItem={({ item }) => <ComponentView {...item} />}
        keyExtractor={(item) => item.id.toString()}
      /> */}
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
