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
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLoginData } from "../Redux/AuthReducer/authSlice";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
// import Endpoints from "../API/Endpoints";
// import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSelectedLanguage } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";
// import FastImage from 'react-native-fast-image'

const ForgetPassword = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { showToast } = useCustomToast();

  const [loading, setLoading] = useState(false);
  // AED
  // const [email, setEmail] = useState("haiderbadsha@yopmail.com");
  // const [password, setPassword] = useState("123456");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // USD
  // const [email, setEmail] = useState("hg1@yopmail.com");
  // const [password, setPassword] = useState("abc123");

  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "fr") {
      setAppLanguage("fr");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    if (!email || !password) {
      showToast("Please enter all credentials");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateFields()) {
      // try {
      //   setLoading(true);
      //   let formData = new FormData();
      //   formData.append("Email", email);
      //   formData.append("Password", password);
      //   formData.append("Role", "user");
      //   console.log("formData Login >>>>>>>>", formData);
      //   POSTAPICALLFORMDATA(
      //     Endpoints.EndpointsaccountSignIn,
      //     formData,
      //     false
      //   ).then((result) => {
      //     console.log("Response handleLogin >>>>>>>>>>>>", result);
      //     if (result?.success == true) {
      //       // showToast('Login Successfull');
      //       setLoading(false);
      //       dispatch(setLoginData(result?.data));
      //       dispatch(setLogin(true));
      //     } else {
      //       showToast(result?.message);
      //       setLoading(false);
      //     }
      //   });
      // } catch (error) {
      //   setLoading(false);
      //   console.log(error);
      // }
    }
  };

  return (
    <SafeAreaView style={[CustomStyle.SafeAreaStyle, {}]}>
      <CustomStatusBar />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.background }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[CustomStyle.BodyStyle, { justifyContent: 'center' }]}>
          <View style={styles.cardView}>
            <Animatable.View animation={"fadeInRight"} duration={500}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: moderateScale(20),
              }}>
                <CustomText
                  style={[styles.LogoTxt, { textAlign: selectedLanguage == "AR" ? "right" : "left", }]}
                >
                  {t("resetPassword")}
                </CustomText>
                <CustomText
                  style={[styles.txt, {}]}
                >
                  {t("enterEmailOrPhone")}
                </CustomText>

              </View>
            </Animatable.View>
            <View style={styles.inputWrapper}>
              <Animatable.View animation={"fadeInRight"} duration={500}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14),
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  }}
                >
                  {t("emailAddress")}
                </CustomText>
                <TextInput
                  style={[
                    CustomStyle.input,
                    {
                      marginTop: 5,
                      textAlign: selectedLanguage == "AR" ? "right" : "left",
                    },
                  ]}
                  placeholderTextColor={"grey"}
                  placeholder={t("emailAddress")}
                  value={email}
                  onChangeText={setEmail}
                />

                <TouchableOpacity
                  onPress={() => handleLogin()}
                  style={[CustomStyle.FullButton, { marginTop: moderateScale(30) }]}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <Loader size={25} color={Colors.BtnClr} />
                  ) : (
                    <CustomText style={styles.loginTxt}>{t("sendVerificationCode")}</CustomText>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            </View>
            <View style={{ flex: 0.4, justifyContent: "flex-end", }}>
              <View style={styles.textContainer}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <CustomText
                    style={{
                      fontSize: moderateScale(14),
                      paddingVertical: moderateScale(10),
                      fontWeight: "600",
                      color: Colors.BtnClr,
                      paddingLeft: 5,
                    }}
                  >
                    {t("backToLogin")}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: { width: moderateScale(155), height: moderateScale(144.5) },
  inputWrapper: {
    flex: 1,
    // backgroundColor: Colors.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginTxt: {
    fontSize: moderateScale(18),
    paddingVertical: moderateScale(10),
    fontWeight: "600",
    color: Colors.white,
    fontWeight: '500'
  },
  forgetTxt: {
    width: "40%",
    alignSelf: "flex-end",

  },
  cardView: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    overflow: "hidden",
    padding: moderateScale(20),
    // 🌟 Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // 🌟 Shadow for Android
    elevation: 6,
  },
  LogoTxt: {
    fontSize: moderateScale(18),

    color: '#6f60bf',
    fontWeight: 'bold'
  },
  txt: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10)
  }
});
