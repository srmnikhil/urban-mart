import { Text, View, SafeAreaView } from 'react-native';
import Footer from './components/Footer';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1">
        <View>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        {/* <StatusBar /> */}
        <Footer />
      </View>
    </SafeAreaView>
  );
}
