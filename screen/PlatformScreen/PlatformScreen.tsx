import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import HeaderMenu from "../../components/modules/PlatformScreen/HeaderMenu";
import * as SQLite from "expo-sqlite";
import { IPlatform } from "../../components/modules/AddPlatformScreen/InputPlatform";

type TProps = {
  id: string | string[];
};

const PlatformScreen = (props: TProps) => {
  const db = SQLite.openDatabase("database2.db");
  const [platform, setPlatform] = useState<IPlatform>();

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.container}>
      <HeaderMenu
        id={platform ? platform.id : "1"}
        name={platform ? platform.name : "Home"}
        function={platform ? platform.function_count : 0}
      />
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
});
