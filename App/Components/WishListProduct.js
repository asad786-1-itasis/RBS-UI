import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";
import Colors from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setAddToCartData, setProductId } from "../Redux/HomeReducer/homeSlice";

import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { useCustomToast } from "../utils/ToastNofticiation";
import { handleSelectedLanguage } from "../utils/CommonMethod";

const WishListProduct = ({
  image,
  heading,
  price,
  rating,
  onRemove,
  item,
  from,
  Myindex,
  headingArabic,
}) => {
  const loginData = useSelector((state) => state.auth.loginData);
  const addToCartData = useSelector((state) => state.home.addToCartData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  let dispatch = useDispatch();

  const handleNavigationProductDetail = (val) => {
    console.log("\n\n\n\n\n\nPrduct Item>>>>>>>>", val);
    dispatch(setProductId(val));
    navigation.navigate("ProductDetail");
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = (item) => {
    const NewData = addToCartData?.map((newData) => {
      if (newData.id === item.id) {
        // Store initial prices if they aren't already set
        const initialAedPrice = newData.initialAedPrice || newData.aedPrice;
        const initialUsdPrice = newData.initialUsdPrice || newData.usdPrice;

        const updatedQuantity = (newData.newQuantity || 1) + 1;
        setQuantity(updatedQuantity);

        return {
          ...newData,
          newQuantity: updatedQuantity,
          initialAedPrice: initialAedPrice, // Keep original AED price
          initialUsdPrice: initialUsdPrice, // Keep original USD price
          aedPrice: initialAedPrice * updatedQuantity, // Update AED price based on quantity
          usdPrice: initialUsdPrice * updatedQuantity, // Update USD price based on quantity
        };
      }
      return newData;
    });
    dispatch(setAddToCartData(NewData));
  };

  const handleDecrease = (item) => {
    const NewData = addToCartData?.map((newData) => {
      if (newData.id === item.id) {
        // Store initial prices if they aren't already set
        const initialAedPrice = newData.initialAedPrice || newData.aedPrice;
        const initialUsdPrice = newData.initialUsdPrice || newData.usdPrice;

        // Decrement quantity but ensure it doesn't go below 1
        const updatedQuantity = Math.max((newData.newQuantity || 1) - 1, 1);
        setQuantity(updatedQuantity);

        return {
          ...newData,
          newQuantity: updatedQuantity,
          initialAedPrice: initialAedPrice, // Keep original AED price
          initialUsdPrice: initialUsdPrice, // Keep original USD price
          aedPrice: initialAedPrice * updatedQuantity, // Update AED price based on quantity
          usdPrice: initialUsdPrice * updatedQuantity, // Update USD price based on quantity
        };
      }
      return newData;
    });
    dispatch(setAddToCartData(NewData));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleNavigationProductDetail(item.id)}
      disabled={from == "cart" ? true : false}
      style={styles.card}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
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
        {from != "cart" && (
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <Ionicons
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={moderateScale(16)}
                color="#C6924E" // Star color
              />
            ))}
          </View>
        )}
        {from == "cart" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handleDecrease(item)}
              style={styles.actionBtn}
            >
              <CustomText style={styles.actionTxt}>-</CustomText>
            </TouchableOpacity>
            <CustomText
              style={[
                styles.actionTxt,
                { marginHorizontal: 10, marginTop: 10 },
              ]}
            >
              {quantity}
            </CustomText>
            <TouchableOpacity
              onPress={() =>
                item.quantity == quantity
                  ? showToast(`Only ${item?.quantity} items available`)
                  : handleIncrease(item)
              }
              style={styles.actionBtn}
            >
              <CustomText style={styles.actionTxt}>+</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Ionicons name="close" size={moderateScale(20)} color={Colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    // backgroundColor: 'white',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    elevation: 3, // Shadow for Android
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 5, // Shadow for iOS
    shadowColor: "#000", // Shadow color
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: moderateScale(15),
  },
  image: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(10),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
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
  removeButton: {
    paddingLeft: moderateScale(10),
    position: "absolute",
    top: 0,
    right: 10,
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  actionTxt: {
    fontSize: moderateScale(12),
    fontWeight: "900",
  },
});

export default WishListProduct;
