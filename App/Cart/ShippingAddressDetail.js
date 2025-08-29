import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
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
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Endpoints from "../API/Endpoints";
import { GETAPICALL, POSTAPICALLFORCONFIRMCHALLENGE } from "../API/ApiCalling";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utils/Loader";
import {
  setAddressId,
  setAddressUserData,
  setAddToCartData,
} from "../Redux/HomeReducer/homeSlice";
import { useCustomToast } from "../utils/ToastNofticiation";
import { t, setAppLanguage } from "../Languages/translations";

const ShippingAddressDetail = () => {
  let navigation = useNavigation();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  let { showToast } = useCustomToast();
  let dispatch = useDispatch();
  let focus = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [addressId, setAddressId] = useState(0);
  const loginData = useSelector((state) => state.auth.loginData);
  const addToCartData = useSelector((state) => state.home.addToCartData);
  const couponDetailData = useSelector((state) => state.home.couponDetailData);
  const totalPrice = useSelector((state) => state.home.totalPrice);

  useEffect(() => {
    if (focus) {
      GetAddressData();
    }
  }, [focus]);

  const GetAddressData = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsGetAddresses + "?userId=" + loginData?.id
      ).then((result) => {
        if (result?.success == true) {
          setAddressData(result?.data);

          setLoading(false);
        } else {
          showToast(result?.message);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const DeleteAddressData = (id) => {
    try {
      GETAPICALL(Endpoints.EndpointsDeleteAddress + "?addressId=" + id).then(
        (result) => {
          console.log("Response GetAddressData >>>>>>>>>>>>", result?.data);
          if (result?.success == true) {
            GetAddressData();
          } else {
            showToast(result?.message);
          }
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    // setAddressUserData
    dispatch(setAddressUserData(data));
    navigation.navigate("AddEditAddress");
  };
  // console.log(addToCartData)
  const handleCreateOrder = () => {
    if (addressId == 0) {
      showToast("Please select address");
      return false;
    }
    if (!addToCartData) {
      showToast("your cart is empty now. Please add new items");
      return false;
    }

    try {
      setLoadingOrder(true);
      // Construct the JSON data
      const data = {
        CustomerId: loginData?.id, // Replace with actual customer ID
        TotalAmount: parseFloat(totalPrice), // Convert total price to number
        Notes: "Urgent delivery, please.", // Example note
        CouponId: couponDetailData != null ? couponDetailData.couponId : null,
        DiscountPercentage:
          couponDetailData != null ? couponDetailData.discountPercentage : null,
        AddressId: addressId,
        Currency: loginData?.currency,
        Items: addToCartData.map((item) => ({
          ProductId: item.productId,
          VariantId: item.id,
          quantity: item.newQuantity == 0 ? 1 : item.newQuantity,
          TotalPrice:
            loginData?.currency == "USD"
              ? Number(item.usdPrice)
              : Number(item.aedPrice), // Convert to number if necessary
        })),
      };
      console.log(data);
      POSTAPICALLFORCONFIRMCHALLENGE(
        Endpoints.EndpointsCreateOrder,
        data,
        false
      ).then((result) => {
        console.log("Response handleCoupon >>>>>>>>>>>>", result);
        if (result?.success == true) {
          showToast("Order successfully created.");
          dispatch(setAddToCartData(null));
          setLoadingOrder(false);
        } else {
          showToast(result?.message);
          setLoadingOrder(false);
        }
      });
    } catch (error) {
      setLoadingOrder(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <View style={[[styles.headerContainer, { flexDirection: "row" }]]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.headerContainer,
            { marginBottom: moderateScale(0), flexDirection: "row" },
          ]}
        >
          <Entypo
            name={"chevron-left"}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
          <CustomText
            style={{
              fontSize: moderateScale(16),
              fontWeight: "600",
              paddingLeft: 10,
            }}
          >
            Select Shipping Address
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("AddEditAddress")}
            style={[
              CustomStyle.FullButton,
              {
                paddingVertical: moderateScale(10),
                backgroundColor: "black",
                borderWidth: 1,
                borderColor: "#C6924E",
                marginHorizontal: moderateScale(10),
                marginBottom: moderateScale(15),
              },
            ]}
          >
            <CustomText style={styles.heading}>+ {t("addAddress")}</CustomText>
          </TouchableOpacity>

          {loading ? (
            <Loader size={25} color={Colors.primary} />
          ) : (
            <>
              <FlatList
                data={addressData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setAddressId(item.id)}
                    style={[
                      styles.cardContainer,
                      {
                        borderWidth: addressId == item.id ? 1 : 0,
                        borderColor: addressId == item.id ? Colors.primary : 0,
                      },
                    ]}
                  >
                    <View style={styles.innerWrapper}>
                      <View style={{ width: "10%" }}>
                        <View style={styles.topRow}>
                          <Icon
                            name="user"
                            size={25}
                            color="white"
                            style={styles.icon}
                          />
                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <CustomText style={styles.heading}>
                          {item.title}
                        </CustomText>

                        <CustomText style={styles.detailText}>
                          {item.address}
                        </CustomText>
                        <CustomText style={[styles.detailText, {}]}>
                          {item.city}
                        </CustomText>
                        <CustomText style={[styles.detailText, {}]}>
                          {item.state}
                        </CustomText>
                        <CustomText style={[styles.detailText, {}]}>
                          {item.postalCode}
                        </CustomText>
                        <CustomText style={[styles.detailText, {}]}>
                          {item.phoneNo}
                        </CustomText>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => handleEdit(item)}
                          style={styles.editButton}
                        >
                          <CustomText style={styles.editText}>Edit</CustomText>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => DeleteAddressData(item.id)}
                      style={styles.Trash}
                    >
                      <Entypo name={"trash"} size={22} color={"red"} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => handleCreateOrder()}
                style={[CustomStyle.FullButton, { marginBottom: 100 }]}
              >
                {loadingOrder ? (
                  <Loader size={25} color={"white"} />
                ) : (
                  <CustomText
                    style={{
                      fontSize: moderateScale(18),
                      paddingVertical: moderateScale(10),
                      fontWeight: "600",
                    }}
                  >
                    Procees order
                  </CustomText>
                )}
              </TouchableOpacity>
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ShippingAddressDetail;

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: Colors.textInputClr,
    width: "100%",
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },

  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "black",
  },
  cardContainer: {
    backgroundColor: Colors.textInputClr, // Black background for the card
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,

    marginHorizontal: moderateScale(10),
    position: "relative",
  },
  topRow: {
    // flexDirection: "row",
    // alignItems: "flex-start",
  },
  icon: {
    marginTop: 1,
  },
  heading: {
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
    // flex: 1,
  },
  editButton: {
    padding: 5,
    paddingHorizontal: 10,
    // backgroundColor: "#444", // Darker shade for Edit button
    borderRadius: 10,
    // width: "15%",
    // justifyContent: "center",
    alignSelf: "flex-end",
  },
  editText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  detailRow: {
    // marginTop: 10,
  },
  detailText: {
    color: "white",
    fontSize: moderateScale(14),
    fontWeight: "500",
    // width: "58%",
    paddingVertical: 1,
  },
  innerWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  Trash: {
    paddingVertical: moderateScale(5),
    alignSelf: "flex-end",

    position: "absolute",
    bottom: 5,
    right: moderateScale(20),
  },
});
