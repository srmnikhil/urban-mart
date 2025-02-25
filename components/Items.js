import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hooks


export default function Items({ product, cart, addToCart }) {
  const navigation = useNavigation();

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <View className="w-[47%] bg-purple-100 p-3 m-[6px] rounded-lg shadow-md">
      <Image
        source={{ uri: product.image }}
        className="w-full h-36"
        resizeMode="contain"
      />

      <Text className="mt-2 font-bold text-lg">{product.name}</Text>
      <Text className="text-purple-700 text-md">₹{product.price}/-</Text>

      {/* Stock Status */}
      <Text className={`mt-1 font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </Text>

      {/* Quantity Options */}
      {product.quantity.length !== 0 && product.inStock ? (
        <Text className="text-gray-500 text-sm mt-1">Available: {product.quantity.join(", ")}</Text>
      ) : (<Text className='text-gray-500 text-sm mt-1'></Text>)}

      {/* Add to Cart Button */}
      <TouchableOpacity
        className={`mt-2 ${isInCart ? "bg-green-600" : product.inStock ? "bg-purple-700" : "bg-gray-500"} py-2 rounded-lg`}
        onPress={() => isInCart ? navigation.navigate("Cart") : addToCart(product)}
        disabled={!product.inStock}
      >
        <Text className="text-white text-center font-bold">
          {isInCart ? "Go to Cart" : product.inStock ? "+ Add to Cart" : "Available Soon"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
