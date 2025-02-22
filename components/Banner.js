import React, { useEffect, useRef, useState } from "react";
import { View, Image, Dimensions, FlatList } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  require("../assets/Banner1.png"),
  require("../assets/Banner2.jpg"),
  require("../assets/Banner3.png"),
  require("../assets/Banner4.jpg"),
];

export default function Banner() {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const onScrollRef = useRef(false); // To track manual scroll  

  // Handle auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!onScrollRef.current) {  // Only auto-scroll if not manually scrolling
        const nextIndex = (index + 1) % banners.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  // Handle user swipe
  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  return (
    <View className="h-50 mb-2 items-center justify-center overflow-hidden">
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll} // Track index changes
        renderItem={({ item }) => (
          <View style={{ width, height: 160 }}>
            <Image source={item} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View className="absolute bottom-2 flex-row space-x-1">
        {banners.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-purple-800" : "bg-gray-400"
            } mx-1`}
          />
        ))}
      </View>
    </View>
  );
}
