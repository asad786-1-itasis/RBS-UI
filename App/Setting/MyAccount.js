import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";
import Colors from "../utils/Colors";
import images from "../utils/images";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";

const IconSize = moderateScale(25);
const MyAccount = () => {
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const loginData = useSelector((state) => state.auth.loginData);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  let navigation = useNavigation();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotificationSwitch = () => {
    setIsNotificationEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      {/* Header */}
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
              {t("myAccount")}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* User Profile Section */}
      <View style={styles.profileCard}>
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
      </View>

      {/* General Settings */}

      {/* Order Details */}
      <View style={styles.section}>
        {/* Rate the app */}
        <TouchableOpacity
          onPress={() => navigation.navigate("EditInfo")}
          style={styles.row}
        >
          <Ionicons name="pencil" size={IconSize} color="white" />
          <CustomText
            style={{
              fontSize: moderateScale(14),
              fontWeight: "500",
              flex: 1,
              marginLeft: moderateScale(10),
            }}
          >
            {t("editInfo")}
          </CustomText>
          <Ionicons name="chevron-forward" size={IconSize} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePassword")}
          style={styles.row}
        >
          <Ionicons name="lock-closed-outline" size={IconSize} color="white" />
          <CustomText
            style={{
              fontSize: moderateScale(14),
              fontWeight: "500",
              flex: 1,
              marginLeft: moderateScale(10),
            }}
          >
            {t("changePassword")}
          </CustomText>
          <Ionicons name="chevron-forward" size={IconSize} color="white" />
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity
          style={[styles.row, { marginLeft: moderateScale(2) }]}
        >
          <AntDesign name="delete" size={25} color="white" />
          <CustomText
            style={{
              fontSize: moderateScale(14),
              fontWeight: "500",
              flex: 1,
              marginLeft: moderateScale(10),
            }}
          >
            {t("delete")}
          </CustomText>
          <Ionicons name="chevron-forward" size={IconSize} color="white" />
        </TouchableOpacity>
      </View>
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
});

export default MyAccount;
