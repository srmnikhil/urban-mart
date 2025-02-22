import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const useOrderProcessing = () => {
    const [orders, setOrders] = useState([]);
    
    // Generate a unique order ID (could be based on timestamp or any other method)
    const generateOrderId = () => {
        return `ORD-${new Date().getTime()}`;
    };

    // Handle order creation
    const createOrder = async (cartItems) => {
        try {
            // Generate order details
            const orderId = generateOrderId();
            const orderDate = new Date().toLocaleString();
            const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            // Create a new order object
            const newOrder = {
                orderId,
                date: orderDate,
                items: cartItems,
                totalAmount,
                status: "Packaging", // Default status
            };

            // Add to orders state
            setOrders(prevOrders => [...prevOrders, newOrder]);

            // Save to AsyncStorage
            const savedOrders = await AsyncStorage.getItem('orders');
            const updatedOrders = savedOrders ? [...JSON.parse(savedOrders), newOrder] : [newOrder];
            await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));

            console.log("Order Created:", newOrder);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    // Handle updating the status of an order (e.g., "Packing", "Shipped", "Delivered")
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const updatedOrders = orders.map((order) => 
                order.orderId === orderId ? { ...order, status: newStatus } : order
            );
            setOrders(updatedOrders);

            // Save updated orders to AsyncStorage
            await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
            console.log("Order status updated:", orderId, newStatus);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Fetch orders from AsyncStorage
    const loadOrders = async () => {
        try {
            const savedOrders = await AsyncStorage.getItem('orders');
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            }
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    };

    return { createOrder, updateOrderStatus, loadOrders, orders };
};

export default useOrderProcessing;
