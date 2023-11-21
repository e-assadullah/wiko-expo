import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "../../Themed";
import * as SQLite from "expo-sqlite";
import Action from "./Action";

type Props = {
  id: number;
};

const EndpointContainer = (props: Props) => {
  const db = SQLite.openDatabase("database3.db");

  const [dbDataEndpoint, setDbDataEndpoint] = useState<any[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS endpoint (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, base_ip TEXT, mode TEXT, device_id INTEGER ,wifi_id INTEGER, value_primary TEXT, value_secondary TEXT )`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM endpoint WHERE wifi_id = ${props.id}`,
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

  const seLoading = (value: boolean) => {
    if (value) {
      console.log("lagi loading");
    } else {
      console.log("matikan loading");
    }
  };

  const showDb = () => {
    if (dbDataEndpoint?.length) {
      return dbDataEndpoint?.map((data: any) => {
        return (
          <View key={data.id} style={styles.showData}>
            <Action data={data} loading={seLoading} />
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.endpointWrap}>{showDb()}</View>
    </View>
  );
};

export default EndpointContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    marginTop: 10,
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  endpointWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});
