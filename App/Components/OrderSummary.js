import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOrderId } from "../Redux/HomeReducer/homeSlice";

// OrderSummary Component
const OrderSummary = ({
  orderId,
  date,
  time,
  itemsTotal,
  totalPrice,
  status,
  navigation,
  orderHeading,
  placedHeading,
  selectedLanguage
}) => {
  let dispatch = useDispatch();

  const handleNav = () => {
    console.log("orderId>>>>>>>>>>>>>>>>>>>>>>>>>", orderId);
    dispatch(setSelectedOrderId(orderId));
    navigation.navigate("OrderDetail");
  };

  return (
    <TouchableOpacity
      onPress={() => handleNav()}
      style={styles.orderSummaryContainer}
    >
      <View style={[styles.orderHeader,{flexDirection:selectedLanguage=='AR'?'row-reverse':'row'}]}>
        <CustomText style={{ fontSize: moderateScale(14), fontWeight: "600" }}>
          {orderHeading}
          {orderId}
        </CustomText>
      </View>
      <View
        style={[styles.containerWrapper, { justifyContent: "space-between" ,flexDirection:selectedLanguage=='AR'?'row-reverse':'row'}]}
      >
        <CustomText
          style={{
            fontSize: moderateScale(12),
            fontWeight: "400",
            marginBottom: moderateScale(10),
            color: "#C5C5C5",
          }}
        >
          {placedHeading} {date} {time}
        </CustomText>
        <CustomText style={{ fontSize: moderateScale(14), fontWeight: "400" }}>
          {status}
        </CustomText>
      </View>
      {/* <View style={styles.orderTotal}>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View> */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  orderSummaryContainer: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#444',
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    color: "#fff",
    fontSize: 16,
  },

  statusContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: moderateScale(20),
    width: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
  },

  containerWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default OrderSummary;
