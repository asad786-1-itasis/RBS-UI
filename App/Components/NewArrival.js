import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";
import Colors from "../utils/Colors";
import BaseUrl from "../API/BaseUrl";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { useSelector } from "react-redux";
import { handleSelectedLanguage } from "../utils/CommonMethod";
// import FastImage from "react-native-fast-image";

const NewArrival = ({
  image,
  heading,
  price,
  subHeading,
  onRemove,
  headingArabic,
}) => {
  const loginData = useSelector((state) => state.auth.loginData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  return (
    <View style={styles.card}>
      {/* <Image
        source={{ uri: BaseUrl.BaseUrlImage + image }}
        style={styles.image}
      /> */}
      <FastImage
          style={styles.image}
          source={{
            uri: BaseUrl.BaseUrlImage + image,
            priority: FastImage.priority.high,
          }}
        />
      <View style={styles.detailsContainer}>
        <CustomText
          style={{
            fontSize: moderateScale(16),
            fontWeight: "600",
          }}
        >
          {handleSelectedLanguage(selectedLanguage) ? heading:headingArabic}
          
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(16),
          }}
        >
          {subHeading}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(16),
            fontWeight: "600",
            marginTop: 5,
          }}
        >
          {HandleCurrencySIgn(loginData?.currency) + price}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    elevation: 3, // Shadow for Android
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 5, // Shadow for iOS
    shadowColor: "#000", // Shadow color
    paddingBottom: moderateScale(15),
  },
  image: {
    width: moderateScale(94),
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(10),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default NewArrival;
