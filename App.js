import { Text, View, SafeAreaView } from 'react-native';
import BottomNav from './components/BottomNav';
import { StatusBar } from 'expo-status-bar';
import SearchBar from './components/SearchBar';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1">
        <SearchBar />
        <View>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        {/* <StatusBar /> */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
