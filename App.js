import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import Colors from "./constants/colors";

// keep the splash screen up until we say it can go away
SplashScreen.preventAutoHideAsync();

export default function App() {
  // load the custom fonts from the assets folder
  const [fontsLoaded, fontError] = useFonts({
    bitterBold: require("./assets/fonts/Bitter-Bold.ttf"),
    latoRegular: require("./assets/fonts/Lato-Regular.ttf"),
    latoBold: require("./assets/fonts/Lato-Bold.ttf"),
  });

  // once the first screen is laid out, hide the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // fonts are not ready yet, so don't show the home screen
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.rootContainer} onLayout={onLayoutRootView}>
        <HomeScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.darkPine,
  },
});
