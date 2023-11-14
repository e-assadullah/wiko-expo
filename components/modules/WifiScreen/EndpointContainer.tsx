import { Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";

type Props = {
  id: number;
};

const EndpointContainer = (props: Props) => {
  const db = SQLite.openDatabase("database2.db");

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

  const showDb = () => {
    if (dbDataEndpoint?.length) {
      return dbDataEndpoint?.map((data: any) => {
        return (
          <View key={data.id} style={styles.showData}>
            <Text>{data.name}</Text>
            <Text>{"http://" + data.base_ip + data.value_primary}</Text>
            <Button
              title="Delete"
              color={"#c1121f"}
              onPress={() => {
                //deleteData(data.id)
              }}
            />
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>EndpointContainer</Text>
      {showDb()}
    </View>
  );
};

export default EndpointContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    marginTop: 5,
  },
  showData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
