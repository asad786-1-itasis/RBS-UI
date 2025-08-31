import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

const CustomText = ({ children, style, ...props }) => {
  return (
    <Text allowFontScaling={false} style={[styles.defaultStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: Fonts.JOST, // Ensure Jost font is linked correctly in the project
    color: Colors.black,

  },
});

export default CustomText;
