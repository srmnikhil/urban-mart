import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

// Modified version of the useCart hook
const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart(); // Load cart items when the app starts
    }, []);

    const loadCart = async () => {
        try {
            const cartData = await AsyncStorage.getItem('cart');
            if (cartData) {
                setCart(JSON.parse(cartData));
            }
        } catch (error) {
            console.error("Failed to load cart", error);
        }
    };

    // Modify quantity function: can handle 'increase', 'decrease', and 'set'
    const modifyQuantity = async (productId, quantity, actionType = 'set') => {
        try {
            if (actionType === 'increase') {
                quantity += 1;
            } else if (actionType === 'decrease') {
                quantity -= 1;
                if (quantity < 1) quantity = 1; // Prevent going below 1
            }

            // Handle 'set' action (manually setting the quantity)
            if (actionType === 'set' && quantity < 1) {
                console.error("Quantity cannot be less than 1");
                return;
            }

            const updatedCart = cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );

            // Update state and AsyncStorage
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);

            console.log(`Updated quantity for product ${productId} to ${quantity}`);
        } catch (error) {
            console.error("Error modifying quantity", error);
        }
    };

    // Add product to cart
    const addToCart = async (product) => {
        try {
            const cartData = await AsyncStorage.getItem('cart');
            const existingCart = cartData ? JSON.parse(cartData) : [];

            const existingItem = existingCart.find((item) => item.id === product.id);

            if (existingItem) {
                console.log("Product already in cart:", product.name);
                return; // Prevent duplicate additions
            }

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                inStock: product.inStock,
                quantity: 1, // Default quantity
            };

            const updatedCart = [...existingCart, newProduct];

            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); // Update AsyncStorage
            setCart(updatedCart); // Update state

            console.log("Added to cart:", newProduct);
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    // Remove product from cart
    const removeFromCart = async (productId) => {
        try {
            const updatedCart = cart.filter((item) => item.id !== productId);
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); // Update AsyncStorage
            setCart(updatedCart); // Update state

            console.log("Removed from cart:", productId);
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    };

    const emptyCart = async () => {
        try {
            const updatedCart = [];
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); // Update AsyncStor
            setCart(updatedCart); // Update state
            
            console.log("Cart empty successfully");
        } catch (error) {
            console.error("Error empty cart", error);
        }
    };

    return { cart, addToCart, removeFromCart, modifyQuantity, emptyCart, setCart };
};

export default useCart;
