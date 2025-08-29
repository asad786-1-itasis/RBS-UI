import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";
import CustomText from "../Components/CustomText";
import { moderateScale } from "react-native-size-matters";

const LanguageModal = ({
  isVisible,
  onClose,
  onLanguageSelect,
  selectedLang,
}) => {
  console.log("selectedLang>>>>>>>>>>>>", selectedLang);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CustomText style={styles.modalTitle}>Select Language</CustomText>

          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              onLanguageSelect("English");
              onClose(); // Close modal after selection
            }}
          >
            <CustomText
              style={[
                styles.languageText,
                {
                  color: selectedLang == "USD" ? Colors.primary : Colors.white,
                },
              ]}
            >
              English
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              onLanguageSelect("Arabic");
              onClose(); // Close modal after selection
            }}
          >
            <CustomText
              style={[
                styles.languageText,
                { color: selectedLang == "AR" ? Colors.primary : Colors.white },
              ]}
            >
              Arabic
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CustomText style={styles.closeButtonText}>Close</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.textInputClr, // Modal background color
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: moderateScale(20),
    marginBottom: 20,
    fontFamily: Fonts.JOST, // Font family
  },
  languageOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border, // Adjust border color
    width: "100%", // Full width for options
  },
  languageText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.JOST, // Font family
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary, // Close button color
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white", // Close button text color
  },
});

export default LanguageModal;
