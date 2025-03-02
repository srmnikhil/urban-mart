import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderItemCard from "../components/OrderItemCard";
import useOrderProcessing from "../hooks/useOrderProcessing";
import Button from "../components/Button";

export default function YourOrders({ navigation }) {
    const { orders } = useOrderProcessing();

    return (
        <View className="flex-1 bg-white py-6 px-4">
            {/* Back to Home */}
            <TouchableOpacity
                className="flex-row items-center mb-4"
                onPress={() => navigation.navigate("Home")} // Navigate back
            >
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text className="text-lg font-semibold ml-2">Back to Home</Text>
            </TouchableOpacity>

            {/* Page Title */}
            <Text className="text-2xl font-bold mb-4">Your Orders</Text>

            {/* Orders List */}
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(selectedItem) => selectedItem.orderId}
                    renderItem={({ item }) => <OrderItemCard order={item} />}
                    contentContainerStyle={{ width: "100%", alignSelf: "center" }}
                />
            ) : (
                <View className="items-center mt-10">
                    <Text className="text-lg font-semibold text-gray-600 mb-5">
                        You haven't made any purchases yet!
                    </Text>
                    <Button
                        buttonText="Start Buying"
                        onPress={() => navigation.navigate("Home")}
                        backgroundColor="bg-purple-500"
                        extraClassName="py-3 px-6"
                    />
                </View>
            )}
        </View>
    );
}
