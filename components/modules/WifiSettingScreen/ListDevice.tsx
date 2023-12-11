import { Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text } from "../../Themed";

type TProps = {
  id: string | string[];
};

const ListDevice = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [device, setDevice] = useState<any[]>([]);

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
            return setDevice(temp);
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
    <View>
      <Text>ListDevice</Text>
      <FlatList
        data={device}
        keyExtractor={(d) => d.id}
        renderItem={(d) => (
          <View style={styles.container}>
            <Text>
              {d.item.name} ({d.item.base_ip})
            </Text>
            <Button title="Delete" color={"red"} />
          </View>
        )}
      />
    </View>
  );
};

export default ListDevice;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0.2,
    borderRadius: 3,
  },
});
