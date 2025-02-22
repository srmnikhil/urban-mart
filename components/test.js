import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Function to get the appropriate icon for order status
function getStatusIcon(status) {
    switch (status) {
        case "Delivered":
            return <Ionicons name="checkmark-circle" size={20} color="green" />;
        case "Out for Delivery":
            return <Ionicons name="bicycle-sharp" size={20} color="orange" />;
        default:
            return <Ionicons name="time-outline" size={20} color="gray" />;
    }
}

function OrderCard({ order, cartMode, onIncrease, onDecrease, onDelete }) {
    const isOutOfStock = !order.inStock;

    return (
        <View className="w-[90%] bg-white rounded-xl shadow-lg p-4 mb-4 self-center">
            {/* Stock Status / Order ID */}
            <Text className={`text-sm ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
                {cartMode ? (isOutOfStock ? "Out of Stock" : "In Stock") : `Order ID: ${order.id}`}
            </Text>

            {/* Product Info */}
            <View className="flex-row items-center mt-3">
                <Image source={{ uri: order.image }} className="w-20 h-20 rounded-lg" resizeMode="contain" />
                <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold">{order.name}</Text>
                    <Text className="text-gray-600">₹{cartMode ? order.price * order.quantity : order.price}</Text>
                </View>
            </View>

            {/* Order Details / Quantity Controls */}
            <View className="mt-3 flex-row justify-between items-center">
                {cartMode && !isOutOfStock ? (
                    <View className="flex-row items-center">
                        {/* Decrease Quantity */}
                        <TouchableOpacity onPress={() => onDecrease(order.id)} className="bg-gray-300 p-2 rounded-lg">
                            <Text className="text-lg font-semibold">➖</Text>
                        </TouchableOpacity>

                        {/* Quantity */}
                        <Text className="mx-3 text-lg">{order.quantity}</Text>

                        {/* Increase Quantity */}
                        <TouchableOpacity onPress={() => onIncrease(order.id)} className="bg-gray-300 p-2 rounded-lg">
                            <Text className="text-lg font-semibold">➕</Text>
                        </TouchableOpacity>

                        {/* Buy for Now Button */}
                        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center ml-3">
                            <Ionicons name="flash-outline" size={18} color="white" />
                            <Text className="text-white font-semibold ml-2">Buy for Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                onPress={() => isOutOfStock ? null : onDelete(order.id)}
                className={`mt-3 py-2 rounded-lg flex-row justify-center items-center ${isOutOfStock ? "bg-gray-400" : "bg-red-500"}`}
            >
                <Ionicons name="trash-outline" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">{isOutOfStock ? "Available Soon" : "Delete"}</Text>
            </TouchableOpacity>
                    </View>
                ) : (
                    !cartMode && ( // Show status icons only when NOT in cart mode
                        <View className="flex-row items-center">
                            {getStatusIcon(order.status)}
                            <Text className="text-sm text-gray-700 ml-2">{order.status}</Text>
                        </View>
                    )
                )}
            </View>

            {/* Delete Button (Now at Buy Now's previous position) */}
            <TouchableOpacity
                onPress={() => isOutOfStock ? null : onDelete(order.id)}
                className={`mt-3 py-2 rounded-lg flex-row justify-center items-center ${isOutOfStock ? "bg-gray-400" : "bg-red-500"}`}
            >
                <Ionicons name="trash-outline" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">{isOutOfStock ? "Available Soon" : "Delete"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default OrderCard;
