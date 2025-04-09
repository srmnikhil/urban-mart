import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button"

// Function to get the appropriate icon for order status
function getStatusIcon(status) {
    switch (status) {
        case "Delivered":
            return <Ionicons name="checkmark-circle" size={20} color={"green"} />;
        case "Out for Delivery":
            return <Ionicons name="bicycle-sharp" size={20} color={"orange"} />;
        case "Packaging":
            return <Ionicons name="cube" size={20} color={"orange"} />;
        default:
            return <Ionicons name="time-outline" size={20} color={"gray"} />;
    }
}

const formatDate = (dateString) => {
    // Split the date and time
    const [datePart, timePart] = dateString.split(', ');

    // Split the date into day, month, and year
    const [day, month, year] = datePart.split('/');

    // Get the hour and minute from the time part
    const [hours, minutes] = timePart.split(':');

    // Convert the month number to short form (e.g., 03 -> MAR)
    const monthAbbr = new Date(year, month - 1).toLocaleString('default', { month: 'short' }).toUpperCase();

    // Slice the year to get the last two digits (e.g., 2025 -> 25)
    const shortYear = year.slice(-2);

    // Format the date as DDMMMYY HH:MM
    return `${monthAbbr} ${day}, ${shortYear} ${hours}:${minutes}`;
};

const OrderItemCard = ({ order }) => {
    return (
        <View className="w-full bg-purple-100 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg p-4 mb-4 self-center">
            {/* Order Details */}
            <View className="flex-row justify-between">
                <Text className="text-sm font-semibold">📦 {order.orderId}</Text>
                <Text className="text-sm font-semibold">📅 {order.date}</Text>
            </View>

            {/* Ordered Items */}
            <Text className="mt-2 text-lg font-semibold">Ordered Items: {order.items.length}</Text>
            <ScrollView className="mt-2">
                {order.items.map((item, index) => (
                    <View key={index}>
                        <View className="flex-row items-center">
                            <Image source={{ uri: item.image }} className="w-16 h-16 rounded-md mr-2" />
                            <View className="flex-1">
                                <Text className="text-lg font-semibold">{item.name} x {item.quantity}</Text>
                                <Text className="text-sm">₹{item.price}</Text>
                            </View>
                        </View>
                        {/* Separator Line */}
                        {index < order.items.length - 1 && (
                            <View className="border-b border-gray-300 my-3" />
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Invoice Value & Status */}
            <View className="flex-row justify-between mt-2">
                <View className="flex-row items-center">
                    {getStatusIcon(order.status)}
                    <Text className="ml-1 text-sm">{order.status}</Text>
                </View>
                <Text className="text-lg font-bold">₹{order.orderAmount}/-</Text>
            </View>

            {/* Download Invoice Button */}
            <View className="mt-2">
                <Button
                    backgroundColor="bg-orange-400"
                    buttonText="Download Bill Receipt"
                    onPress={() => alert("Download Invoice Feature Coming Soon!")}
                    paddingY="py-2"
                    iconName="receipt-outline"
                />
            </View>
        </View>
    );
};

export default OrderItemCard;
