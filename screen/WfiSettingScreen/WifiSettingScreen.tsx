import { StyleSheet } from "react-native";
import WifiSettingHeader from "../../components/modules/WifiSettingScreen/WifiSettingHeader";
import { View } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import WifiInformation from "../../components/modules/WifiSettingScreen/WifiInformation";
import * as SQLite from "expo-sqlite";
import ListDevice from "../../components/modules/WifiSettingScreen/ListDevice";
import ListEndpoint from "../../components/modules/WifiSettingScreen/ListEndpoint";

type TProps = {
  id: string | string[];
};

const WifiSettingScreen = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [wifi, setWifi] = useState<any>();

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
            return setWifi(temp[0]);
          }
        },
        (txObj, error) => {
          console.log(error);
          return false;
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <WifiSettingHeader id={props.id} />
      <WifiInformation wifi={wifi} />
      <ListDevice id={props.id} />
      <ListEndpoint id={props.id} />
    </View>
  );
};

export default WifiSettingScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
