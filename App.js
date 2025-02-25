import React, { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Updates from 'expo-updates'; // Import expo-updates to check for updates
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import YourOrders from './screens/YourOrders';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // useEffect to check for updates when the app opens
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync(); // Check if there's an update
        if (update.isAvailable) {
          // If update is available, show the alert
          Alert.alert(
            'New Update Available',
            'A new update has arrived. Please update the app.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  // If user clicks 'OK', fetch the update
                  await Updates.fetchUpdateAsync();
                  // Reload the app to apply the update
                  Updates.reloadAsync();
                },
              },
            ]
          );
        }
      } catch (error) {
        console.error('Error checking for updates', error);
      }
    };

    checkForUpdates(); // Run the update check on app load
  }, []); // Empty dependency array ensures this runs only on first render

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="Orders" component={YourOrders} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
