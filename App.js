import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Platform,
  Linking,
  ToastAndroid
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import YourOrders from "./screens/YourOrders";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import NotificationScreen from "./screens/NotificationScreen";
import AddressScreen from "./screens/AddressScreen";
import AddDeliveryAddressScreen from "./screens/AddDeliveryAddressScreen";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function App() {
  const colorScheme = useColorScheme();
  const [notificationStatus, setNotificationStatus] = useState(null);

  const scheduleFormalNotifications = async () => {
    const times = [
      { hour: 9, title: "🌞 Good Morning!", body: "Don't miss today’s top deals. Start your day smart!" },
      { hour: 15, title: "☕ Midday Reminder", body: "Take a break & check out the latest offers." },
      { hour: 21, title: "🌙 Good Evening!", body: "Unwind with our evening deals. Ends at midnight!" },
    ];

    for (let time of times) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: time.title,
          body: time.body,
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 60 * 1,
        },
      });
    }
  };

  // Notifications.cancelAllScheduledNotificationsAsync();

  // 🔹 Auto update check (on launch)
  const autoCheckForUpdate = async () => {
    if (__DEV__) return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) showUpdateAlert();
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  };

  // 🔹 Manual update check (for Profile screen)
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

  // 🔔 Notification permission check (first launch)
  const requestNotificationPermission = async () => {
    if (!Device.isDevice) return;

    const { status } = await Notifications.getPermissionsAsync();
    setNotificationStatus(status);

    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      setNotificationStatus(newStatus);

      if (newStatus !== "granted") {
        console.log("🔕 Notification permission denied");
        ToastAndroid.show("Notification permission denied", ToastAndroid.SHORT);

        // Optional: show a toast or snack here
        // Option to open settings via some button in UI
      } else {
        getDevicePushToken();
      }
    } else {
      getDevicePushToken();
    }
  };

  const getDevicePushToken = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("✅ Push token:", token);
    // Optionally send token to server
  };

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  // 🔁 Fire once on mount
  useEffect(() => {
    autoCheckForUpdate();
    requestNotificationPermission();
    // scheduleFormalNotifications();
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
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          <Stack.Screen name="AddDeliveryAddressScreen" component={AddDeliveryAddressScreen} />
          <Stack.Screen name="Orders" component={YourOrders} />
          <Stack.Screen name="Profile">
            {props => (
              <Profile
                {...props}
                manualCheckForUpdate={manualCheckForUpdate}
                notificationStatus={notificationStatus}
                openAppSettings={openAppSettings}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
