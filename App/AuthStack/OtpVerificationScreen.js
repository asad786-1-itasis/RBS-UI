import {
  ActivityIndicator,
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
import CustomStatusBar from "../utils/CustomStatusBar";
import Endpoints from "../API/Endpoints";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";

const OtpVerificationScreen = () => {
  let navigation = useNavigation();

  let { showToast } = useCustomToast();
  const [email, setEmail] = useState("haiderbadsha@yopmail.com");
  const forgotEmail = useSelector((state) => state.auth.forgotEmail);
  const [loading, setLoading] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59); // 59 seconds timer
  const inputRefs = useRef([]);
  const [seconds, setSeconds] = useState(60); // Set initial countdown time
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000); // Decrease the timer every second

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [timer]); // Only run when seconds changes

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus on the next input box
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Optionally handle backspace to move to the previous box
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const validateFields = () => {
    const isComplete = otp.every((num) => num && num.trim() !== "");
    if (!isComplete) {
      showToast("Please enter all six numbers");
      return false;
    }

    return true;
  };

  const handleOtpVerification = async () => {
    if (validateFields()) {
      try {
        const result = otp.join("");
        setLoading(true);
        let formData = new FormData();
        formData.append("Code", result);
        console.log("formData Login >>>>>>>>", formData);
        POSTAPICALLFORMDATA(
          Endpoints.EndpointsValidateResetCode,
          formData,
          false
        ).then((result) => {
          console.log("Response handleOtpVerification >>>>>>>>>>>>", result);
          if (result?.success == true) {
            setLoading(false);
            navigation.navigate("ResetPassword");
          } else {
            showToast("Please enter a valid otp");
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleForgotPassowrd = async () => {
    try {
      setLoadingReset(true);
      let formData = new FormData();
      formData.append("Email", forgotEmail);

      console.log("formData Login >>>>>>>>", formData);
      POSTAPICALLFORMDATA(
        Endpoints.EndpointsRequestResetPasswordCode,
        formData,
        false
      ).then((result) => {
        console.log("Response handleForgotPassowrd >>>>>>>>>>>>", result);
        if (result?.success == true) {
          setLoadingReset(false);
          setTimer(59);
          showToast("Email sent successfully");
        } else {
          showToast(result?.message);
          setLoadingReset(false);
        }
      });
    } catch (error) {
      setLoadingReset(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
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
              {t('otpVerification')}
            </CustomText>
          </View>
          <View
            style={[
              styles.SectionContainer,
              { marginVertical: moderateScale(10) },
            ]}
          >
            <CustomText
              style={{
                fontSize: moderateScale(12),
                fontWeight: 400,
              }}
            >
              {t('enterCode')}
            </CustomText>

            <Text style={styles.email}></Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>

            <View style={styles.timerContainer}>
              <MaterialIcons name="av-timer" size={24} color={Colors.white} />
              <Text style={styles.timerText}>{`0:${timer
                .toString()
                .padStart(2, "0")}`}</Text>
            </View>

            <View style={styles.resendContainer}>
              <CustomText
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: 500,
                }}
              >
                {t('didNotReceiveCode')}
                
              </CustomText>
              <TouchableOpacity onPress={handleForgotPassowrd}>
                {loadingReset ? (
                  <ActivityIndicator size={25} color={Colors.white} />
                ) : (
                  <CustomText style={styles.resetTxt}>{t('resendCode')}</CustomText>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={loading ? true : false}
              onPress={handleOtpVerification}
              style={[
                CustomStyle.FullButton,
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
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
                  {t('verify')}
                </CustomText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  email: {
    fontSize: moderateScale(16),
    color: "#505052",
    marginBottom: moderateScale(24),
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(20),
  },
  otpInput: {
    backgroundColor: Colors.textInputClr,
    width: moderateScale(40),
    height: moderateScale(42),
    borderRadius: 6,
    textAlign: "center",
    fontSize: moderateScale(18),
    color: Colors.white,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(16),
    backgroundColor: Colors.textInputClr,
    width: moderateScale(100),
    height: moderateScale(50),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: moderateScale(30),
  },
  timerText: {
    fontSize: moderateScale(16),
    color: Colors.white,
    marginLeft: moderateScale(8),
  },
  resendContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: moderateScale(24),
  },
  normalText: {
    fontSize: moderateScale(16),
    color: "#707070",
    marginRight: moderateScale(4), // Adjust space between the texts
  },
  resendText: {
    fontSize: moderateScale(16),
    color: "#707070",
    textDecorationLine: "underline",
  },
  resendEnabled: {
    color: "#6200ee",
  },
  verifyButton: {
    backgroundColor: Colors.primaryClr,
    paddingVertical: moderateScale(10),
    borderRadius: 6,
    width: "46%",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: moderateScale(30),
  },
  verifyButtonText: {
    fontSize: moderateScale(17),
    color: "#fff",
  },
  SectionContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.screenClr,
  },
  logoTxt: {
    color: Colors.txtClr,
    fontSize: moderateScale(18),
    marginLeft: moderateScale(15),
  },
  resetTxt: {
    fontSize: moderateScale(14),
    fontWeight: 500,
    color: Colors.BtnClr,
    paddingLeft: 5,
  },
});

export default OtpVerificationScreen;
