import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const AddDeliveryAddressScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');

  const handleSave = () => {
    if (!address || !city || !pincode || !state) {
      Alert.alert("Missing Info", "Please fill out all required fields.");
      return;
    }

    // You could post this to backend here
    Alert.alert("Success", "Address added successfully!");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white px-6 pt-10 pb-20">
      <Text className="text-3xl font-bold text-gray-800 mb-8">Add Delivery Address</Text>

      <View className="mb-5">
        <Text className="text-sm text-gray-700 mb-2">Address Line*</Text>
        <TextInput
          placeholder="House No, Street, Area"
          value={address}
          onChangeText={setAddress}
          className="border border-gray-300 rounded-xl p-4 text-base bg-white"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm text-gray-700 mb-2">City*</Text>
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          className="border border-gray-300 rounded-xl p-4 text-base bg-white"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm text-gray-700 mb-2">Pincode*</Text>
        <TextInput
          placeholder="6-digit Postal Code"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          className="border border-gray-300 rounded-xl p-4 text-base bg-white"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm text-gray-700 mb-2">State*</Text>
        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          className="border border-gray-300 rounded-xl p-4 text-base bg-white"
        />
      </View>

      <View className="mb-8">
        <Text className="text-sm text-gray-700 mb-2">Landmark (optional)</Text>
        <TextInput
          placeholder="Nearby landmark"
          value={landmark}
          onChangeText={setLandmark}
          className="border border-gray-300 rounded-xl p-4 text-base bg-white"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-indigo-600 p-4 rounded-full shadow-md"
      >
        <Text className="text-white text-center text-lg font-semibold">Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddDeliveryAddressScreen;
