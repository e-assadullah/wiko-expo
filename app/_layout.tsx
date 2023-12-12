import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme, LogBox } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <RootSiblingParent>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="add-wifi" options={{ headerShown: false }} />
          <Stack.Screen name="add-platform" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-function/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="add-endpoint/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="add-device/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="wifi/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="wifi-setting/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="platform/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="platform-setting/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
