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

const RateApp = () => {
  let navigation = useNavigation();

  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const [rating, setRating] = useState(0);

  const handleRatingPress = (index) => {
    setRating(index + 1); // Set the rating to the selected star's index (1-based)
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
              {t("rateTheApp")}
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
            style={[
              styles.ratingContainer,
              {
                marginBottom: moderateScale(20),
                flexDirection: selectedLanguage == "AR" ? "row-reverse" : "row",
              },
            ]}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRatingPress(index)}
              >
                <Ionicons
                  name={index < rating ? "star" : "star-outline"}
                  size={moderateScale(25)}
                  color={"#C6924E"} // Set the star color
                  style={{ marginRight: moderateScale(5) }} // Optional styling for spacing
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputWrapper}>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("name")}
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
              placeholder={t("enterName")}
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
            />
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              }}
            >
              {t("message")}
            </CustomText>
            <TextInput
              style={[
                CustomStyle.input,
                {
                  marginTop: 0,
                  marginBottom: moderateScale(10),
                  height: moderateScale(100),
                  textAlign: selectedLanguage == "AR" ? "right" : "left",
                },
              ]}
              placeholderTextColor={"grey"}
              placeholder={t("typeSomething")}
              multiline={true}
              verticalAlign="top"
            />

            <View style={{ flexDirection: "row" }}>
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
              <TouchableOpacity style={[CustomStyle.FullButton, { flex: 1 }]}>
                <CustomText
                  style={{
                    fontSize: moderateScale(18),
                    paddingVertical: moderateScale(10),
                    fontWeight: "600",
                  }}
                >
                  {t("submit")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RateApp;

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
