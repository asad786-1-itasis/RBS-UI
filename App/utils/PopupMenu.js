import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import CustomText from "../Components/CustomText";
import Colors from "./Colors";
import { moderateScale } from "react-native-size-matters";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const PopupMenu = ({ visible, onClose, position ,MyorderDirection}) => {
  const options = [
    { label: "DATE ASC", icon: "sort-asc" },
    { label: "DATE DESC", icon: "sort-desc" },
    { label: "PRICE ASC", icon: "sort-asc" },
    { label: "PRICE DESC", icon: "sort-desc" },
  ];

  // Calculate new position to ensure the menu stays within the screen
  const adjustedPosition = {
    top: Math.min(position.y, screenHeight - 100), // Adjusted top position
    left: Math.min(position.x, screenWidth - 180), // Adjusted left position (accounting for width)
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity onPress={onClose} style={styles.overlay}>
        <View style={[styles.menu, adjustedPosition]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                // console.log(`Selected: ${option.label}`);
                MyorderDirection(option.label)
                onClose();
              }}
            >
              <Icon name={option.icon} size={20} color={Colors.white} />
              <CustomText style={styles.menuText}>{option.label}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: Colors.textInputClr,
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    width: moderateScale(150),
    position: "absolute", // Ensures the menu is positioned absolutely
    marginTop: moderateScale(20),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: moderateScale(14),
  },
});

export default PopupMenu;
