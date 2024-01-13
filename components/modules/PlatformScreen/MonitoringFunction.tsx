import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text } from "../../Themed";
import { TSeverity, getSeverity } from "../../../utils";
import Toast from "react-native-root-toast";

type TProps = {
  name: string;
  link: string;
};

const MonitoringFunction = (props: TProps) => {
  const [onGoing, setOnGoing] = useState<boolean>(false);
  const [press, setPress] = useState<boolean>(false);
  const [res, setRes] = useState<any>();

  const showToast = (text: string, severity: TSeverity) => {
    Toast.show(text, {
      duration: 200,
      position: Toast.positions.BOTTOM - 30,
      animation: true,
      hideOnPress: true,
      backgroundColor: getSeverity(severity),
      textColor: "white",
      opacity: 1,
    });
  };

  useEffect(() => {
    if (onGoing) {
      const interval = setInterval(async () => {
        const controller = new AbortController();
        try {
          setTimeout(() => {
            controller.abort();
          }, 5000);
          console.log("Fetch: " + props.link);
          const start = new Date();
          await fetch(props.link, {
            signal: controller.signal,
          })
            .then((res) => res.json())
            .then((json) => {
              const timetaken = new Date() - start;
              console.log("Response Time: " + timetaken + "ms");
              setRes(json);
            })
            .catch((err) => {
              const timetaken = new Date() - start;
              console.log("Response Time: " + timetaken + "ms");
              throw err;
            });
        } catch (error: any) {
          if (error.message === "Aborted") {
            showToast("Error: Took too long to response", "error");
          } else {
            showToast(`Error: ${error.message}`, "error");
            console.log(error);
          }
          setOnGoing(false);
          clearInterval(interval);
        }
      }, 6000);
    }
  }, [onGoing, setOnGoing]);

  return (
    <View
      style={
        press || !onGoing ? [styles.container, styles.bgGray] : styles.container
      }
    >
      <View
        style={
          onGoing ? [styles.dot, styles.bgGreen] : [styles.dot, styles.bgRed]
        }
      ></View>
      <Pressable
        onPress={() => setOnGoing(true)}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
      >
        <Text style={styles.textCenter}>{props.name}</Text>
        <Text style={[styles.textCenter, styles.fontRes]}>
          {res?.last_value?.value ?? "Value"}
        </Text>
        <Text
          style={
            onGoing
              ? [styles.textCenter, styles.textGreen]
              : [styles.textCenter, styles.textRed]
          }
        >
          {onGoing ? "..." : "tap to reload"}
        </Text>
      </Pressable>
    </View>
  );
};

export default MonitoringFunction;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 5,
  },
  bgGray: {
    backgroundColor: "#e9ecef",
  },
  textCenter: {
    textAlign: "center",
  },
  textGreen: {
    color: "green",
  },
  textRed: {
    color: "red",
  },
  fontRes: {
    fontSize: 24,
    fontWeight: "500",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 30,
    position: "absolute",
    top: 5,
    right: 5,
  },
  bgRed: {
    backgroundColor: "red",
  },
  bgGreen: {
    backgroundColor: "green",
  },
});
