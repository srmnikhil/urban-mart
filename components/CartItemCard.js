import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

function OrderCard({ order, onDelete, modifyQuantity, useCart, onBuyForNow }) {
    const isOutOfStock = !order.inStock;
    const [quantity, setQuantity] = useState(1); // Default quantity set to 1

    // Fetch the latest quantity from useCart or cart data
    useEffect(() => {
        const cartItem = useCart.find(item => item.id === order.id);
        if (cartItem) {
            setQuantity(cartItem.quantity); // Update state with latest cart quantity
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
        <View className="bg-purple-200 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg p-4 mb-4 self-center">
            {/* Stock Status */}
            <Text className={`text-sm ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Text>

            {/* Product Info */}
            <View className="flex-row items-center mt-3">
                <Image source={{ uri: order.image }} className="w-20 h-20 rounded-lg" resizeMode="contain" />
                <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold">{order.name}</Text>
                    <Text className="text-gray-600">₹{order.price * quantity}</Text>
                </View>
            </View>

            {/* Quantity Controls */}
            <View className="mt-3 flex-row justify-between items-center">
                {!isOutOfStock ? (
                    // Quantity Controls (Only when in stock)
                    <View className="flex-row items-center justify-center gap-x-10">
                        <View className="flex-row flex-1 h-10 bg-purple-500 rounded-tl-3xl rounded-br-3xl justify-center items-center ">
                            <TouchableOpacity onPress={handleDecrease} className="p-2">
                                <Ionicons name="remove-circle" size={22} color="white" />
                            </TouchableOpacity>

                            {/* Quantity Input */}
                            <TextInput
                                className="text-lg font-semibold text-center bg-purple-200"
                                style={{ width: 40, height: 40 }}
                                keyboardType="number-pad"
                                value={quantity.toString()}
                                onChangeText={handleQuantityChange}
                            />
                            <TouchableOpacity onPress={handleIncrease} className="p-2">
                                <Ionicons name="add-circle" size={22} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Buy Now Button */}
                        <TouchableOpacity
                            className="flex-1 h-10 bg-purple-500 rounded-br-3xl rounded-tl-3xl flex-row justify-center items-center"
                            onPress={onBuyForNow}
                        >
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
                    <Button
                        buttonText="Available Soon"
                        paddingY="py-2"
                        backgroundColor="bg-gray-400"
                        width="w-full"
                        iconName="time-outline"
                        isDisabled
                    />
                )}
            </View>
        </View>
    );
}

export default OrderCard;
