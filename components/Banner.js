import React, { useEffect, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const banners = [
  require("../assets/Banner1.png"), // Replace with your actual image paths
  require("../assets/Banner2.jpg"),
];

export default function Banner() {
  const translateX = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate transition first
      translateX.value = withSequence(
        withTiming(-width, { duration: 400 }), // Slide out left
        withTiming(width, { duration: 0 }),   // Instantly move right
        withTiming(0, { duration: 400 })      // Slide in from right
      );

      // Delay index change slightly for a smooth transition
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 400); // Update index after slide-out completes
    }, 5000); // Change every 5 sec

    return () => clearInterval(interval); // Cleanup
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="w-full h-40 items-center justify-center overflow-hidden">
      <Animated.View className="w-[90%] h-40 rounded-xl overflow-hidden" style={animatedStyle}>
        <Image source={banners[index]} className="w-full h-full" resizeMode="cover" />
      </Animated.View>
    </View>
  );
}