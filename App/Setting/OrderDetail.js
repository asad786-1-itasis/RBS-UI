import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/Entypo";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import Colors from "../utils/Colors";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../utils/Loader";
import CustomStatusBar from "../utils/CustomStatusBar";
import { moderateScale } from "react-native-size-matters";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { useCustomToast } from "../utils/ToastNofticiation";
import BaseUrl from "../API/BaseUrl";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RatingModal from "../utils/RatingModal";
import Icon from "react-native-vector-icons/MaterialIcons";
// import TimelineScreen from "../Components/TimelineScreen";
import { setDeliveryStatus } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";

const OrderDetail = () => {
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
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [modalVisibleRating, setModalVisibleRating] = useState(false);
  const [buttonActive, setButtonActive] = useState(0);
  const [variantId, setVariantId] = useState(0);
  const selectedOrderId = useSelector((state) => state.home.selectedOrderId);

  useEffect(() => {
    GetOrdersDetail();
  }, []);

  const GetOrdersDetail = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsGetOrderDetails + "?orderId=" + selectedOrderId
      ).then((result) => {
        // console.log("Response GetOrdersDetail >>>>>>>>>>>>", result?.data[0].status);
        dispatch(setDeliveryStatus(result?.data));
        if (result?.success == true) {
          setOrderDetail(result?.data);
          setLoading(false);
        } else {
          setOrderDetail([]);
          showToast(result?.message);
          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDateFormat = (valDate) => {
    if (valDate == null) {
      return "N/A";
    } else {
      const formattedDate = moment(valDate).format("DD MMM YYYY HH:mm:ss");
      return formattedDate;
    }
  };
  const handleActivebutton = (val) => {
    if (val == 1) {
      setButtonActive(1);
    } else if (val == 2) {
      setButtonActive(2);
    } else {
      setButtonActive(3);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <CustomStatusBar />
        <Loader size={"large"} color={Colors.primary} />
      </View>
    );
  }

  const handleNavRating = (id) => {
    // console.log(id);
    setVariantId(id);
    setModalVisibleRating(true);
  };
  // console.log("orderDetail>>>>>>", orderDetail[0]?.items);

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: moderateScale(10),
        }}
      >
        <View style={styles.header}>
          <View style={[styles.headerContainer]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.headerContainer,
                { marginLeft: moderateScale(-10) },
              ]}
            >
              <Entypo
                name={"chevron-left"}
                size={moderateScale(25)}
                color={Colors.white} // Star color
              />
            </TouchableOpacity>
            <View>
              <CustomText
                style={{
                  fontSize: moderateScale(18),
                  fontWeight: "500",
                }}
              >
                {/* {} */}
              </CustomText>
            </View>
          </View>
        </View>
        {orderDetail.length > 0 && (
          <>
            <CustomText style={styles.orderNumber}>
              {t("orderNumber")}
              {orderDetail[0]?.id}
            </CustomText>
            <CustomText style={styles.placedDate}>
              {t("placedOn")}
              {handleDateFormat(orderDetail[0]?.orderDate)}
            </CustomText>
            <View
              style={[
                styles.estimateContainer,
                {
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <FontAwesome name="calendar" size={14} color="#ffcc66" />
              <CustomText style={styles.estimateText}>
                {t("estimatedDelivery")}:{" "}
                {handleDateFormat(orderDetail[0]?.deliveryDate)}
              </CustomText>
            </View>
          </>
        )}

        {/* Order Items */}
        {orderDetail[0]?.items.map((item, index) => {
          return (
            <View style={styles.itemContainer}>
              <View style={[styles.itemRow, {}]}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: BaseUrl.BaseUrlImage + item?.variant.image }}
                />
                <View style={styles.itemDetails}>
                  <CustomText style={styles.itemName}>{item.title}</CustomText>
                  <CustomText style={styles.itemAttributes}>
                    Color:{" "}
                    <View
                      style={[
                        styles.colorWrapper,
                        {
                          backgroundColor: item?.variant?.color,
                        },
                      ]}
                    ></View>{" "}
                    | Size: {item?.variant?.size}
                  </CustomText>
                  <CustomText style={styles.itemPrice}>
                    ${item?.totalPrice}
                  </CustomText>
                  <CustomText style={styles.itemQty}>
                    Qty: {item?.quantity}
                  </CustomText>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleNavRating(item?.variant?.id)}
                  style={{
                    paddingHorizontal: 15,
                    // paddingVertical: 10,
                    backgroundColor: Colors.primary,
                    height: moderateScale(20),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  {/* <Icon
                    name="rate-review"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 10,
                    }}
                    size={24}
                    color={Colors.primary}
                  /> */}
                  <CustomText style={{ fontSize: 12 }}>
                    {t("addReview")}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* Buttons */}

        {orderDetail.length > 0 ? (
          <>
            <View
              style={[
                styles.buttonContainer,
                {
                  flexDirection:
                    selectedLanguage == "AR" ? "row-reverse" : "row",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => handleActivebutton(3)}
                style={[
                  styles.invoiceButton,
                  {
                    borderRadius: 100,
                    backgroundColor:
                      buttonActive == 3 ? Colors.primary : "#333",
                  },
                ]}
              >
                <CustomText style={styles.buttonText}>
                  {t("invoice")}
                </CustomText>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => handleActivebutton(2)}
                style={[
                  styles.reviewButton,
                  {
                    borderRadius: 100,
                    backgroundColor:
                      buttonActive == 2 ? Colors.primary : "#333",
                  },
                ]}
              >
                <CustomText style={styles.buttonText}>Write review</CustomText>
              </TouchableOpacity> */}
              <TouchableOpacity
                // onPress={() => handleActivebutton(1)}
                // onPress={() => navigation.navigate("TimelineScreen")}
                style={[
                  styles.trackButton,
                  {
                    borderRadius: 100,
                    backgroundColor:
                      buttonActive == 1 ? Colors.primary : "#333",
                  },
                ]}
              >
                <CustomText style={styles.trackButtonText}>
                  {t("trackMyOrder")}
                </CustomText>
              </TouchableOpacity>
            </View>

            {/* Delivery Information */}
            {buttonActive == 0 ||
              (buttonActive == 3 && (
                <>
                  <View style={styles.deliveryContainer}>
                    <CustomText style={styles.sectionTitle}>
                      Delivery
                    </CustomText>
                    <CustomText style={styles.deliveryText}>
                      {orderDetail[0]?.address?.title}
                    </CustomText>
                    <CustomText style={styles.deliveryText}>
                      {orderDetail[0]?.address?.address}
                    </CustomText>
                    <CustomText style={styles.deliveryText}>
                      {orderDetail[0]?.address?.city}
                    </CustomText>
                    <CustomText style={styles.deliveryText}>
                      {orderDetail[0]?.address?.phoneNo}
                    </CustomText>
                    <CustomText style={styles.deliveryText}>
                      {orderDetail[0]?.address?.postalCode}
                    </CustomText>
                  </View>
                  {/* Payment Information */}
                  <View style={styles.paymentContainer}>
                    <CustomText style={styles.sectionTitle}>Payment</CustomText>
                    <CustomText style={styles.paymentText}>
                      Visa **** 1656
                    </CustomText>
                    <Image
                      style={styles.paymentIcon}
                      source={{ uri: "https://example.com/visa-icon.png" }}
                    />
                  </View>
                </>
              ))}
          </>
        ) : (
          <View style={styles.noDataWrapper}>
            <CustomText style={{ fontSize: moderateScale(14) }}>
              No data found
            </CustomText>
          </View>
        )}

        <RatingModal
          visible={modalVisibleRating}
          onClose={() => setModalVisibleRating(false)}
          id={variantId}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderNumber: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  placedDate: {
    color: "#AAA",
    fontSize: 14,
    marginTop: 5,
  },
  estimateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  estimateText: {
    color: Colors.primary,
    fontSize: 14,
    marginLeft: 5,
  },
  itemContainer: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  itemImage: {
    width: moderateScale(80),
    height: moderateScale(85),
    borderRadius: 15,
    marginRight: moderateScale(10),
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemAttributes: {
    color: "#AAA",
    fontSize: 14,
    marginVertical: 5,
  },
  itemPrice: {
    color: "#FFF",
    fontSize: 16,
  },
  itemQty: {
    color: "#AAA",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 20,
  },
  invoiceButton: {
    backgroundColor: "#333",
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 5,
    marginRight: 10,
  },
  reviewButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  trackButton: {
    paddingVertical: 5,
    paddingHorizontal: 19,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
  trackButtonText: {
    // color: "#000",
    fontSize: 14,
  },
  deliveryContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  deliveryText: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 2,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  paymentText: {
    color: "#FFF",
    fontSize: 14,
    marginRight: 10,
  },
  paymentIcon: {
    width: 40,
    height: 20,
  },
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  colorWrapper: {
    height: 12,
    width: 12,
    paddingHorizontal: moderateScale(10),
    borderRadius: 100,
  },
  noDataWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrderDetail;
