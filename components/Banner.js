import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Image, Dimensions, FlatList } from "react-native";
const { height } = Dimensions.get("window");
const width = 404;

const banners = [
  require("../assets/Banner1.png"),
  require("../assets/Banner2.png"),
];

export default function Banner() {
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const onScrollRef = useRef(false); // Track manual scroll  
  const intervalRef = useRef(null); // Track interval

  // Function to start auto-scroll
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!onScrollRef.current) {  // Only auto-scroll if not manually scrolling
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % banners.length;
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        });
      }
    }, 5000);
  }, []);

  // Handle auto-scroll setup
  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  // Handle user swipe
  const handleScroll = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  return (
    <View className="h-50 items-center justify-center rounded-br-[3rem] rounded-tl-[3rem] overflow-hidden">
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled={true} // Ensures full image snapping
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll} // Track index changes
        snapToAlignment="center" // Helps in better snapping
        snapToInterval={width} // Ensures full-width snapping
        decelerationRate="fast"

        renderItem={({ item }) => (
          <View style={{ width, height: height*0.15, alignItems: "center", justifyContent: "center"}}>
            <Image source={item} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View className="absolute bottom-1 flex-row space-x-1">
        {banners.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-purple-800" : "bg-gray-400"
              } mx-1`}
          />
        ))}
      </View>
    </View>
  );
}
