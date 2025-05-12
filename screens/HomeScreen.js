import { View, FlatList, ScrollView, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import useCart from "../hooks/useCart";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import BottomNav from "../components/BottomNav";
import ItemCard from "../components/ItemCard";
import products from "../data/dummyProducts";
import { Ionicons } from "@expo/vector-icons"; // Import Icon for reload button
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../components/Button";

export default function HomeScreen() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { cart, addToCart } = useCart();
    const navigation = useNavigation();

    const requestTeam = (product) => {
        const message = `Hello UrbanMart Team, I’m a *user* of your app. I’m looking for *${searchText || product?.name}*. Please add it soon and notify me when available.`;
        const phoneNumber = "+918077476354";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Error", "WhatsApp is not installed.");
                }
            })
            .catch((err) => console.error("An error occurred", err));
    }

    const checkAsyncStorage = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const allData = await AsyncStorage.multiGet(allKeys);
            console.log("📦 AsyncStorage Data:", allData);
        } catch (error) {
            console.error("❌ Error fetching AsyncStorage data", error);
        }
    };

    // checkAsyncStorage();
    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log("✅ AsyncStorage cleared successfully!");
        } catch (error) {
            console.error("❌ Error clearing AsyncStorage", error);
        }
    };
    // clearAsyncStorage();

    const categories = ["All", ...new Set(products.map((product) => product.category))];

    const filteredProducts = products.filter(
        (item) =>
            (selectedCategory === "All" || item.category === selectedCategory) &&
            (item.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
                item.category.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <View className="w-full bg-white items-center flex-1 py-4">
            {/* Search Bar with Reload Button */}
            <View className="z-10 flex-row items-center w-full px-4 mb-2">
                <View className="flex-1">
                    <SearchBar searchText={searchText} setSearchText={setSearchText} />
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("NotificationScreen")}>
                    <Ionicons name="notifications" size={24} color="purple" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <View className="flex-grow w-full">
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <ItemCard product={item} addToCart={addToCart} cart={cart} requestTeam={requestTeam} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    ListHeaderComponent={
                        <>
                            <Banner />
                            <View className="flex-row items-center my-4">
                                <ScrollView horizontal className="flex-1">
                                    {categories.map((category) => (
                                        <TouchableOpacity
                                            key={category}
                                            className={`px-5 py-2 mx-1 rounded-tl-3xl rounded-br-3xl ${selectedCategory === category ? "bg-violet-950" : "bg-purple-800"
                                                }`}
                                            onPress={() => setSelectedCategory(category)}
                                        >
                                            <Text
                                                className={`text-lg text-white ${selectedCategory === category ? "font-bold" : "font-semibold"
                                                    }`}
                                            >
                                                {category}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <View className="h-8 w-[2px] bg-gray-300 mx-2" />

                                <TouchableOpacity
                                    className="px-4 py-2 rounded-tl-3xl rounded-br-3xl border border-purple-600"
                                    onPress={() => alert("Sort By feature is coming Soon!")}
                                >
                                    <Text className="text-purple-600 text-lg font-semibold">Sort By</Text>
                                </TouchableOpacity>
                            </View>

                            {filteredProducts.length === 0 && (
                                <View className="items-center my-6 p-4 bg-purple-100 rounded-tl-[3rem] rounded-br-[3rem] border-2 border-purple-200 shadow-md">
                                    <Text className="text-gray-800 text-xl font-semibold text-center">
                                        Oops! Item Not Available 😔
                                    </Text>
                                    <Text className="text-gray-600 text-base text-center mt-2">
                                        We're sorry, but this item isn’t available at the moment.{"\n"}
                                        It will be listed soon, so check back later! 🚀
                                    </Text>
                                    <Text className="text-gray-500 text-sm text-center mt-2 italic">
                                        — Thank you for choosing UrbanMart! 🛍️
                                    </Text>
                                    <Button
                                        buttonText="Request Team"
                                        onPress={requestTeam}
                                        width="w-3/4"
                                        paddingY="py-2"
                                        backgroundColor="bg-teal-400"
                                        extraClassName="mt-4"
                                        iconName="logo-whatsapp"
                                    />
                                </View>
                            )}
                        </>
                    }
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 80, marginVertical: 10 }}
                    style={{ flex: 1 }}
                />
            </View>

            {/* Bottom Navigation */}
            <View className="bottom-5 items-center w-full my-2">
                <BottomNav />
            </View>
        </View>
    );
}
