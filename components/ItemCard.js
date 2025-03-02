import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";


export default function Items({ product, cart, addToCart, requestTeam }) {
  const navigation = useNavigation();

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <View className="w-[47%] bg-purple-200 p-3 m-[6px] rounded-tl-[3rem] rounded-br-[3rem] shadow-md">
      <Image
        source={{ uri: product.image }}
        className="w-full h-36 rounded-tl-[3rem] rounded-br-[3rem]"
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
      <Button
        paddingY="py-2"
        backgroundColor={isInCart ? "bg-green-600" : product.inStock ? "bg-purple-700" : "bg-gray-500"}
        buttonText={isInCart ? "Go to Cart" : product.inStock ? "Add to Cart" : "Available Soon"}
        onPress={() => isInCart ? navigation.navigate("Cart") : product.inStock ? addToCart(product) : requestTeam(product)}
        extraClassName="mt-2"
        iconName ={isInCart ? "bag-outline" : product.inStock ? "add-circle" : "alert-circle-outline"}
        rounded = "[3rem]"
      />
    </View>
  );
}
