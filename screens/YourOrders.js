import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderCard from "../components/OrderCard";

// Dummy Data for Orders (Replace with API data)
const orders = [
    {
        id: "ORD123456",
        name: "Green Tea",
        price: "299",
        status: "Delivered",
        date: "15 Feb 2025",
        image: "https://oodlabari.co.in/Assets/ProductImage/64f79d9e-9e89-4082-9964-87da1c4c8dd7.png",
    },
    {
        id: "ORD789012",
        name: "Kurkure (75gm) x 5",
        price: "99",
        status: "Out for Delivery",
        date: "18 Feb 2025",
        image: "https://cdn.dribbble.com/userupload/15776671/file/original-0b38f1a9a0922c08bf670c28bdad7e23.jpg?resize=400x0",
    },
];

export default function YourOrders({ navigation }) {
    return (
        <View className="flex-1 bg-gray-100 py-6 px-4">
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
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <OrderCard order={item} />}
                    contentContainerStyle={{ width: "100%", alignSelf: "center" }}
                />
            ) : (
                <View className="items-center mt-10">
                    <Text className="text-lg font-semibold text-gray-600">
                        You haven't made any purchases yet!
                    </Text>
                    <TouchableOpacity className="mt-5 bg-purple-500 py-3 px-6 rounded-full active:bg-purple-700" onPress={() => navigation.navigate("Home")}>
                        <Text className="text-white font-bold text-lg">Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

// function OrderCard({ order }) {
//     return (
//         <View className="w-[90%] bg-white rounded-xl shadow-lg p-4 mb-4 self-center">
//             {/* Order ID */}
//             <Text className="text-gray-500 text-sm">Order ID: {order.id}</Text>

//             {/* Product Info */}
//             <View className="flex-row items-center mt-3">
//                 <Image source={{uri : order.image}} className="w-20 h-20 rounded-lg" resizeMode="contain" />
//                 <View className="ml-4 flex-1">
//                     <Text className="text-lg font-semibold">{order.name}</Text>
//                     <Text className="text-gray-600">{order.price}</Text>
//                 </View>
//             </View>

//             {/* Order Details */}
//     <View className="mt-3 flex-row justify-between items-center">
//         <View className="flex-row items-center">
//             {getStatusIcon(order.status)}
//             <Text className="text-sm text-gray-700 ml-2">{order.status}</Text>
//         </View>
//         <Text className="text-sm text-gray-700">📅 {order.date}</Text>
//     </View>
// </View>
//     );
// }
