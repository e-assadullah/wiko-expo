import { StyleSheet, Pressable, Switch, TextInput } from "react-native";
import React, { useState } from "react";
import { View, Text } from "../../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { TSeverity, getSeverity } from "../../../utils";
import Monitoring from "./Monitoring";

type Props = {
  data: any;
  loading: (value: boolean) => void;
};

const Action = (props: Props) => {
  const { base_ip, value_primary, value_secondary, mode, name } = props.data;

  const [switchState, setSwitchState] = useState(false);
  const [inputState, setInputState] = useState("");

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

  const link1 = `http://${base_ip}${value_primary}`;
  const link2 = `http://${base_ip}${value_secondary}`;

  const [press, setPress] = useState(false);

  switch (mode) {
    case "button":
      return (
        <Pressable
          onPress={async () => {
            const controller = new AbortController();
            try {
              props.loading(true);
              setTimeout(() => {
                controller.abort();
              }, 2000);
              console.log("Fetch: " + link1);
              const start = new Date();
              const response = await fetch(link1, { signal: controller.signal })
                .then((res) => {
                  const timetaken = new Date() - start;
                  console.log("Response Time: " + timetaken + "ms");
                  return res.text();
                })
                .then((text) => {
                  console.log("Message: " + text);
                  return text;
                })
                .catch((err) => {
                  const timetaken = new Date() - start;
                  console.log("Error Response Time: " + timetaken + "ms");
                  throw err;
                });
              if (response) {
                showToast(response, "success");
              } else {
                showToast("Success", "success");
              }
            } catch (error: any) {
              if (error.message === "Aborted") {
                showToast("Error: Took too long to response", "error");
              } else {
                showToast(`Error: ${error.message}`, "error");
                console.log(error);
              }
            } finally {
              props.loading(false);
            }
          }}
          onPressIn={() => setPress(true)}
          onPressOut={() => setPress(false)}
        >
          <View
            style={press ? [styles.container, styles.bgGray] : styles.container}
          >
            <MaterialIcons name="radio-button-on" size={45} color="black" />
            <Text style={{ paddingHorizontal: 5, textAlign: "center" }}>
              {name}
            </Text>
          </View>
        </Pressable>
      );
    case "switch":
      return (
        <Pressable
          onPress={async () => {
            setSwitchState((prev) => !prev);
            const controller = new AbortController();
            try {
              props.loading(true);
              setTimeout(() => {
                controller.abort();
              }, 2000);
              const response = await fetch(switchState ? link2 : link1, {
                signal: controller.signal,
              })
                .then((res) => res)
                .catch((err) => {
                  throw err;
                });
              if (response.statusText) {
                showToast(response.statusText, "success");
              } else {
                showToast("Success", "success");
              }
            } catch (error: any) {
              if (error.message === "Aborted") {
                showToast("Error: Took too long to response", "error");
              } else {
                showToast(`Error: ${error.message}`, "error");
                console.log(error);
              }
            } finally {
              props.loading(false);
            }
          }}
          onPressIn={() => setPress(true)}
          onPressOut={() => setPress(false)}
        >
          <View
            style={press ? [styles.container, styles.bgGray] : styles.container}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#000000" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={async () => {
                setSwitchState((prev) => !prev);
                const controller = new AbortController();
                try {
                  props.loading(true);
                  setTimeout(() => {
                    controller.abort();
                  }, 2000);
                  const response = await fetch(switchState ? link2 : link1, {
                    signal: controller.signal,
                  })
                    .then((res) => res)
                    .catch((err) => {
                      throw err;
                    });
                  if (response.statusText) {
                    showToast(response.statusText, "success");
                  } else {
                    showToast("Success", "success");
                  }
                } catch (error: any) {
                  if (error.message === "Aborted") {
                    showToast("Error: Took too long to response", "error");
                  } else {
                    showToast(`Error: ${error.message}`, "error");
                    console.log(error);
                  }
                } finally {
                  props.loading(false);
                }
              }}
              value={switchState}
            />
            <Text>{name}</Text>
          </View>
        </Pressable>
      );
    case "monitoring":
      return <Monitoring link={link1} name={name} />;
    case "input":
      return (
        <View style={styles.containerInput}>
          <Text>{name}</Text>
          <TextInput
            style={styles.input}
            value={inputState}
            onChangeText={(text) => setInputState(text)}
          />
          <Pressable
            onPress={async () => {
              const controller = new AbortController();
              try {
                props.loading(true);
                setTimeout(() => {
                  controller.abort();
                }, 2000);
                console.log("Fetch: " + link1 + "?value=" + inputState);
                const start = new Date();
                const response = await fetch(link1 + "?value=" + inputState, {
                  signal: controller.signal,
                })
                  .then((res) => {
                    const timetaken = new Date() - start;
                    console.log("Response Time: " + timetaken + "ms");
                    return res.text();
                  })
                  .then((text) => {
                    console.log("Message: " + text);
                    return text;
                  })
                  .catch((err) => {
                    const timetaken = new Date() - start;
                    console.log("Error Response Time: " + timetaken + "ms");
                    throw err;
                  });
                if (response) {
                  showToast(response, "success");
                } else {
                  showToast("Success", "success");
                }
              } catch (error: any) {
                if (error.message === "Aborted") {
                  showToast("Error: Took too long to response", "error");
                } else {
                  showToast(`Error: ${error.message}`, "error");
                  console.log(error);
                }
              } finally {
                props.loading(false);
              }
            }}
          >
            <View style={styles.button}>
              <Text style={{ fontWeight: "500", color: "white" }}>Send</Text>
            </View>
          </Pressable>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <Text>No mode detect</Text>
        </View>
      );
  }
};

export default Action;

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
  containerInput: {
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 5,
  },
  bgGray: {
    backgroundColor: "#e9ecef",
  },
  input: {
    paddingHorizontal: 8,
    width: "100%",
    height: 30,
    borderColor: "#000000",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: "#118ab2",
    borderRadius: 10,
  },
});
