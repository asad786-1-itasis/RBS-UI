import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  I18nManager,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";
import Colors from "../utils/Colors";
import images from "../utils/images";
import ConfirmationModal from "../utils/ConfirmationModal";
import { useNavigation } from "@react-navigation/native";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../Redux/AuthReducer/authSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Picker } from "@react-native-picker/picker";
import Fonts from "../utils/Fonts";
import LanguageModal from "../utils/LanguageModal";
// import translate from "translate-google-api";

import Loader from "../utils/Loader";
import { setSelectedLanguage } from "../Redux/HomeReducer/homeSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { t, setAppLanguage } from "../Languages/translations";
// import RNRestart from "react-native-restart";

const textToTranslate = [
  "General Settings",
  "Wishlist",
  "Get Notification",
  "Order details",
  "Rate the app",
  "Order history",
  "Logout",
];

const IconSize = moderateScale(25);
const SettingsScreen = () => {
  let dispatch = useDispatch();
  let navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const loginData = useSelector((state) => state.auth.loginData);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [modalVisibleLanguage, setModalVisibleLanguage] = useState(false);
  const [selectedLang, setSelectedLang] = useState(selectedLanguage);
  const [appLang, setAppLang] = useState("");

  // console.log("appLang>>>>>>>>>>>>>>>>>>>>>>>>", appLang);
  // console.log("loginData>>>>>>>>>>>>>>>>>>>>>>>>", loginData);
  const [translatedTexts, setTranslatedTexts] = useState("");
  useEffect(() => {
    console.log(selectedLanguage);
    setSelectedLang(selectedLang);
    setAppLang(selectedLanguage == "AR" ? "ar" : "en");
  }, [selectedLanguage]);

  const handleLanguageSelect = (language) => {
    let isRTL = false;
    if (language === "Arabic") {
      setAppLanguage("ar");
      storeLangData("AR");
      // setSelectedLanguage("ar");
      setSelectedLang("AR");
      dispatch(setSelectedLanguage("AR"));
      isRTL = true;
      console.log("Selected Language:", language);
    } else {
      setAppLanguage("en");
      storeLangData("USD");
      setSelectedLang("USD");
      dispatch(setSelectedLanguage("USD"));
      // setSelectedLanguage("en");
      console.log("Selected Language:", language);
    }

    // Update the layout direction based on the selected language
    // if (I18nManager.isRTL !== isRTL) {
    //   I18nManager.forceRTL(isRTL);
    //   RNRestart.restart();
    // }
  };

  const storeLangData = async (value) => {
    console.log("value>>>>>>>", value);
    try {
      await AsyncStorage.setItem("lang", value);
    } catch (e) {
      console.log("storeLangData>>>>>", e);
    }
  };

  // useEffect(() => {
  // if (selectedLanguage != "") {
  //   setLoading(true);
  //   const translateTexts = async () => {
  //     try {
  //       const translatedResults = {};
  //       for (const text of textToTranslate) {
  //         const result = await translate(text, { to: selectedLanguage });
  //         translatedResults[text] = result; // Store each translation by original text
  //       }
  //       setTranslatedTexts(translatedResults); // Set all translated texts
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error("Translation error:", error);
  //     }
  //   };

  //   translateTexts();
  // }

  // }, [selectedLanguage]);

  const toggleNotificationSwitch = () => {
    setIsNotificationEnabled((previousState) => !previousState);
  };
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <CustomStatusBar />
        <Loader size={"large"} color={Colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {/* Header */}
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScale(80),
        }}
      >
        <View style={styles.header}>
          <View style={[styles.headerContainer]}>
            <View
              style={[
                styles.headerContainer,
                { marginBottom: moderateScale(0) },
              ]}
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
                {t("settings")}
              </CustomText>
            </View>
          </View>
        </View>

        {/* User Profile Section */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyAccount")}
          style={styles.profileCard}
        >
          <View style={styles.profileDetails}>
            <Image source={images.Women} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <CustomText
                style={{
                  fontSize: moderateScale(18),
                  fontWeight: "600",
                }}
              >
                {loginData?.firstName}
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: "500",
                }}
              >
                {loginData?.email}
              </CustomText>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={IconSize} color="white" />
        </TouchableOpacity>

        {/* General Settings */}
        <View style={styles.section}>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: "600",
            }}
          >
            {t("generalSetting")}
          </CustomText>

          {/* Wishlist */}
          {/* <TouchableOpacity onPress={()=>navigation.navigate('WishList')} style={[styles.row]}>
            <FontAwesome name="heart" size={20} color="white" />
            <CustomText style={styles.itemTxt}>{t("wishList")}</CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(14),
                fontWeight: "500",
              }}
            >
              4 {t("item")}
            </CustomText>
            <Ionicons name="chevron-forward" size={IconSize} color="white" />
          </TouchableOpacity> */}

          {/* Wishlist */}
          <TouchableOpacity
            onPress={() => setModalVisibleLanguage(true)}
            style={styles.row}
          >
            <FontAwesome name="language" size={20} color="white" />
            <CustomText style={styles.itemTxt}>
              {t("languagePreference")}
            </CustomText>
            <LanguageModal
              isVisible={modalVisibleLanguage}
              onClose={() => setModalVisibleLanguage(false)}
              onLanguageSelect={handleLanguageSelect}
              selectedLang={selectedLang}
            />
            <Ionicons name="chevron-down" size={IconSize} color="white" />
          </TouchableOpacity>

          {/* Notifications */}
          <View style={[styles.row, { marginLeft: moderateScale(-5) }]}>
            <MaterialIcons name="notifications" size={IconSize} color="white" />
            <CustomText style={styles.itemTxt}>
              {t("getNotification")}
            </CustomText>
            <Switch
              trackColor={{ false: "#767577", true: "#C6924E" }}
              thumbColor={isNotificationEnabled ? "#C6924E" : "#f4f3f4"}
              onValueChange={toggleNotificationSwitch}
              value={isNotificationEnabled}
            />
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: "600",
            }}
          >
            {t("orderDetails")}
          </CustomText>
          {/* Rate the app */}
          <TouchableOpacity
            onPress={() => navigation.navigate("RateApp")}
            style={styles.row}
          >
            <Ionicons name="star-outline" size={IconSize} color="white" />
            <CustomText style={styles.itemTxt}>{t("rateTheApp")}</CustomText>
            <Ionicons name="chevron-forward" size={IconSize} color="white" />
          </TouchableOpacity>
          {/* Order history */}
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderHistory")}
            style={styles.row}
          >
            <Ionicons
              name="document-text-outline"
              size={IconSize}
              color="white"
            />
            <CustomText style={styles.itemTxt}>{t("orderHistory")}</CustomText>
            <Ionicons name="chevron-forward" size={IconSize} color="white" />
          </TouchableOpacity>
          {/* Logout */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.row}
          >
            <Ionicons name="log-out-outline" size={IconSize} color="white" />
            <CustomText
              style={{
                fontSize: moderateScale(14),
                fontWeight: "500",
                flex: 1,
                marginLeft: moderateScale(10),
              }}
            >
              {t("logout")}
            </CustomText>
            <Ionicons name="chevron-forward" size={IconSize} color="white" />
          </TouchableOpacity>
        </View>

        <ConfirmationModal
          onCloss={() => setModalVisible(false)}
          onPress={() => dispatch(setLogin(false))}
          Visible={modalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

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
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "white",
    marginLeft: moderateScale(10),
  },
  profileCard: {
    backgroundColor: "#333",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(20),
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(10),
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    fontSize: moderateScale(12),
    color: "gray",
  },
  section: {
    marginTop: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "white",
    marginBottom: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#444",
  },
  rowText: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: moderateScale(14),
    color: "white",
  },
  rowSubText: {
    color: "gray",
    fontSize: moderateScale(12),
    marginRight: moderateScale(10),
  },
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemTxt: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    flex: 1,
    marginLeft: moderateScale(10),
  },
});

export default SettingsScreen;
