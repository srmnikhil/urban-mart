import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItemCard from "../components/CartItemCard";
import useCart from "../hooks/useCart";
import Button from "../components/Button";

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, modifyQuantity } = useCart(); // Access the cart data

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("Home"); // Back press goes to Home
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [navigation]);

    // Proceed with all cart items
    const handleProceedToOrder = () => {
        if (cart.length > 0) {
            navigation.navigate("OrderScreen", { items: cart });
        }
    };

    // Buy now for a single item
    const handleBuyForNow = (item) => {
        navigation.navigate("OrderScreen", { items: [item] }); // Pass only the selected item
    };

    return (
        <View className="flex-1 py-6 bg-white px-4">
            {/* Back to Home */}
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="flex-row items-center mb-4">
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text className="text-lg font-semibold ml-2">Back to Home</Text>
            </TouchableOpacity>

            {/* Page Title */}
            <Text className="text-2xl font-bold mb-4">Your Cart</Text>

            {/* Cart Items */}
            {cart.length > 0 ? (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CartItemCard
                            order={item}
                            cartMode
                            onDelete={removeFromCart}
                            modifyQuantity={modifyQuantity}
                            useCart={cart}
                            onBuyForNow={() => handleBuyForNow(item)} // 🔹 Pass single item for immediate purchase
                        />
                    )}
                />
            ) : (
                <View className="items-center mt-10">
                    <Text className="text-lg font-semibold text-gray-600 mb-10">
                        It seems that your Cart is still empty!
                    </Text>
                    <Button
                        buttonText="Start Buying"
                        onPress={() => navigation.navigate("Home")}
                        backgroundColor="bg-purple-500"
                        extraClassName="py-3 px-6"
                    />
                </View>
            )}

            {/* Proceed to Order Button */}
            {cart.length > 0 && (
                <View className="absolute bottom-5 left-0 right-0 flex items-center">
                    <Button
                        buttonText={`Proceed to Order (${cart.length})`}
                        onPress={handleProceedToOrder}
                        backgroundColor="bg-violet-700"
                        width="w-[90%]"
                        rounded="[3rem]"
                    />
                </View>
            )}
        </View>
    );
}
