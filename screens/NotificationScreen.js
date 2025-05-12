import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Linking,
  Platform,
  TouchableOpacity,
  Image,
  AppState,
  useColorScheme
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // 🔄 Check permission on mount and on app state change (e.g., returning from settings)
  useEffect(() => {
    checkPermission();

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove(); // 🧹 Cleanup on unmount
    };
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      await checkPermission();
    }

    appState.current = nextAppState;
  };

  const mockNotifications = [
    {
      id: "1",
      title: "Order Shipped",
      body: "Your order #56789 has been shipped. Track it now!",
    },
    {
      id: "2",
      title: "Weekly Digest",
      body: "You had 3 new messages and 2 updates this week.",
    },
    {
      id: "3",
      title: "Security Alert",
      body: "A new login was detected from a different device.",
    },
    {
      id: "4",
      title: "Flash Sale 🔥",
      body: "Grab your favorite items at up to 70% off! Limited time only.",
    },
    {
      id: "5",
      title: "Reminder",
      body: "Don’t forget your meeting today at 4:00 PM.",
    },
  ];

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setHasPermission(status === "granted");

    if (status === "granted") {
      // 👇 Add your real fetch logic here
      setNotifications(mockNotifications); // Dummy for now
    }
  };

  const requestPermission = async () => {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      setHasPermission(true);
    } else if (canAskAgain) {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus === "granted") {
        setHasPermission(true);
      } else {
        openAppSettings();
      }
    } else {
      openAppSettings();
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const renderNotification = ({ item }) => (
    <View className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl mb-3 mx-4">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-extrabold text-xl text-black dark:text-white">
          {item.title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          a few seconds ago
        </Text>
      </View>
      <Text className="text-gray-700 dark:text-gray-100 italic text-lg">
        {item.body}
      </Text>
    </View>
  );


  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* 🔙 Back */}
      <TouchableOpacity
        className="w-[90%] px-4 flex-row items-center mt-4"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color={isDarkMode ? "white" : "black"} />
        <Text className="text-lg font-semibold ml-2 text-black dark:text-white">Back to Home</Text>
      </TouchableOpacity>

      {/* 🚨 No Permission */}
      {hasPermission === false && (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("../assets/notification_off.png")}
            style={{ width: 120, height: 120, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text className="text-center text-4xl font-extrabold mb-4 text-black dark:text-white">
            Turn on Notification
          </Text>
          <Text className="text-center text-gray-500 dark:text-gray-300 text-xl mb-4">
            Never miss an update, order status, or exclusive deal again.
          </Text>
          <Text className="text-md italic text-gray-500 dark:text-gray-400 mb-2">
            We respect your time — no spam, just the good stuff.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="px-6 py-3 rounded-xl"
          >
            <Text className="text-blue-700 dark:text-blue-300 text-lg font-bold">
              Allow Notification Permission
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ✅ Permission granted but no notifications */}
      {hasPermission && notifications.length === 0 && (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("../assets/no_notifications.png")}
            style={{ width: 150, height: 150, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text className="text-center text-4xl font-extrabold mb-4 text-black dark:text-white">
            No notifications yet
          </Text>
          <Text className="text-center text-gray-500 dark:text-gray-300 text-xl mb-4">
            Your notifications will appear here once you’ve received them.
          </Text>
        </View>
      )}

      {/* 📩 Notifications Available */}
      {hasPermission && notifications.length > 0 && (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
