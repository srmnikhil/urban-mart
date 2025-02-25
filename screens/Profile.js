import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Icons library

export default function Profile({ navigation }) {

    // Function to handle logout confirmation
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: () => console.log("User logged out") }
            ]
        );
    };

    return (
        <View className="flex-1 items-center bg-gray-100 py-6">

            {/* Back to Home Button */}
            <TouchableOpacity
                className="w-[90%] flex-row items-center mb-4"
                onPress={() => navigation.goBack()} // Navigates back
            >
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text className="text-lg font-semibold ml-2">Back to Home</Text>
            </TouchableOpacity>

            {/* Profile Picture with Edit Icon */}
            <View className="w-1/2 h-40 my-4 items-center relative">
                <Image
                    source={require("../assets/profile.png")}
                    className="w-full h-36 rounded-full"
                    resizeMode="contain"
                />
                {/* Edit Profile Icon */}
                <TouchableOpacity className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Ionicons name="pencil" size={20} color="black" />
                </TouchableOpacity>
                <Text className="my-4 text-xl font-bold">Profile</Text>
            </View>

            {/* User Details Box */}
            <View className="w-[90%] rounded-tl-[4rem] rounded-br-[4rem] mt-5 bg-purple-200 p-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold">User Details</Text>
                    {/* Edit Icon for User Details */}
                    <TouchableOpacity>
                        <Ionicons name="pencil" size={22} color="black" />
                    </TouchableOpacity>
                </View>

                {/* User Information with Properly Aligned Colons */}
                <View className="mt-3">
                    <UserDetail label="👤 Full Name" value="John Doe" />
                    <UserDetail label="📞 Mobile" value="+91 9876543210" />
                    <UserDetail label="📧 Email" value="johndoe@example.com" />
                    <UserDetail label="🏠 Primary Address" value="123, Street Name" />
                </View>
            </View>

            {/* Buttons - Address, Orders */}
            <MenuItem title="Your Address" />
            <MenuItem title="Your Orders" navigation={navigation} />

            {/* Logout Button with Confirmation */}
            <TouchableOpacity
                className="w-32 mt-5 bg-red-600 py-3 rounded-tl-full rounded-br-full items-center active:bg-red-800"
                onPress={handleLogout} // Show logout confirmation
            >
                <Text className="text-white font-bold text-lg">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

// Reusable User Detail Row
function UserDetail({ label, value }) {
    return (
        <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold w-[40%]">{label}</Text>
            <Text className="text-lg text-gray-800 w-[60%]">: {value}</Text>
        </View>
    );
}

// Reusable Button Component
function MenuItem({ title, navigation }) {
    return (
        <TouchableOpacity
            className="w-[90%] h-12 rounded-tl-[2rem] rounded-br-[2rem] mt-5 bg-purple-200 flex-row items-center justify-between px-5 active:bg-purple-300"
            onPress={() => navigation.navigate("Orders")}
        >
            <Text className="text-lg font-bold">{title}</Text>
            <Ionicons name="chevron-forward" size={22} color="black" />
        </TouchableOpacity>
    );
}
