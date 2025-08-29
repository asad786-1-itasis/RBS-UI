import React from "react";
import { StatusBar, View } from "react-native";
import Colors from "./Colors";


const CustomStatusBar = () => {
  return (
    <View>
      <StatusBar
        barStyle="dark-content" // or "dark-content"
        backgroundColor={'white'} // Match your background color
        translucent={false} // Make it opaque to prevent flickering
      />
    </View>
  );
};

export default CustomStatusBar;
