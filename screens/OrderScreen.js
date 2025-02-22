import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import useOrderProcessing from '../hooks/useOrderProcessing'; // Import the hook

const OrderScreen = () => {
    const { createOrder, orders, loadOrders } = useOrderProcessing();
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    // Example cart data
    const cartItems = [
        { id: 1, name: 'Product 1', price: 500, quantity: 2 },
        { id: 2, name: 'Product 2', price: 300, quantity: 1 },
    ];

    useEffect(() => {
        loadOrders(); // Load orders when the screen is mounted
    }, []);

    // Function to request location permission
    // const requestLocationPermission = async () => {
    //     try {
    //         const permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //         if (permissionStatus === 'granted') {
    //             console.log('Location permission granted');
    //             return true;
    //         } else {
    //             console.log('Location permission denied');
    //             return false;
    //         }
    //     } catch (error) {
    //         console.log('Permission request error:', error);
    //         return false;
    //     }
    // };

    // Function to fetch the user's location
    const fetchLocation = async () => {
        const hasPermission = await requestLocationPermission(); // Request permission first
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Location permission is required to proceed.');
            return;
        }

        // Set a timeout to cancel location fetch after 5 seconds
        const timeout = setTimeout(() => {
            setLocationError('Location fetch timed out');
            Alert.alert('Location Fetch Failed', 'Proceeding with order without location.');
        }, 5000);

        Geolocation.getCurrentPosition(
            (position) => {
                clearTimeout(timeout); // Clear the timeout if location is fetched
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationError(null); // Clear any error if location is successfully fetched
            },
            (error) => {
                clearTimeout(timeout);
                setLocationError(error.message);
                Alert.alert('Error', `Could not fetch location: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handlePlaceOrder = () => {
        fetchLocation(); // Attempt to fetch location

        // Wait a moment before proceeding with order creation
        setTimeout(() => {
            createOrder(cartItems, location); // Create order with location if fetched
        }, 2000); // Giving some time before placing the order
    };

    return (
        <View className="p-4">
            <Text className="text-2xl font-bold mb-4">Your Orders</Text>

            <TouchableOpacity
                className="bg-blue-500 rounded-lg p-3 mb-4"
                onPress={handlePlaceOrder}
            >
                <Text className="text-white text-center text-lg">Place Order</Text>
            </TouchableOpacity>

            {orders.length > 0 && orders.map((order) => (
                <View key={order.orderId} className="bg-white p-4 rounded-lg shadow mb-4">
                    <Text className="text-lg font-semibold">Order ID: {order.orderId}</Text>
                    <Text>Status: {order.status}</Text>
                    <Text>Total: ₹{order.totalAmount}</Text>
                    <Text>Date: {order.date}</Text>
                </View>
            ))}

            {/* Show location error or success */}
            {locationError && (
                <Text className="text-red-600 mt-2">Error: {locationError}</Text>
            )}

            {location && (
                <Text className="text-green-600 mt-2">
                    Location: {location.latitude}, {location.longitude}
                </Text>
            )}
        </View>
    );
};

export default OrderScreen;
