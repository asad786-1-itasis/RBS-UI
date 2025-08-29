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
import { t, setAppLanguage } from "../Languages/translations";
import { useSelector } from "react-redux";
import { useCustomToast } from "../utils/ToastNofticiation";
import Endpoints from "../API/Endpoints";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";

const EditInfo = () => {
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

  const [loading, setLoading] = useState(0);
  const [rating, setRating] = useState(0);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  const handleRatingPress = (index) => {
    setRating(index + 1); // Set the rating to the selected star's index (1-based)
  };

  const validateFields = () => {
    if (!firstName) {
      showToast("Please enter first name");
      return false;
    }
    if (!lastName) {
      showToast("Please enter last name");
      return false;
    }
    if (!email) {
      showToast("Please enter email");
      return false;
    }

    return true;
  };

  const handleChangeInfo = async () => {
    if (validateFields()) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("UserId", loginData?.id);
        formData.append("FirstName", firstName);
        formData.append("LastName", lastName);
        formData.append("email", email);
        console.log("formData handleChangeInfo >>>>>>>>", formData);
        POSTAPICALLFORMDATA(
          Endpoints.EndpointsEditProfile,
          formData,
          false
        ).then((result) => {
          console.log("Response handleChangeInfo >>>>>>>>>>>>", result?.data);
          if (result?.success == true) {
            showToast("Profile updated");

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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.headerContainer]}
        >
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
              {t("editInfo")}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={CustomStyle.BodyStyle}>
          <View
            style={{
              width: moderateScale(125),
              height: moderateScale(124),
              borderRadius: 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={images.Men}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.IconWrapper}>
              <Entypo
                name={"pencil"}
                size={moderateScale(20)}
                color={Colors.primary} // Star color
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("firstName")}
            </CustomText>
            <TextInput
              style={[
                CustomStyle.input,
                {
                  marginTop: 0,
                  marginBottom: moderateScale(10),
                  textAlign: selectedLanguage == "AR" ? "right" : "left",
                },
              ]}
              placeholderTextColor={"grey"}
              placeholder={t("enterFirstName")}
              onChangeText={setFirstName}
            />
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("lastName")}
            </CustomText>
            <TextInput
              style={[
                CustomStyle.input,
                {
                  marginTop: 0,
                  marginBottom: moderateScale(10),
                  textAlign: selectedLanguage == "AR" ? "right" : "left",
                },
              ]}
              placeholderTextColor={"grey"}
              placeholder={t("enterLastName")}
              onChangeText={setLastName}
            />
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("email")}
            </CustomText>
            <TextInput
              style={[
                CustomStyle.input,
                {
                  marginTop: 0,
                  marginBottom: moderateScale(10),
                  textAlign: selectedLanguage == "AR" ? "right" : "left",
                },
              ]}
              placeholderTextColor={"grey"}
              placeholder={t("emailAddress")}
              onChangeText={setEmail}
            />

            <View
              style={{ flexDirection: "row", marginTop: moderateScale(20) }}
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
                onPress={() => handleChangeInfo()}
                style={[CustomStyle.FullButton, { flex: 1 }]}
              >
                <CustomText
                  style={{
                    fontSize: moderateScale(18),
                    paddingVertical: moderateScale(10),
                    fontWeight: "600",
                  }}
                >
                  {t("update")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditInfo;

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
  IconWrapper: {
    position: "absolute",
    bottom: moderateScale(2),
    right: moderateScale(10),

    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.textInputClr,
  },
});
