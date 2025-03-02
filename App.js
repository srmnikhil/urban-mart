import React, { useEffect } from "react";
import { Alert, SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Updates from "expo-updates";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import YourOrders from "./screens/YourOrders";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  // 🔹 Yeh sirf app start hone par chalega (Alert tabhi dikhega jab update available hoga)
  const autoCheckForUpdate = async () => {
    if (__DEV__) {
      return;
    }
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        showUpdateAlert();
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  };

  // 🔹 Yeh manual call hone par chalega (Agar update nahi hoga to "You're Up-to-Date" bhi dikhega)
  const manualCheckForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        showUpdateAlert();
      } else {
        Alert.alert("You're Up-to-Date", "No updates available right now.", [
          { text: "OK", style: "cancel" },
        ]);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
      Alert.alert("Error", "Failed to check for updates.");
    }
  };

  // 🔹 Common function jo alert show karega
  const showUpdateAlert = () => {
    Alert.alert(
      "Update Available",
      "A new update is ready. Update now to get the latest features!",
      [
        {
          text: "Update the App",
          onPress: async () => {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          },
        },
      ]
    );
  };

  // 🔹 App start hone par ek baar update check karega
  useEffect(() => {
    autoCheckForUpdate();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colorScheme === "dark" ? "black" : "white" }}
    >
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "black" : "white"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="Orders" component={YourOrders} />
          <Stack.Screen name="Profile">
            {props => <Profile {...props} manualCheckForUpdate={manualCheckForUpdate} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
