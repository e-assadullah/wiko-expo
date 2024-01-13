import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/modules/HomeScreen/HomeHeader";
import CardActive from "../../components/modules/HomeScreen/CardActive";
import { View, Text } from "../../components/Themed";
import InterfaceHeader from "../../components/modules/HomeScreen/InterfaceHeader";
import CardInterface, {
  IWifi,
} from "../../components/modules/HomeScreen/CardInterface";
import { FlatList } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import EmptyCard from "../../components/modules/HomeScreen/EmptyCard";
import PlatformHeader from "../../components/modules/HomeScreen/PlatformHeader";
import { IPlatform } from "../../components/modules/AddPlatformScreen/InputPlatform";
import CardPlatform from "../../components/modules/HomeScreen/CardPlatform";
import WifiManager from "react-native-wifi-reborn";

const HomeScreen = () => {
  const db = SQLite.openDatabase("database3.db");
  const [wifi, setWifi] = useState<IWifi[]>([]);
  const [platform, setPlatform] = useState<IPlatform[]>([]);
  const [ssid, setSsid] = useState("");

  useEffect(() => {
    WifiManager?.getCurrentWifiSSID().then(
      (ssid) => {
        setSsid(ssid);
        console.log("SSID: ", ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS wifi (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ssid TEXT, ip_address TEXT, icons TEXT, devices_count INTEGER)`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS platform (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, platform TEXT, icons TEXT, token TEXT, function_count INTEGER)`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM wifi",
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp: any[] = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setWifi(temp);
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
        "SELECT * FROM platform",
        undefined,
        (txObj, resultSet) => {
          if (resultSet.rows.length) {
            let temp = [];
            for (let i = 0; i < resultSet.rows.length; ++i) {
              temp.push(resultSet.rows.item(i));
            }
            return setPlatform(temp);
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
    <ScrollView>
      <View style={styles.container}>
        <HomeHeader />
        <Text style={styles.heading}>Active Interface</Text>
        <CardActive ssid={ssid} />
        <InterfaceHeader />
        {!wifi.length && <EmptyCard />}
        <FlatList
          data={wifi}
          renderItem={({ item }) => <CardInterface {...item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
        <PlatformHeader />
        {!platform.length && <EmptyCard platform />}
        <FlatList
          data={platform}
          renderItem={({ item }) => <CardPlatform {...item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    gap: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
