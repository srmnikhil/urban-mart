import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import useOrderProcessing from '../hooks/useOrderProcessing';
import Button from '../components/Button';
import useCart from "../hooks/useCart";
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { cart, removeFromCart, emptyCart, setCart } = useCart();
    const { createOrder, confirmOrder } = useOrderProcessing();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('nikhil');

    const addresses = [
        {
            id: 'nikhil',
            name: 'Nikhil Sharma',
            address: 'Mohalla Bajariya, Sahaswan, \nBudaun, Uttar Pradesh - 243638',
            phone: '9528465756'
        },
        {
            id: 'shubham',
            name: 'Shubham Maheshwari',
            address: 'Mohalla Bajariya, Sahaswan, Budaun, Uttar Pradesh - 243638',
            phone: '8077476354'
        },
        {
            id: 'prince',
            name: 'Prince Sharma',
            address: 'Nishant Colony, Pavi Pushta, Loni Dehat, Uttar Pradesh - 201102',
            phone: '9953655677'
        },
    ];

    useEffect(() => {
        if (route.params?.items) {
            const newOrder = createOrder(route.params.items);
            setCurrentOrder(newOrder);
        }
    }, [route.params?.items]);

    const handleConfirmOrder = async () => {
        if (!currentOrder || !Array.isArray(currentOrder.items) || currentOrder.items.length === 0) {
            console.error("No valid items in the order");
            return; // Early exit if the order is invalid or empty
        }

        const confirmedOrder = confirmOrder(currentOrder);
        setCurrentOrder(confirmedOrder);
        if(confirmedOrder.items.length > 1) {
            await emptyCart();
        } else {
            removeFromCart(confirmedOrder.items[0].id);
        }
        Alert.alert(
            "Success",
            "Order Placed Successfully.",
            [
                {
                    text: "Go to Home Page",
                    onPress: () => navigation.navigate("Home") // ✅ Navigate only after clicking OK
                }
            ]
        );

        // navigation.navigate('OrderConfirmationScreen', { orderId: confirmedOrder.orderId });
    };

    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity
                className="w-[90%] flex-row items-center my-4"
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text className="text-lg font-semibold ml-2">Back to Home</Text>
            </TouchableOpacity>
            <Text className="text-2xl left-4 italic font-bold mb-4">Order Details:</Text>

            <ScrollView className="p-4 flex-1">

                {currentOrder ? (
                    <View className="bg-purple-100 p-4 rounded-tl-[3rem] rounded-br-[3rem] shadow mb-4">
                        <Text className="mt-2 text-xl font-semibold">Items:</Text>
                        {currentOrder.items.map((item, index) => (
                            <View key={index} className="flex-row items-center mt-2">
                                <Image source={{ uri: item.image }} className="w-16 h-16 rounded-md mr-2" />
                                <Text className="text-lg font-semibold italic">
                                    • {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                                </Text>
                            </View>
                        ))}

                        <View className="border-b border-gray-300 my-2" />

                        <Text className="text-lg font-semibold mt-2">Amount Breakups:</Text>
                        <View className="flex-row justify-between mt-1">
                            <Text>Subtotal:</Text>
                            <Text>₹{currentOrder.subtotal || "0.00"}</Text>
                        </View>
                        <View className="flex-row justify-between mt-1">
                            <Text>Discount:</Text>
                            <Text>-₹{currentOrder.discount || "0.00"}</Text>
                        </View>
                        <View className="flex-row justify-between mt-1">
                            <Text>Delivery Charge:</Text>
                            <Text>₹{currentOrder.deliveryCharge || "0.00"}</Text>
                        </View>
                        <View className="border-b border-gray-300 my-2" />
                        <View className="flex-row justify-between">
                            <Text className="text-lg font-semibold">Total Payable:</Text>
                            <Text className="text-lg font-bold">₹{currentOrder.orderAmount}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-lg font-semibold">Payment Method:</Text>
                            <Text className="text-lg font-bold">Cash on Delivery</Text>
                        </View>

                        <Text className="mt-2 text-xs italic text-gray-500">
                            * Online payments are not supported yet. We aim to build trust before enabling digital payments.
                        </Text>
                    </View>
                ) : (
                    <Text>No orders found.</Text>
                )}

                <View className="bg-purple-100 p-4 rounded-tl-[3rem] rounded-br-[3rem] shadow mb-4">
                    <Text className="text-lg font-semibold">Select Delivery Address:</Text>
                    {addresses.map((addr) => (
                        <TouchableOpacity
                            key={addr.id}
                            className="flex-row items-center my-3"
                            onPress={() => setSelectedAddress(addr.id)}
                        >
                            <RadioButton
                                value={addr.id}
                                status={selectedAddress === addr.id ? 'checked' : 'unchecked'}
                            />
                            <View className="flex-1">
                                <Text className="font-semibold text-md">{addr.name}</Text>
                                <Text className="text-md">{addr.address}</Text>
                                {addr.phone && <Text className="text-md">{addr.phone}</Text>}
                            </View>
                            <TouchableOpacity onPress={() => alert("Edit Address Feature Coming Soon!")}>
                                <Ionicons name="pencil" size={20} color="purple" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}

                    <Button
                        width="w-full"
                        backgroundColor='bg-orange-300'
                        buttonText="+ Add New Address"
                        paddingY='py-2'
                        onPress={() => alert("Add Address Feature Coming Soon!")}
                    />
                </View>

            </ScrollView>
            <View className="sticky bottom-4 left-0 right-0 flex px-4 mt-8">
                <Button
                    width="w-full"
                    buttonText="Confirm Order"
                    onPress={handleConfirmOrder}
                    rounded='[3rem]'
                />
            </View>
        </View>

    );
};

export default OrderScreen;