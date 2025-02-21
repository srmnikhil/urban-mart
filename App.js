import { Text, View, SafeAreaView } from 'react-native';
import BottomNav from './components/BottomNav';
import { StatusBar } from 'expo-status-bar';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1">
        <View className="items-center justify-center flex-1">
          <SearchBar />
          <Banner />
          <View>
            <Text>Welcome to the UrbanDrop App!</Text>
          </View>
          {/* <StatusBar /> */}
          <BottomNav />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
