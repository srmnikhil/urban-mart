const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

// Wrap with Reanimated Metro Config first
config = wrapWithReanimatedMetroConfig(config);

// Wrap with NativeWind
config = withNativeWind(config, { input: "./global.css" });

module.exports = config;
