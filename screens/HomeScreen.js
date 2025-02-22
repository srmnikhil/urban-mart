import { View, FlatList, ScrollView, Text, TouchableOpacity, Linking } from "react-native";
import { useState } from "react";
import useCart from '../hooks/useCart';
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import BottomNav from "../components/BottomNav";
import Items from "../components/Items";
import products from "../data/dummyProducts";

export default function HomeScreen() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { cart, addToCart } = useCart();

    const categories = ["All", ...new Set(products.map((product) => product.category))]; // Get unique categories from products
    // Filter products based on search query
    const filteredProducts = products.filter(
        (item) =>
            (selectedCategory === "All" || item.category === selectedCategory) &&
            (item.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
                item.category.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <View className="w-full items-center flex-1 py-4">
            {/* Search Bar - Stays at the Top */}
            <View className="z-10 my-2">
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </View>

            {/* Scrollable Content */}
            <View className="flex-grow w-full">
                {/* <Banner /> */}
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <Items product={item} addToCart={addToCart} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Two items per row
                    ListHeaderComponent={
                        <>
                            <Banner />
                            {/* Category Filter Buttons - Just After Banner */}
                            <View className="flex-row items-center mb-4 mt-2">
                                {/* Scrollable Filter Section */}
                                <ScrollView horizontal className="flex-1">
                                    {categories.map((category) => (
                                        <TouchableOpacity
                                            key={category}
                                            className={`px-5 py-2 mx-1 rounded-xl ${selectedCategory === category ? "bg-violet-950" : "bg-purple-800"}`}
                                            onPress={() => setSelectedCategory(category)}
                                        >
                                            <Text className={`text-lg text-white ${selectedCategory === category ? "font-bold" : "font-semibold"}`}>
                                                {category}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                {/* Vertical Separator Line */}
                                <View className="h-8 w-[1px] bg-gray-300 mx-2" />

                                {/* Fixed "Sort By" Button */}
                                <TouchableOpacity
                                    className="px-4 py-2 rounded-xl border border-purple-600"
                                    onPress={() => console.log("Sort By Pressed")}
                                >
                                    <Text className="text-purple-600 text-lg font-semibold">Sort By</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Show No Results Message */}
                            {filteredProducts.length === 0 && (
                                <View className="items-center my-6 p-4 bg-gray-100 rounded-lg shadow-md">
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
                                    {/* Contact Team Button */}
                                    <TouchableOpacity
                                        className="mt-4 px-6 py-3 bg-green-600 rounded-lg"
                                        onPress={() => {
                                            const message = `Hello UrbanMart Team, I’m a user of your app. I’m looking for "${searchText}". Please add it soon and notify me when available.`;
                                            const phoneNumber = "+919528465756";
                                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            Linking.openURL(url);
                                        }}
                                    >
                                        <Text className="text-white text-lg font-semibold">Contact Team</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    }
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 80, marginVertical: 10 }}
                    style={{ flex: 1 }}
                />
            </View>

            {/* Bottom Navigation - Fixed at Bottom */}
            <View className="bottom-5 items-center w-full my-2">
                <BottomNav />
            </View>
        </View>
    );
}
