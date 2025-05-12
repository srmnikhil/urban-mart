import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton, Button } from 'react-native-paper';

const initialAddresses = [
    {
        id: '1',
        title: '🏠 Home',
        address: '123 Main St, Sahaswan, Budaun, UP - 243638',
    },
    {
        id: '2',
        title: '🏢 Work',
        address: '456 Office Rd, Noida Sector 62, UP - 201301',
    },
    {
        id: '3',
        title: '🏡 Parents House',
        address: 'Village Khaspura, Near Shiv Mandir, Post Kunwargaon, Tehsil Bilsi, District Budaun, Uttar Pradesh - 243601',
    },
];

export default function SavedAddressesScreen() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedId, setSelectedId] = useState(null);
    const [defaultId, setDefaultId] = useState(null);

    const handleSetAsDefault = () => {
        const selectedIndex = addresses.findIndex((addr) => addr.id === selectedId);
        if (selectedIndex === -1) return;

        const updatedAddresses = [...addresses];
        const [selectedItem] = updatedAddresses.splice(selectedIndex, 1);
        updatedAddresses.unshift(selectedItem);
        setAddresses(updatedAddresses);
        setDefaultId(selectedItem.id);
        setSelectedId(null);
    };

    const handleEdit = (item) => {
        Alert.alert('Edit', `Editing address: ${item.title}`);
    };

    const handleDelete = (item) => {
        Alert.alert('Delete', `Deleting address: ${item.title}`);
    };

    const handleAddNewAddress = () => {
        Alert.alert('Add', 'Navigating to add new address screen...');
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedId === item.id;
        const isDefault = defaultId === item.id;

        return (
            <View className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-md">
                <View className="flex-row items-center">
                    <View>
                        <RadioButton
                            value={item.id}
                            status={isSelected ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedId(item.id)}
                        />
                    </View>

                    <View className="flex-1 ml-2">
                        <View className="flex-row justify-between">
                            <Text className="text-xl font-bold text-gray-800">
                                {item.title} {isDefault ? '(Default)' : ''}
                            </Text>
                            <View className="flex-row">
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <Ionicons name="pencil" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item)} className="ml-4">
                                    <Ionicons name="trash" size={20} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text className="text-gray-700 mt-1">{item.address}</Text>

                        {isSelected && defaultId !== item.id && (
                            <Button
                                mode="contained"
                                className="mt-4 bg-teal-600 rounded-tl-3xl rounded-br-3xl"
                                onPress={handleSetAsDefault}
                            >
                                Set as Default Address
                            </Button>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <View className="px-5 pt-14 pb-4">
                <Text className="text-3xl font-bold text-gray-900 mb-6">Saved Addresses</Text>
            </View>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
                extraData={{ selectedId, defaultId }}
            />

            {/* Fixed Add Button at Bottom */}
            <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-200">
                <Button
                    mode="contained"
                    onPress={handleAddNewAddress}
                    className="bg-teal-600 rounded-xl"
                    labelStyle={{ paddingVertical: 4 }}
                >
                    Add New Address
                </Button>
            </View>
        </View>
    );
}
