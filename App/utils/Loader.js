// Loader.js
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import Colors from "./Colors";
import { moderateScale } from "react-native-size-matters";

const Loader = ({ size, color }) => {
  return (
    <Animatable.View style={{paddingVertical:moderateScale(10)}} animation="fadeIn" duration={200}>
      <ActivityIndicator size={size} color={color} />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
    zIndex: 1, // Ensure it's above other components
  },
});

export default Loader;
