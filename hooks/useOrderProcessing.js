import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOrderProcessing = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders(); // Load confirmed orders from AsyncStorage when hook initializes
    }, []);

    // Load only confirmed orders from AsyncStorage
    const loadOrders = async () => {
        try {
            const storedOrders = await AsyncStorage.getItem("orders");
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            }
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    };

    // Generate a unique order ID
    const generateOrderId = () => `ORD-${new Date().getTime()}`;

    // Handle order creation (Does NOT save to AsyncStorage)
    const createOrder = (cartItems) => {
        try {
            const orderId = generateOrderId();
            const orderDate = new Date().toLocaleString();
            const orderAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            const newOrder = {
                orderId,
                date: orderDate,
                items: cartItems,
                orderAmount,
                status: "Packaging",
                isConfirmed: false
            };

            console.log("Order Created (Not saved to storage):", newOrder);
            return newOrder; // Return the order but do not save it
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    // Confirm order (Saves to AsyncStorage)
    const confirmOrder = (order) => {
        try {
            const confirmedOrder = { ...order, status: "Order Confirmed", isConfirmed: true };
            const updatedOrders = [...orders, confirmedOrder];

            setOrders(updatedOrders);
            saveOrders(updatedOrders); // Save only confirmed orders to AsyncStorage

            console.log("Order Confirmed & Saved:", confirmedOrder);
            return confirmedOrder;
        } catch (error) {
            console.error("Error confirming order:", error);
        }
    };

    // Update order status (Only updates if the order is confirmed)
    const updateOrderStatus = (orderId, newStatus) => {
        try {
            const updatedOrders = orders.map(order =>
                order.orderId === orderId ? { ...order, status: newStatus } : order
            );

            setOrders(updatedOrders);
            saveOrders(updatedOrders); // Only confirmed orders are stored

            console.log("Order Status Updated:", orderId, newStatus);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Save only confirmed orders to AsyncStorage
    const saveOrders = async (confirmedOrders) => {
        try {
            await AsyncStorage.setItem("orders", JSON.stringify(confirmedOrders));
        } catch (error) {
            console.error("Error saving orders:", error);
        }
    };

    return { createOrder, confirmOrder, updateOrderStatus, orders, loadOrders };
};

export default useOrderProcessing;