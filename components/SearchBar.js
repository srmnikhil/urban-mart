import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SearchBar({ searchText, setSearchText }) {

    const handleSearchSubmit = () => {
        if (searchText.trim() === "") return;
        console.log("Search Query:", searchText);
        Keyboard.dismiss(); // Hide the keyboard
    };

    return (
        <View className="w-[90%] flex-row items-center bg-gray-100 rounded-full px-4 py-2 shadow-xl shadow-purple-800">
            {/* Search Icon */}
            <TouchableOpacity onPress={handleSearchSubmit}>
                <MaterialIcons name="search" size={24} color="gray" />
            </TouchableOpacity>
            {/* Input Field */}
            <TextInput
                className="flex-1 px-3 text-base text-purple-800"
                placeholder="Search here..."
                placeholderTextColor="gray"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearchSubmit} // Submits on Enter key (Keyboard)
                returnKeyType="search" // Changes keyboard return button to "Search"
            />

            {/* Clear Button (only visible when text is entered) */}
            {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                    <MaterialIcons name="close" size={22} color="gray" />
                </TouchableOpacity>
            )}
        </View>
    );
}
