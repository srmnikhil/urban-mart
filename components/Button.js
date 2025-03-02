import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Button({
    width = "",
    backgroundColor = "bg-purple-600",
    textWeight = "font-bold",
    buttonText = "Replace Text",
    onPress = () => {},
    paddingY = "py-3",
    iconName,
    extraClassName = "",
    isDisabled = false,
    rounded = "[2rem]"
}) {
    return (
        <TouchableOpacity
            className={`${width} ${backgroundColor} ${paddingY} flex-row justify-center rounded-tl-${rounded} rounded-br-${rounded} items-center ${extraClassName}`}
            onPress={onPress}
            disabled={isDisabled}
        >
            {iconName && <Ionicons name={iconName} size={18} color="white" />}
            <Text className={`${textWeight} text-white text-lg ml-2`}>{buttonText}</Text>
        </TouchableOpacity>
    )
}