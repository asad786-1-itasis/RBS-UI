// ProductCard.js
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";
import Colors from "../utils/Colors";
import BaseUrl from "../API/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setSubcategoryId } from "../Redux/HomeReducer/homeSlice";
import { handleSelectedLanguage } from "../utils/CommonMethod";
// import FastImage from "react-native-fast-image";

const ProductCardHome = ({
  item,
  image,
  heading,
  price,
  rating,
  navigation,
  headingArabic,
}) => {
  let dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const handleNav = (id) => {
    console.log(id);
    dispatch(setSubcategoryId(id));
    navigation.navigate("SeeAllProducts");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handleNav(item?.id)}
      style={styles.card}
    >
      <View style={styles.OverLay} />
      <View style={styles.imageContainer}>
        {/* <Image
          source={{ uri: BaseUrl.BaseUrlImage + image }}
          style={styles.image}
          resizeMode="cover"
        /> */}
        <FastImage
          style={styles.image}
          source={{
            uri: BaseUrl.BaseUrlImage + image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {/* <TouchableOpacity style={styles.cartButton}>
          <Ionicons
            name="cart-outline"
            size={moderateScale(20)}
            color="white"
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.HeartBtn}>
          <Ionicons
            name="heart-outline"
            size={moderateScale(20)}
            color={Colors.black}
          />
        </TouchableOpacity> */}
      </View>
      <View style={[styles.infoContainer]}>
        <CustomText
          style={{
            fontSize: moderateScale(12),
            fontWeight: "600",
            marginLeft: 2,
            // color: "black",
          }}
        >
          {handleSelectedLanguage(selectedLanguage) ? heading : headingArabic}
        </CustomText>
        {/* <CustomText
          style={{
            fontSize: moderateScale(12),
            fontWeight: "600",
          }}
        >
          {price}
        </CustomText> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 5, // Shadow for iOS
    shadowColor: "#000", // Shadow color
    width: moderateScale(120),
    marginRight: moderateScale(15),
  },
  imageContainer: {
    height: moderateScale(158),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  cartButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#C6924E", // Button color
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },
  HeartBtn: {
    height: moderateScale(20),
    position: "absolute",
    bottom: 0,
    right: 10,
    top: 10,
  },
  infoContainer: {
    marginTop: moderateScale(5),
  },
  heading: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  price: {
    fontSize: moderateScale(14),
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: moderateScale(5),
  },
  OverLay: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: moderateScale(160),
    position: "absolute",
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ProductCardHome;
