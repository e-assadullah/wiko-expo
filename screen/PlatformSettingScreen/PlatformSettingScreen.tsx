import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "../../components/Themed";
import PlatformSettingHeader from "../../components/modules/PlatformSettingScreen/PlatformSettingHeader";
import PlatformInformation from "../../components/modules/PlatformSettingScreen/PlatformInformation";
import * as SQLite from "expo-sqlite";
import ListFunction from "../../components/modules/PlatformSettingScreen/ListFunction";

type TProps = {
  id: string | string[];
};

const PlatformSettingScreen = (props: TProps) => {
  const db = SQLite.openDatabase("database3.db");
  const [platform, setPlatform] = useState<any>();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM platform WHERE id = ${props.id as string}`,
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp = [];
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
      <PlatformSettingHeader id={props.id} />
      <PlatformInformation platform={platform} />
      <ListFunction id={props.id} />
    </View>
  );
};

export default PlatformSettingScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 26,
    marginTop: 5,
  },
});
