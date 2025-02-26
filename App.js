import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Updates from 'expo-updates';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import YourOrders from './screens/YourOrders';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme(); // System theme detect karega (light ya dark mode)
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "Update Available",
          "A new update is ready. Update now to get the latest features!",
          [
            {
              text: "Update the App",
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
            },
          ]
        );
      } else {
        Alert.alert("You're Up-to-Date", "No updates available right now.", [
          { text: "OK", style: "cancel" },
        ]);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
      Alert.alert("Error", "Failed to check for updates.");
    }
  };

  useEffect(() => {
    checkForUpdate();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {/* Status bar dark/light mode ke hisaab se adjust hoga */}
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? 'black' : 'white'}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} initialParams={{ checkForUpdate }} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderScreen" component={OrderScreen} />
          <Stack.Screen name="Orders" component={YourOrders} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
