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

const Login = () => {
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
      dispatch(setLogin(true));
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
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: moderateScale(20),
              }}>
                <CustomText
                  style={[styles.LogoTxt, { textAlign: selectedLanguage == "AR" ? "right" : "left", }]}
                >
                  RBS
                </CustomText>
                <CustomText
                  style={[styles.contactAdmin, { textAlign: selectedLanguage == "AR" ? "right" : "left", }]}
                >
                  {t("contactToAdmin")}
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
                  allowFontScaling={false}   // 👈 yahan add kar do
                />
                <CustomText
                  style={{
                    fontSize: moderateScale(14),
                    marginTop: moderateScale(15),
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  }}
                >
                  {t("password")}
                </CustomText>
                <View
                  style={[
                    CustomStyle.InputWithIconWrapper,
                    {
                      marginTop: 5,
                      flexDirection:
                        selectedLanguage === "AR" ? "row-reverse" : "row",
                    },
                  ]}
                >
                  <TextInput
                    placeholderTextColor={"grey"}
                    placeholder={t("enterPassword")}
                    style={[
                      CustomStyle.InputWithIcon,
                      { textAlign: selectedLanguage == "AR" ? "right" : "left" },
                    ]}
                    value={password}
                    secureTextEntry={showPassword ? false : true}
                    onChangeText={setPassword}
                    allowFontScaling={false}
                  />
                  <TouchableOpacity onPress={handleShowPass}>
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color={Colors.black}
                    />
                  </TouchableOpacity>
                </View>
                <Pressable
                  style={styles.forgetTxt}
                  onPress={() => navigation.navigate("ForgetPassword")}
                >
                  <CustomText
                    style={{
                      alignSelf: "flex-end",
                      marginTop: 10,
                      fontSize: moderateScale(13),
                      marginVertical: moderateScale(15),
                      color: Colors.BtnClr,
                    }}
                  >
                    {t("forgotPassword")}
                  </CustomText>
                </Pressable>
                <TouchableOpacity
                  onPress={() => handleLogin()}
                  style={CustomStyle.FullButton}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <Loader size={25} color={Colors.BtnClr} />
                  ) : (
                    <CustomText style={styles.loginTxt}>{t("login")}</CustomText>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('FaceFingure')}
              style={styles.signUpButton}
            >
              <CustomText
                style={{
                  fontSize: moderateScale(14),
                  paddingVertical: moderateScale(10),
                  fontWeight: "700",
                  color: Colors.black,
                  paddingLeft: 5,
                  textAlign: "center",
                }}
              >
                {t("loginWithFaceFingure")}
              </CustomText>
            </TouchableOpacity>
            <View style={{ flex: 0.4, justifyContent: "flex-end", }}>
              <View style={styles.textContainer}>
                <CustomText
                  style={{
                    fontSize: moderateScale(14),
                    paddingVertical: moderateScale(10),
                    fontWeight: "600",
                  }}
                >
                  {t("dontHaveAnAccount")}
                </CustomText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
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
                    {t("signUp")}
                  </CustomText>
                </TouchableOpacity>

              </View>



            </View>


          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView >
  );
};

export default Login;

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
    width: "60%",
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
  contactAdmin: {
    fontSize: moderateScale(16),
    color: '#6f60bf',
    fontWeight: '500'
  },
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    borderColor: Colors.BtnClr,
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  }
});
