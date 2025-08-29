import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { Children, useEffect, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import Colors from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";
import ClothesCard from "../Components/ClothesCard";
import images from "../utils/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { AccordionList } from "accordion-collapse-react-native";
import CustomText from "../Components/CustomText";
import FilterModal from "../Components/FilterModal";
import WishListProduct from "../Components/WishListProduct";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import { useCustomToast } from "../utils/ToastNofticiation";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import BaseUrl from "../API/BaseUrl";
import { setAddToCartData, setCouponDetailData, setTotalPrices } from "../Redux/HomeReducer/homeSlice";
import Feather from "react-native-vector-icons/Feather";
import { setAppLanguage, t } from "../Languages/translations";
import Endpoints from "../API/Endpoints";
import {
  POSTAPICALLFORCONFIRMCHALLENGE,
  POSTAPICALLFORMDATA,
} from "../API/ApiCalling";
import moment from "moment";
import Loader from "../utils/Loader";

const CartScreen = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  let dispatch = useDispatch();
  const addToCartData = useSelector((state) => state.home.addToCartData);
  const loginData = useSelector((state) => state.auth.loginData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  // console.log("addToCartData<<<<<<<<<<<<<<<<<<<<<<<", addToCartData);
  const handleRemove = (id) => {
    // Logic to remove item from wishlist
    console.log(`Remove item with id: ${id}`);
    let newCartData = addToCartData?.filter((item, index) => {
      if (item.id != id) {
        return item;
      }
    });
    dispatch(setAddToCartData(newCartData));
  };
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponDetail, setCouponDetail] = useState(0);
  const [withoutDiscountPricel, setWithoutDiscountPrice] = useState(0);


  useEffect(() => {
    if (addToCartData != null) {
      console.log("addToCartData>>>>>>>>", addToCartData);
      // Calculate total in USD
      const totalUSD = addToCartData?.reduce(
        (acc, item) => acc + item.usdPrice,
        0
      );
      // console.log("Total USD Price:", totalUSD);

      // Calculate total in AED
      const totalAED = addToCartData?.reduce(
        (acc, item) => acc + item.aedPrice,
        0
      );
      // console.log("Total AED Price:", totalAED);

      const discountUSD = handleDiscount(totalUSD);
      const discountAED = handleDiscount(totalAED);
      // console.log(discountUSD);
      // console.log(discountAED);

      if (loginData?.currency == "USD") {
        setTotalPrice(discountUSD);
        dispatch(setTotalPrices(discountUSD))
      } else {
        dispatch(setTotalPrices(discountAED))
        setTotalPrice(discountAED);
      }
      if (loginData?.currency == "USD") {
        setWithoutDiscountPrice(totalUSD);
      } else {
        setWithoutDiscountPrice(totalAED);
      }
      
    } else {
      dispatch(setTotalPrices(0))
      setWithoutDiscountPrice(0);
      setTotalPrice(0);
    }
  }, [addToCartData]);

  const handleDiscount = (price) => {
    let discount = couponDetail; // Get the discount percentage
    let discountedAmount = (Number(price) * Number(discount)) / 100; // Calculate the discount amount
    let discountedPrice = Number(price) - discountedAmount; // Subtract the discount from the total price
    return discountedPrice;
  };

  const handleCoupon = () => {
    if (!coupon) {
      showToast("Please enter coupon");
      return false;
    }

    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("Code", coupon);
      formData.append("RequestDate", moment().format("MM/DD/YYYY"));
      console.log("formData Login >>>>>>>>", formData);
      POSTAPICALLFORMDATA(
        Endpoints.EndpointsValidateCoupon,
        formData,
        false
      ).then((result) => {
        console.log("Response handleCoupon >>>>>>>>>>>>", result?.data);
        if (result?.success == true) {
          setCouponDetail(result?.data?.discountPercentage);
          let discount = result?.data?.discountPercentage; // Get the discount percentage
          let discountedAmount = (Number(totalPrice) * Number(discount)) / 100; // Calculate the discount amount
          let discountedPrice = Number(totalPrice) - discountedAmount; // Subtract the discount from the total price
          setTotalPrice(discountedPrice);
          dispatch(setCouponDetailData(result?.data)) 
          setLoading(false);
        } else {
          showToast(result?.message);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage <= 0) {
      return price; // Return the original price if no valid discount is provided
    }
    console.log("price>>>>>>>>>>>>>>>", price);
    const discountAmount = (price * discountPercentage) / 100;
    // const discountedPrice = price - discountAmount;
    console.log("discountAmount>>.", discountAmount.toFixed(2));
    return discountAmount.toFixed(2); // Round to 2 decimal places
  };

 

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />

      <View style={[styles.headerContainer]}>
        <View
          style={[styles.headerContainer, { marginBottom: moderateScale(0) }]}
        >
          <Entypo
            name={"chevron-left"}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
          <CustomText style={styles.cartTxt}>{t("cart")}</CustomText>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ShippingAddressDetail")}
            // onPress={() => handleCreateOrder()}
            style={[CustomStyle.FullButton, styles.checkoutBtn]}
          >
            <CustomText style={styles.checkoutTxt}>{t("checkOut")}</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(80),
          }}
          keyboardShouldPersistTaps="handled"
        >
          <CustomText
            style={{
              fontSize: moderateScale(14),
              fontWeight: "600",
            }}
          >
            {addToCartData != null ? addToCartData?.length : 0} {t("item")}
          </CustomText>
          <FlatList
            data={addToCartData}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation={"fadeInUp"}
                duration={600}
                delay={index * 100}
              >
                <WishListProduct
                  Myindex={index}
                  image={BaseUrl.BaseUrlImage + item.image}
                  heading={item.title}
                  headingArabic={item.titleArabic}
                  price={
                    HandleCurrencySIgn(loginData?.currency) == "$"
                      ? item?.usdPrice
                      : item?.aedPrice
                  }
                  rating={item.rating}
                  from={"cart"}
                  item={item}
                  onRemove={() => handleRemove(item.id)}
                />
              </Animatable.View>
            )}
          />

          {addToCartData?.length > 0 && (
            <Animatable.View animation={"fadeInUp"} duration={500} delay={200}>
              <View
                style={[
                  styles.footerWrapper,
                  { marginBottom: moderateScale(15) },
                ]}
              >
                <View
                  style={[CustomStyle.InputWithIconWrapper, { marginTop: 0 }]}
                >
                  <TextInput
                    editable={couponDetail ? false : true}
                    placeholderTextColor={"grey"}
                    placeholder="Enter coupon"
                    style={[
                      CustomStyle.InputWithIcon,
                      { paddingLeft: moderateScale(0) },
                    ]}
                    value={coupon}
                    onChangeText={setCoupon}
                  />
                  <TouchableOpacity
                    onPress={() => handleCoupon()}
                    disabled={couponDetail ? true : false}
                    style={[
                      CustomStyle.FullButton,
                      {
                        // borderWidth: 1,
                        // borderColor: "red",
                        paddingHorizontal: moderateScale(10),
                        paddingVertical: moderateScale(5),
                        marginTop: 0,
                      },
                    ]}
                  >
                    {loading ? (
                      <Loader size={10} color={"white"} />
                    ) : (
                      <CustomText style={{}}>{t("enter")}</CustomText>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          )}

          {addToCartData?.length > 0 && (
            <Animatable.View animation={"fadeInUp"} duration={500} delay={200}>
              <View style={styles.footerWrapper}>
                <View style={styles.footerContainer}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                    }}
                  >
                    {t("product")}
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                    }}
                  >
                    {addToCartData != null ? addToCartData.length : 0}
                  </CustomText>
                </View>

                {couponDetail != 0 && (
                  <View
                    style={[
                      styles.footerContainer,
                      { paddingBottom: moderateScale(10) },
                    ]}
                  >
                    <CustomText
                      style={{
                        fontSize: moderateScale(16),
                        fontWeight: "400",
                      }}
                    >
                      {t("discount")}
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: moderateScale(16),
                        fontWeight: "400",
                      }}
                    >
                      {HandleCurrencySIgn(loginData?.currency) == "$"
                        ? `$ ${calculateDiscountedPrice(
                            withoutDiscountPricel,
                            couponDetail
                          )}`
                        : `AED ${calculateDiscountedPrice(
                            withoutDiscountPricel,
                            couponDetail
                          )}`}
                    </CustomText>
                  </View>
                )}

                <View
                  style={[
                    styles.footerContainer,
                    { paddingBottom: moderateScale(10) },
                  ]}
                >
                  <CustomText
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: "400",
                    }}
                  >
                    {t("total")}
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: "400",
                    }}
                  >
                    {HandleCurrencySIgn(loginData?.currency) == "$"
                      ? `$ ${totalPrice}`
                      : `AED ${totalPrice}`}
                  </CustomText>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => [
                  dispatch(setAddToCartData(null)),
                  setCouponDetail(0),
                ]}
                style={[
                  CustomStyle.FullButton,
                  { marginTop: moderateScale(30) },
                ]}
              >
                <CustomText
                  style={{
                    fontSize: moderateScale(18),
                    paddingVertical: moderateScale(10),
                    fontWeight: "600",
                  }}
                >
                  {t("clearCart")}
                </CustomText>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: Colors.textInputClr,
    width: "100%",
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: moderateScale(10),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(15),
  },
  checkoutTxt: {
    fontSize: moderateScale(14),
    paddingVertical: moderateScale(5),
    fontWeight: "400",
  },
  checkoutBtn: {
    paddingHorizontal: moderateScale(15),
    borderRadius: 50,
    paddingVertical: 0,
  },
  cartTxt: {
    fontSize: moderateScale(18),
    fontWeight: "500",
    paddingLeft: 10,
  },
});
