import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import HeaderMenu from "../../components/modules/PlatformScreen/HeaderMenu";
import * as SQLite from "expo-sqlite";
import { IPlatform } from "../../components/modules/AddPlatformScreen/InputPlatform";
import { IFunction } from "../../components/modules/AddFunctionScreen/InputFunction";
import ActionFunction from "../../components/modules/PlatformScreen/ActionFunction";

type TProps = {
  id: string | string[];
};

const PlatformScreen = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [platform, setPlatform] = useState<IPlatform>();
  const [func, setFunc] = useState<IFunction[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS function (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, platform_id INTEGER, mode TEXT,link_primary TEXT ,value_primary TEXT, link_secondary TEXT, value_secondary TEXT, is_header BOOLEAN)`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM platform WHERE id = ${props.id as string}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: IPlatform[] = [];
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
        `SELECT * FROM function WHERE platform_id = ${parseInt(
          props.id as string
        )}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: IFunction[] = [];
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
  }, []);

  const seLoading = (value: boolean) => {
    if (value) {
      console.log("lagi loading");
    } else {
      console.log("matikan loading");
    }
  };

  const showDb = () => {
    if (func.length) {
      return func.map((item) => (
        <View key={item.id} style={styles.showData}>
          <ActionFunction
            data={item}
            loading={seLoading}
            token={platform?.token ?? ""}
          />
        </View>
      ));
    }
  };

  const Viewer = (props: IFunction) => {
    return (
      <View style={styles.flexRow}>
        <Text>{props.name}</Text>
        <Text>{props.mode}</Text>
        <Text>{props.id}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderMenu
        id={platform ? platform.id : "1"}
        name={platform ? platform.name : "Home"}
      />
      <View style={styles.functionWrap}>{showDb()}</View>
    </View>
  );
};

export default PlatformScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
  displayView: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  functionWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});
