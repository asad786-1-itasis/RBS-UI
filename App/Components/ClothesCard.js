import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "./CustomText";
import { moderateScale } from "react-native-size-matters";
import images from "../utils/images";
import Colors from "../utils/Colors";
import * as Animatable from "react-native-animatable";
import BaseUrl from "../API/BaseUrl";
import { useSelector } from "react-redux";
import { handleSelectedLanguage } from "../utils/CommonMethod";
// import FastImage from "react-native-fast-image";

const ClothesCard = ({ data, onPress }) => {
  // console.log('data =>>>>>>', data?.children);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  const handleRotateImage = () => {
    if (data.key == 1) {
      return moderateScale(-60);
    } else if (data.key == 4) {
      return moderateScale(80);
    } else {
      return 0;
    }
  };

  const handleImageResizeMethod = () => {
    if (data.key == 1) {
      return "contain";
    } else if (data.key == 4) {
      return "contain";
    } else {
      return "cover";
    }
  };
  return (
    <View style={styles.CardWrapper}>
      {/* <ImageBackground
        source={{ uri: BaseUrl.BaseUrlImage + data.categoryImage }}
        resizeMode={handleImageResizeMethod()}
        style={styles.ImgStyle}
        imageStyle={{
          transform: [{ translateX: handleRotateImage() }],
        }}
      ></ImageBackground> */}
      <FastImage
        style={styles.ImgStyle}
        source={{
          uri: BaseUrl.BaseUrlImage + data.categoryImage,
          priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.cover}
      >
        <CustomText style={styles.cateTxt}>
          {handleSelectedLanguage(selectedLanguage)
            ? data?.categoryName
            : data?.categoryNameArabic}
          {/* {data?.categoryName} */}
        </CustomText>
      </FastImage>
    </View>
  );
};

export default ClothesCard;

const styles = StyleSheet.create({
  ImgStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(15),
    overflow: "hidden",
  },
  CardWrapper: {
    borderRadius: moderateScale(15),
    width: "100%",
    height: moderateScale(148),
    backgroundColor: Colors.ClothesCardClr,
    marginBottom: moderateScale(15),
  },
  cateTxt: {
    fontSize: moderateScale(28),
    marginVertical: moderateScale(15),
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
