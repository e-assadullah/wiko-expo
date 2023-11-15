import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import WifiHeader from "../../components/modules/WifiScreen/WifiHeader";
import EndpointContainer from "../../components/modules/WifiScreen/EndpointContainer";
import * as SQLite from "expo-sqlite";

type Props = {
  id: string | string[];
};

const WifiScreen = (props: Props) => {
  const db = SQLite.openDatabase("database2.db");
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

  const name = "Home";
  return (
    <View style={styles.container}>
      <WifiHeader
        id={props.id}
        name={name}
        devices={wifi ? wifi.devices_count : 0}
      />
      <EndpointContainer id={parseInt(props.id as string)} />
    </View>
  );
};

export default WifiScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
