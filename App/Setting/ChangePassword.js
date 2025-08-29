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
import React, { useEffect, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import images from "../utils/images";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";
import Endpoints from "../API/Endpoints";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";

const ChangePassword = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const loginData = useSelector((state) => state.auth.loginData);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== passwordNew) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage(""); // Clear error if they match
    }
  };

  const handleRatingPress = (index) => {
    setRating(index + 1); // Set the rating to the selected star's index (1-based)
  };

  const validateFields = () => {
    if (!passwordOld) {
      showToast("Please enter old password");
      return false;
    }
    if (!passwordNew) {
      showToast("Please enter new password");
      return false;
    }
    if (!confirmPassword) {
      showToast("Please enter confirm password");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (validateFields()) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("UserId", loginData?.id);
        formData.append("OldPassword", passwordOld);
        formData.append("NewPassword", passwordNew);
        console.log("formData Login >>>>>>>>", formData);
        POSTAPICALLFORMDATA(
          Endpoints.EndpointsChangePassword,
          formData,
          false
        ).then((result) => {
          console.log("Response handleChangePassword >>>>>>>>>>>>", result);
          if (result?.success == true) {
            showToast("Password change successfull");
            setLoading(false);
            // dispatch(setLogin(true));
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <View style={[styles.headerContainer]}>
          <View
            style={[styles.headerContainer, { marginBottom: moderateScale(0) }]}
          >
            <Entypo
              name={"chevron-left"}
              size={moderateScale(25)}
              color={Colors.white} // Star color
            />
          </View>
          <View>
            <CustomText
              style={{
                fontSize: moderateScale(18),
                fontWeight: "500",
              }}
            >
              {t("changePassword")}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={CustomStyle.BodyStyle}>
          <View style={styles.inputWrapper}>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                marginTop: 10,
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("oldPassword")}
            </CustomText>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  marginTop: 3,
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={t("oldPassword")}
                style={[
                  CustomStyle.InputWithIcon,
                  { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                ]}
                value={passwordOld}
                onChangeText={setPasswordOld}
                secureTextEntry={showOldPassword ? false : true}
              />
              <TouchableOpacity onPress={() => handleShowOldPassword()}>
                <Feather
                  name={showOldPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                marginTop: 10,
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("newPassword")}
            </CustomText>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  marginTop: 0,
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={t("newPassword")}
                style={[
                  CustomStyle.InputWithIcon,
                  { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                ]}
                value={passwordNew}
                onChangeText={setPasswordNew}
                secureTextEntry={showPassword ? false : true}
              />
              <TouchableOpacity onPress={() => handleShowPass()}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                marginTop: 10,
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("confirmPassword")}
            </CustomText>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  marginTop: 0,
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={t("confirmPassword")}
                style={[
                  CustomStyle.InputWithIcon,
                  { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                ]}
                value={confirmPassword}
                onChangeText={(e) => handleConfirmPassword(e)}
                secureTextEntry={showPasswordConfirm ? false : true}
              />
              <TouchableOpacity onPress={() => handleShowPassConfirm()}>
                <Feather
                  name={showPasswordConfirm ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            {errorMessage ? (
              <CustomText style={{ marginBottom: 10 }}>
                {errorMessage}
              </CustomText>
            ) : null}

            <View
              style={{ flexDirection: "row", marginTop: moderateScale(30) }}
            >
              <TouchableOpacity
                style={[
                  CustomStyle.FullButton,
                  {
                    flex: 1,
                    backgroundColor: Colors.black,
                    borderWidth: 2,
                    borderColor: Colors.BtnClr,
                    marginRight: 20,
                  },
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
                onPress={() => handleChangePassword()}
                style={[CustomStyle.FullButton, { flex: 1 }]}
              >
                {loading ? (
                  <Loader size={25} color={Colors.white} />
                ) : (
                  <CustomText
                    style={{
                      fontSize: moderateScale(18),
                      paddingVertical: moderateScale(10),
                      fontWeight: "600",
                    }}
                  >
                    {t("submit")}
                  </CustomText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: moderateScale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: { width: moderateScale(155), height: moderateScale(144.5) },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: moderateScale(5),
  },
});
