import { Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { View, Text } from "../../Themed";
import { SelectList } from "react-native-dropdown-select-list";
import Checkbox from "expo-checkbox";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import { IPlatform } from "../AddPlatformScreen/InputPlatform";

type TProps = {
  id: string | string[];
};

export interface IFunction {
  id: number;
  platform_id: string | string[] | number;
  name: string;
  mode: string;
  link_primary: string;
  value_primary: string;
  link_secondary: string;
  value_secondary: string;
  is_header: boolean;
}

const InputFunction = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");

  const [platform, setPlatform] = useState<IPlatform>({
    id: "",
    name: "",
    platform: "",
    icons: "",
    token: "",
    function_count: 0,
  });

  const emptyData: IFunction = {
    id: 0,
    platform_id: props.id,
    name: "",
    mode: "",
    link_primary: "",
    value_primary: "",
    link_secondary: "",
    value_secondary: "",
    is_header: false,
  };

  const [data, setData] = useState<IFunction>(emptyData);

  const optionMode = [
    { key: "1", value: "button" },
    { key: "2", value: "switch" },
    { key: "3", value: "monitoring" },
    { key: "4", value: "input" },
  ];

  const validate = () => {
    if (data.name && data.mode && data.link_primary) {
      if (data.mode === "switch") {
        return (
          !!data.value_secondary.length &&
          !!data.link_secondary.length &&
          !!data.value_primary.length
        );
      } else if (data.mode === "button") {
        return !!data.value_primary.length;
      }
      return true;
    } else {
      return false;
    }
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
        `INSERT INTO function (id, name, platform_id, mode, link_primary, value_primary, link_secondary, value_secondary, is_header) VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.name,
          data.platform_id as number,
          data.mode,
          data.link_primary,
          data.value_primary,
          data.link_secondary.length ? data.value_secondary : null,
          data.value_secondary.length ? data.value_secondary : null,
          data.is_header ? 1 : 0,
        ],
        (txObj, resultSet: SQLite.SQLResultSet) => {},
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
            return setPlatform(temp[0]);
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
        `UPDATE platform SET function_count = ? WHERE id = ${props.id}`,
        [platform.function_count + 1],
        (txObj, resultSet: SQLite.SQLResultSet) => {
          if (resultSet.rowsAffected) {
            setData(emptyData);
            router.replace(`/platform/${props.id}`);
          }
        }
      );
    });
  };

  const checkMode = () => {
    if (data.mode === "monitoring" || data.mode === "input") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Name function"
        value={data?.name}
        onChangeText={(name: string) =>
          setData((prev): IFunction => {
            return { ...prev, name };
          })
        }
      />
      <SelectList
        setSelected={(val: any) =>
          setData((prev): IFunction => {
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
        placeholder="Link 1"
        value={data?.link_primary}
        onChangeText={(link_primary: string) =>
          setData((prev): IFunction => {
            return { ...prev, link_primary };
          })
        }
      />
      {checkMode() && (
        <TextInput
          style={styles.input}
          placeholder="Value 1"
          value={data?.value_primary}
          onChangeText={(value_primary: string) =>
            setData((prev): IFunction => {
              return { ...prev, value_primary };
            })
          }
        />
      )}
      {data.mode === "switch" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Link 2"
            value={data?.link_secondary}
            onChangeText={(link_secondary: string) =>
              setData((prev): IFunction => {
                return { ...prev, link_secondary };
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Value 2"
            value={data?.value_secondary}
            onChangeText={(value_secondary: string) =>
              setData((prev): IFunction => {
                return { ...prev, value_secondary };
              })
            }
          />
        </>
      )}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={data?.is_header}
          onValueChange={(value: boolean) =>
            setData((prev): IFunction => {
              return { ...prev, is_header: value };
            })
          }
          color={data.is_header ? "#000000" : undefined}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Token in header</Text>
      </View>
      <Button title="Submit" onPress={() => addData()} />
    </View>
  );
};

export default InputFunction;

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
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
