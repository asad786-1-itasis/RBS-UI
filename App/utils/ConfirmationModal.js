import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./Colors";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";


const ConfirmationModal = ({ onCloss, onPress, Visible }) => {
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={Visible}
        animationType="fade"
        onRequestClose={onCloss} // Close on back press
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: moderateScale(50),
                height: moderateScale(60),
                width: moderateScale(60),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="warning-outline" size={30} color="#FFF" />
            </View>

            <CustomText
              style={{ fontSize: moderateScale(18), fontWeight: "600" }}
            >
              {t('areYouSure')}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(14),
                fontWeight: "400",
                marginBottom: 10,
              }}
            >
              {t('youWantToProceed')}
            </CustomText>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCloss}>
                <Text style={styles.buttonText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okButton} onPress={onPress}>
                <Text style={styles.buttonText}>{t('ok')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  openButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    padding: moderateScale(30),
    backgroundColor: Colors.textInputClr, // Black background
    borderRadius: 10,
    alignItems: "center",
    elevation: 10, // Shadow for Android
  },
  modalText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: Colors.textInputClr,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  okButton: {
    backgroundColor: "#C6924E", // Example color for OK button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default ConfirmationModal;
