import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons library
import { useNavigation, useRoute } from "@react-navigation/native"; // Navigation hooks
import { useFocusEffect } from "@react-navigation/native"; // Detect focus

export default function BottomNav() {
  // const navigation = useNavigation();
  // const route = useRoute(); // Get current route
  const [activeTab, setActiveTab] = useState("Home"); // Default active tab

  const tabs = [
    { screenName: "Home", iconName: "home-outline", label: "Home" },
    { screenName: "Orders", iconName: "bag-handle-outline", label: "Your\nOrders" },
    { iconName: "grid-outline", label: "Categories" },
    { screenName: "Cart", iconName: "cart-outline", label: "Cart" },
    { screenName: "Profile", iconName: "person-outline", label: "My\nProfile" },
  ];

  // Update active tab when the screen changes
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setActiveTab(route.name);
  //   }, [route.name])
  // );

  // const handleTabPress = (tab) => {
  //   setActiveTab(tab.screenName);
  //   if (tab.screenName) {
  //     navigation.navigate(tab.screenName);
  //   } else if (tab.iconName === "grid-outline") {
  //     console.log("Open Categories Modal");
  //     // Handle Categories tab separately
  //   }
  // };

  return (
    <View className="flex-row w-[90%] h-20 justify-around items-center bg-gray-100 p-2 rounded-2xl shadow-lg shadow-purple-800">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.iconName}
          className="items-center"
          onPress={() => handleTabPress(tab)}
        >
          <View
            className={`rounded-full flex items-center justify-center ${
              activeTab === tab.screenName ? "bg-purple-200" : ""
            } ${
              tab.iconName === "grid-outline"
                ? "w-24 h-24 mt-[-3.5rem] bg-gray-100 rounded-full"
                : "w-16 h-16"
            }`}
          >
            <Ionicons
              name={tab.iconName}
              size={tab.iconName === "grid-outline" ? 45 : 28}
              color={activeTab === tab.screenName ? "#4B0082" : "black"} // Dark purple for active icon
            />
            <Text className="text-xs text-center">{tab.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
