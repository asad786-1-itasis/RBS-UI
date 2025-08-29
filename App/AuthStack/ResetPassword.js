import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import images from "../utils/images";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import CustomStatusBar from "../utils/CustomStatusBar";

import Endpoints from "../API/Endpoints";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";

const ResetPassword = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();

  const forgotEmail = useSelector((state) => state.auth.forgotEmail);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setErrorMessage(t('passwordMismatch'));
    } else {
      setErrorMessage("");
    }
  };
  const validateFields = () => {
    if (!password) {
      Alert.alert("Error", "Please enter all credentials");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("Email", forgotEmail);
        formData.append("Password", password);
        console.log("formData Login >>>>>>>>", formData);
        POSTAPICALLFORMDATA(
          Endpoints.EndpointsResetPassword,
          formData,
          false
        ).then((result) => {
          console.log("Response  >>>>>>>>>>>>", result?.data);
          if (result?.success == true) {
            // dispatch(setLoginData(result?.data));
            showToast("Password changed successfully");
            navigation.navigate("Login");
            setLoading(false);
          } else {
            showToast(result?.message);
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity>
            <Entypo name={"chevron-left"} size={28} color={Colors.white} />
          </TouchableOpacity>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              paddingLeft: 5,
              fontWeight: 600,
            }}
          >
            {t("resetPassword")}
          </CustomText>
        </View>
        <View style={CustomStyle.BodyStyle}>
          <View>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TextInput
                placeholder={t("newPassword")}
                placeholderTextColor={"grey"}
                style={[
                  CustomStyle.InputWithIcon,
                  { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                ]}
                secureTextEntry={!showNewPassword}
                value={password}
                onChangeText={(txt) => setPassword(txt)}
              />
              <TouchableOpacity
                onPress={toggleShowNewPassword}
                style={styles.icon}
              >
                <Feather
                  name={showNewPassword ? "eye" : "eye-off"}
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TextInput
                placeholder={t("confirmPassword")}
                placeholderTextColor={"grey"}
                style={[
                  CustomStyle.InputWithIcon,
                  { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                ]}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
              />
              <TouchableOpacity
                onPress={toggleShowConfirmPassword}
                style={styles.icon}
              >
                <Feather
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            {errorMessage ? (
              <CustomText style={styles.errorText}>{errorMessage}</CustomText>
            ) : null}
          </View>

          <View
            style={{
              paddingTop: moderateScale(25),
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                [
                  CustomStyle.FullButton,
                  { marginTop: moderateScale(0), flex: 1 },
                ],
              ]}
            >
              <CustomText
                style={{
                  fontSize: moderateScale(18),
                  paddingVertical: moderateScale(10),
                  fontWeight: "600",
                }}
              >
                {t("cancel")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[
                [
                  CustomStyle.FullButton,
                  { marginTop: moderateScale(0), flex: 1, marginLeft: 10 },
                ],
              ]}
            >
              <CustomText
                style={{
                  fontSize: moderateScale(18),
                  paddingVertical: moderateScale(10),
                  fontWeight: "600",
                }}
              >
                {t("save")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.screenClr,
  },
  SectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal:
      Platform.OS === "ios" ? moderateScale(20) : moderateScale(20),
  },

  logoTxt: {
    color: Colors.txtClr,
    fontWeight: "500",
    fontSize: moderateScale(18),
    marginLeft: moderateScale(15),
  },
  Heading: {
    color: Colors.txtClr,
    fontWeight: "5",
    fontSize: moderateScale(11),
    alignSelf: "flex-start",
    marginLeft: moderateScale(4),
  },
  forgotTxt: {
    color: Colors.primaryClr,
    fontSize: moderateScale(15),
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  LoginTxt: {
    color: Colors.white,
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginLeft: moderateScale(6),
  },
  SignUpTxt: {
    color: Colors.secondaryClr,
    fontSize: moderateScale(14),
  },
  errorText: {
    marginTop: 5,
    alignSelf: "flex-start",
  },
});
