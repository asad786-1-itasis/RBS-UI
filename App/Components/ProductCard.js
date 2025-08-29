// ProductCard.js
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";
import Colors from "../utils/Colors";
import BaseUrl from "../API/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setProductId } from "../Redux/HomeReducer/homeSlice";
import { useCustomToast } from "../utils/ToastNofticiation";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { handleSelectedLanguage } from "../utils/CommonMethod";
// import FastImage from "react-native-fast-image";

const ProductCard = ({
  image,
  heading,
  price,
  rating,
  navigation,
  isInWishList,
  item,
  onHeartPress,
  onRemoveWishListPress,
  headingArabic,
}) => {
  let dispatch = useDispatch();
  let { showToast } = useCustomToast();
  const loginData = useSelector((state) => state.auth.loginData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  const [loading, setLoading] = useState(false);

  const [isInWishlists, setIsInWishlists] = useState(isInWishList);

  const handleNavigationProductDetail = (val) => {
    console.log("\n\n\n\n\n\nPrduct Item>>>>>>>>", val?.id);
    dispatch(setProductId(val?.id));
    navigation.navigate("ProductDetail");
  };

  const handleWishList = (id) => {
    onHeartPress(id, setIsInWishlists);
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigationProductDetail(item)}
      style={styles.card}
    >
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
        <TouchableOpacity
          onPress={() => handleNavigationProductDetail(item)}
          style={styles.cartButton}
        >
          <Ionicons
            name="cart-outline"
            size={moderateScale(20)}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isInWishlists
              ? onRemoveWishListPress(item?.id, setIsInWishlists)
              : handleWishList(item?.id)
          }
          style={styles.HeartBtn}
        >
          <Ionicons
            name={isInWishlists ? "heart" : "heart-outline"}
            size={moderateScale(20)}
            color={isInWishlists ? Colors.red : Colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <CustomText
          style={{
            fontSize: moderateScale(14),
            fontWeight: "600",
          }}
        >
          {handleSelectedLanguage(selectedLanguage) ? heading : headingArabic}
        </CustomText>
        <CustomText
          style={{
            fontSize: moderateScale(14),
            fontWeight: "600",
          }}
        >
          {HandleCurrencySIgn(loginData?.currency) + price}
        </CustomText>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <Ionicons
              key={index}
              name={index < rating ? "star" : "star-outline"}
              size={moderateScale(14)}
              color={"#C6924E"} // Set the star color
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(10),
    elevation: 3, // Shadow for Android
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 5, // Shadow for iOS
    shadowColor: "#000", // Shadow color
  },
  imageContainer: {
    position: "relative",
    height: moderateScale(178),
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
});

export default ProductCard;
