import { Button, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import { SelectList } from "react-native-dropdown-select-list";
import * as SQLite from "expo-sqlite";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";
import { router } from "expo-router";

export type IPlatform = {
  id: string | string[];
  name: string;
  platform: string;
  icons: any;
  token: string;
  function_count: number;
};

const InputPlatform = () => {
  const db = SQLite.openDatabase("database3.db");

  type PlatformList = {
    value: string;
    key: string;
  };

  const emptyData: IPlatform = {
    id: "",
    name: "",
    platform: "",
    icons: "",
    token: "",
    function_count: 0,
  };

  const listPlatform: PlatformList[] = [
    {
      value: "ubidots",
      key: "ubidots",
    },
  ];

  const [data, setData] = useState<IPlatform>(emptyData);

  // const [dbData, setDbData] = useState<IPlatform[]>();

  const validate = () => {
    if (data.icons && data.name && data.platform && data.token) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `SELECT * FROM platform`,
    //     undefined,
    //     (txObj, resultSet) => {
    //       if (resultSet.rows.length) {
    //         let temp: IPlatform[] = [];
    //         for (let i = 0; i < resultSet.rows.length; ++i) {
    //           temp.push(resultSet.rows.item(i));
    //         }
    //         console.log(temp);
    //         return setDbData(temp);
    //       }
    //     },
    //     (txObj, error) => {
    //       console.log(error);
    //       return false;
    //     }
    //   );
    // });
  }, []);

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
        `INSERT INTO platform (id, name, platform, icons, token, function_count) VALUES (null, ?, ?, ?, ?, ?)`,
        [data.name, data.platform, data.icons, data.token, data.function_count],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            setData(emptyData);
            router.replace(`/`);
          }
        },
        (txObj, error) => {
          showToast("Error: " + error.message, "error");
          console.log(error);
          return false;
        }
      );
    });
  };

  // const deleteData = (id: string | string[]) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `DELETE FROM platform WHERE id = ?`,
  //       [parseInt(id as string)],
  //       (txObj, resultSet: SQLite.SQLResultSet) => {
  //         if (resultSet.rowsAffected) {
  //           router.replace("/");
  //         }
  //       },
  //       (txObj, error) => {
  //         console.log(error);
  //         return false;
  //       }
  //     );
  //   });
  // };

  // const showDb = () => {
  //   if (dbData?.length) {
  //     return dbData?.map((data: IPlatform, i) => {
  //       return (
  //         <View key={data.id as string} style={styles.showData}>
  //           <Text>{data.id}</Text>
  //           <Button
  //             title="Delete"
  //             color={"#c1121f"}
  //             onPress={() => deleteData(data.id as string)}
  //           />
  //         </View>
  //       );
  //     });
  //   }
  // };

  return (
    <View style={styles.inputWrapper}>
      <SelectList
        setSelected={(val: string) =>
          setData((prev) => {
            return { ...prev, platform: val };
          })
        }
        data={listPlatform}
        placeholder="Select platform"
        boxStyles={styles.inputBox}
        inputStyles={{ color: data.platform.length ? "black" : "gray" }}
      />
      <TextInput
        style={styles.input}
        placeholder="Name platform"
        value={data?.name}
        onChangeText={(name) =>
          setData((prev): IPlatform => {
            return { ...prev, name };
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Icons"
        value={data?.icons}
        onChangeText={(icons) =>
          setData((prev): IPlatform => {
            return { ...prev, icons };
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Token"
        value={data?.token}
        onChangeText={(token) =>
          setData((prev): IPlatform => {
            return { ...prev, token };
          })
        }
      />
      <Button title="Add Endpoint" onPress={() => addData()} />
      {/* <View style={{ marginTop: 20 }}>{showDb()}</View> */}
    </View>
  );
};

export default InputPlatform;

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
  inputBox: {
    borderColor: "#000000",
    borderWidth: 0.2,
    borderRadius: 5,
    color: "gray",
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
