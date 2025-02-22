import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Function to get the appropriate icon for order status
function getStatusIcon(status, cartMode) {
    switch (status) {
        case "Delivered":
            return <Ionicons name="checkmark-circle" size={20} color={"green"} />;
        case "Out for Delivery":
            return <Ionicons name="bicycle-sharp" size={20} color={"orange"} />;
        default:
            return <Ionicons name="time-outline" size={20} color={cartMode ? "white" : "gray"} />;
    }
}

function OrderCard({ order, cartMode, onDelete, modifyQuantity, useCart }) {
    const isOutOfStock = !order.inStock;
    const statusIcon = getStatusIcon(order.status, cartMode);
    const [quantity, setQuantity] = useState(1); // Default quantity set to 1

    // Fetch the latest quantity from useCart or cart data
    useEffect(() => {
        if (cartMode) {
            const cartItem = useCart.find(item => item.id === order.id);
            if (cartItem) {
                setQuantity(cartItem.quantity); // Update state with latest cart quantity
            }
        }
    }, [useCart, order.id]);

    // Handle quantity change from input
    const handleQuantityChange = (value) => {
        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
            setQuantity(num);
            modifyQuantity(order.id, num, 'set'); // Use 'set' action to directly set the quantity
        }
    };

    const handleIncrease = () => {
        // Increase quantity by 1
        modifyQuantity(order.id, quantity, 'increase'); // Use 'increase' action to increment
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity); // Set quantity to the updated value
    };

    const handleDecrease = () => {
        // Decrease quantity by 1, ensuring it does not go below 1
        modifyQuantity(order.id, quantity, 'decrease'); // Use 'decrease' action to decrement
        const updatedQuantity = quantity - 1 < 1 ? 1 : quantity - 1; // Prevent going below 1
        setQuantity(updatedQuantity); // Set quantity to the updated value
    };

    return (
        <View className="w-[90%] bg-white rounded-xl shadow-lg p-4 mb-4 self-center">
            {/* Stock Status / Order ID */}
            <Text className={`text-sm ${cartMode ? (isOutOfStock ? "text-red-600" : "text-green-600") : "text-gray-700"}`}>
                {cartMode ? (isOutOfStock ? "Out of Stock" : "In Stock") : `Order ID: ${order.id}`}
            </Text>

            {/* Product Info */}
            <View className="flex-row items-center mt-3">
                <Image source={{ uri: order.image }} className="w-20 h-20 rounded-lg" resizeMode="contain" />
                <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold">{order.name}</Text>
                    <Text className="text-gray-600">₹{cartMode ? order.price * quantity : order.price}</Text>
                </View>
            </View>

            {/* Order Details or Quantity Controls */}
            <View className="mt-3 flex-row justify-between items-center">
                {cartMode ? (
                    !isOutOfStock ? (
                        // Quantity Controls (Only when in stock)
                        <View className="flex-row items-center justify-center gap-x-4">
                            <View className="flex-row flex-1 h-10 bg-gray-300 rounded-lg justify-center items-center">
                                <TouchableOpacity onPress={handleDecrease} className="p-2">
                                    <Text className="text-lg font-semibold">➖</Text>
                                </TouchableOpacity>

                                {/* Quantity Input */}
                                <TextInput
                                    className="text-lg font-semibold text-center bg-white px-2 rounded-md"
                                    style={{ width: 50, height: 40 }}
                                    keyboardType="number-pad"
                                    value={quantity.toString()}
                                    onChangeText={handleQuantityChange}
                                />
                                <TouchableOpacity onPress={handleIncrease} className="p-2">
                                    <Text className="text-lg font-semibold">➕</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Buy Now Button */}
                            <TouchableOpacity className="flex-1 h-10 bg-green-500 rounded-lg flex-row justify-center items-center">
                                <Ionicons name="flash-outline" size={18} color="white" />
                                <Text className="text-white font-semibold ml-1">Buy for Now</Text>
                            </TouchableOpacity>

                            {/* Delete Button */}
                            <TouchableOpacity
                                onPress={() => onDelete(order.id)}
                                className="h-10 rounded-lg flex-row justify-center items-center px-3"
                            >
                                <Ionicons name="trash-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // "Available Soon" Message (Full height when Out of Stock)
                        <View className="h-10 w-full rounded-lg flex-row items-center justify-center bg-gray-400">
                            {statusIcon}
                            <Text className="text-white font-semibold text-center ml-2">Available Soon</Text>
                        </View>
                    )
                ) : (
                    // Status and Order Date (Only when cartMode is false)
                    order.status && order.date && (
                        <View className="flex-row items-center w-full">
                            <View className="flex-row items-center">
                                {statusIcon}
                                <Text className="text-sm text-gray-700 ml-2">{order.status}</Text>
                            </View>
                            <Text className="text-sm text-gray-700 ml-auto">📅 {order.date}</Text>
                        </View>
                    )
                )}
            </View>
        </View>
    );
}

export default OrderCard;
