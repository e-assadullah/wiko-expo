import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import * as SQLite from "expo-sqlite";
import { router } from "expo-router";
import { IWifi } from "./CardInterface";

type Props = {
  ssid: string;
};

const CardActive = (props: Props) => {
  const db = SQLite.openDatabase("database3.db");
  const [wifi, setWifi] = useState<IWifi>();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM wifi WHERE ssid = ?`,
        [props.ssid],
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
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
  if (props.ssid && wifi) {
    return (
      <Pressable onPress={() => router.push(`/wifi/${wifi.id}`)}>
        <View style={styles.container}>
          <Text style={styles.textSemi}>{wifi.ssid}</Text>
        </View>
      </Pressable>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.textSemi}>
          There is no active interface. {props.ssid}
        </Text>
      </View>
    );
  }
};

export default CardActive;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    minHeight: 150,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textSemi: {
    fontWeight: "500",
  },
});
