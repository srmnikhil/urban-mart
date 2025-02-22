import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderCard from "../components/OrderCard";
import useCart from "../hooks/useCart";

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, modifyQuantity} = useCart(); // Access the cart data
    return (
        <View className="flex-1 bg-gray-100 py-6 px-4">
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
                        <OrderCard 
                            order={item} 
                            cartMode 
                            // onIncrease={increase}
                            // onDecrease={decrease} 
                            onDelete={removeFromCart}
                            modifyQuantity={modifyQuantity}
                            useCart={cart}
                        />
                    )}
                />
            ) : (
                <View className="items-center mt-10">
                    <Text className="text-lg font-semibold text-gray-600">
                        You haven't added anything!
                    </Text>
                    <TouchableOpacity className="mt-5 bg-purple-500 py-3 px-6 rounded-full active:bg-purple-700" onPress={() => navigation.navigate("Home")}>
                        <Text className="text-white font-bold text-lg">Start Buying</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Proceed to Order Button */}
            {cart.length > 0 && (
                <View className="absolute bottom-5 left-0 right-0 flex items-center">
                    <TouchableOpacity className="bg-blue-500 w-[90%] py-4 rounded-full" onPress={
                        ()=> navigation.navigate("OrderScreen")
                    }>
                        <Text className="text-white text-center text-lg font-semibold">
                            Proceed to Order ({cart.length})
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
