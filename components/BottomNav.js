import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("home"); // Default active tab

  const tabs = [
    { name: "home", label: "Home" },
    { name: "shopify", label: "Your\nOrders" },
    { name: "dashboard-customize", label: "Categories" },
    { name: "shopping-cart", label: "Cart" },
    { name: "person", label: "My\nProfile" },
  ];

  return (
    <View className="flex-row w-[90%] h-20 justify-around items-center bg-gray-100 p-2 rounded-2xl shadow-lg shadow-purple-800 absolute bottom-8">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          className="items-center"
          onPress={() => setActiveTab(tab.name)}
        >
          <View
            className={`rounded-full flex items-center justify-center ${
              activeTab === tab.name ? "bg-purple-200" : ""
            } ${
              tab.name === "dashboard-customize" ? "w-24 h-24 mt-[-3.5rem] bg-gray-100 rounded-full" : "w-16 h-16"
            }`}
          >
            <MaterialIcons
              name={tab.name}
              size={tab.name === "dashboard-customize" ? 55 : 28}
              color={activeTab === tab.name ? "#4B0082" : "black"} // Dark purple for active icon
            />
            <Text className="text-xs text-center">{tab.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
