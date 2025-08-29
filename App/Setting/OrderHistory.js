import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomStyle from "../utils/CustomStyle";
import Colors from "../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import ClothesCard from "../Components/ClothesCard";
import images from "../utils/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "react-native-vector-icons/Entypo";
// import { AccordionList } from "accordion-collapse-react-native";
import CustomText from "../Components/CustomText";
import FilterModal from "../Components/FilterModal";
import WishListProduct from "../Components/WishListProduct";
import CustomStatusBar from "../utils/CustomStatusBar";
import OrderSummary from "../Components/OrderSummary";
import OrderItem from "../Components/OrderItem";
import { useNavigation } from "@react-navigation/native";
import RatingModal from "../utils/RatingModal";
import { useSelector } from "react-redux";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import moment from "moment";
import Loader from "../utils/Loader";
import {t, setAppLanguage } from "../Languages/translations";


const AllOrders = () => {
  let navigation = useNavigation();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);







  const loginData = useSelector((state) => state.auth.loginData);
  const [modalVisibleRating, setModalVisibleRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsGetOrders +
          "?userId=" +
          loginData?.id +
          "&status=All"
      ).then((result) => {
        console.log("Response GetOrders >>>>>>>>>>>>", result?.data);
        if (result?.success == true) {
          setOrderData(result?.data);
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

  const handleDateFormat = (valDate) => {
    const formattedDate = moment(valDate).format("DD MMM YYYY HH:mm:ss");
    return formattedDate;
  };

  return (
    <View>
      {loading ? (
        <Loader size={31} color={Colors.primary} />
      ) : (
        <FlatList
          data={orderData}
          renderItem={({ item }) => (
            <OrderSummary
              orderId={item?.id}
              date={handleDateFormat(item?.orderDate)}
              // itemsTotal="4"
              // totalPrice="79.98"
              orderHeading={t('orderNumber')}
              placedHeading={t('placedOn')}
              status={item?.status}
              navigation={navigation}
              selectedLanguage={selectedLanguage}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {/* First Order */}

      {/* <View style={styles.containerWrapper}>
        <CustomText
          style={{
            fontSize: moderateScale(14),
            fontWeight: "400",
          }}
        >
          4 items, Total :
        </CustomText>
        <CustomText style={{ fontSize: moderateScale(15), fontWeight: "600" }}>
          $79.98
        </CustomText>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisibleRating(true)}
        style={[CustomStyle.FullButton, { paddingVertical: moderateScale(10) }]}
      >
        <CustomText style={{ fontSize: moderateScale(16), fontWeight: "600" }}>
          Add review
        </CustomText>
      </TouchableOpacity> */}

      {/* <View
        style={{
          borderWidth: 0.5,
          borderColor: "grey",
          marginVertical: 10,
        }}
      ></View> */}

      {/* Second Order */}
      {/* <OrderSummary
        orderId="10802013"
        date="09 Jun 2022"
        time="22:40:35"
        itemsTotal="4"
        totalPrice="79.98"
        status="Paid"
      />
      <OrderItem
        imageSource={images.Shirt3} // Replace with actual image URL
        title="Women's cotton bottoms"
        price="26.00"
        quantity="2"
        status="Delivered"
      />
      <OrderItem
        imageSource={images.Shirt1} // Replace with actual image URL
        title="Women's silk blouse"
        price="13.99"
        quantity="2"
        status="Delivered"
      /> */}
      {/* <View style={styles.containerWrapper}>
        <CustomText
          style={{
            fontSize: moderateScale(14),
            fontWeight: "400",
          }}
        >
          4 items, Total :
        </CustomText>
        <CustomText style={{ fontSize: moderateScale(15), fontWeight: "600" }}>
          $79.98
        </CustomText>
      </View>
      <RatingModal
        visible={modalVisibleRating}
        onClose={() => setModalVisibleRating(false)}
      /> */}
    </View>
  );
};
// OrderItem Component

// Main Order History Screen
const OrderHistory = () => {
  let navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(1);
  const handleActiveTab = (val) => {
    if (val == 1) {
      setActiveTab(val);
    } else if (val == 2) {
      setActiveTab(2);
    } else if (val == 3) {
      setActiveTab(3);
    } else if (val == 4) {
      setActiveTab(4);
    }
  };
  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
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
            Order history
          </CustomText>
        </View>
      </TouchableOpacity>
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Order Tabs */}
          <View style={styles.tabsContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => handleActiveTab(1)}
                style={styles.CenterContainer}
              >
                <CustomText style={styles.TabTxt}>{t('all')}</CustomText>
                <View
                  style={[
                    styles.BottomLine,
                    {
                      borderBottomColor:
                        activeTab == 1 ? "white" : "transparent",
                      width: activeTab == 1 ? "50%" : "100%",
                    },
                  ]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleActiveTab(2)}
                style={styles.CenterContainer}
              >
                <CustomText style={styles.TabTxt}>{t('toPay')}</CustomText>
                <View
                  style={[
                    styles.BottomLine,
                    {
                      borderBottomColor:
                        activeTab == 2 ? "white" : "transparent",
                      width: activeTab == 2 ? "60%" : "100%",
                    },
                  ]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleActiveTab(3)}
                style={styles.CenterContainer}
              >
                <CustomText style={styles.TabTxt}>{t('toShip')}</CustomText>
                <View
                  style={[
                    styles.BottomLine,
                    {
                      borderBottomColor:
                        activeTab == 3 ? "white" : "transparent",
                      width: activeTab == 3 ? "60%" : "100%",
                    },
                  ]}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleActiveTab(4)}
                style={styles.CenterContainer}
              >
                <CustomText style={styles.TabTxt}>{t('toReceive')}</CustomText>
                <View
                  style={[
                    styles.BottomLine,
                    {
                      borderBottomColor:
                        activeTab == 4 ? "white" : "transparent",
                      width: activeTab == 4 ? "80%" : "100%",
                    },
                  ]}
                ></View>
              </TouchableOpacity>
            </View>
          </View>
          {activeTab == 1 ? (
            <AllOrders />
          ) : activeTab == 2 ? (
            <CustomText>To Pay</CustomText>
          ) : activeTab == 3 ? (
            <CustomText>To Ship</CustomText>
          ) : (
            <CustomText>To Receive</CustomText>
          )}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  tab: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
  },
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
  paidStatus: {
    color: "#fff",
    fontSize: 16,
  },
  orderDate: {
    color: "#aaa",
    fontSize: 14,
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totalItems: {
    color: "#fff",
    fontSize: 16,
  },
  totalPrice: {
    color: "#fff",
    fontSize: 16,
  },
  orderItemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#444',
  },
  productImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginRight: 10,
    borderRadius: moderateScale(10),
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    color: "#fff",
    fontSize: 16,
  },
  productPrice: {
    color: "#fff",
    fontSize: 14,
  },
  productQuantity: {
    color: "#aaa",
    fontSize: 12,
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
  status: {
    backgroundColor: "#C6924E",
    color: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  containerWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  TabTxt: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    marginHorizontal: moderateScale(10),
    // width:moderateScale(20)
  },
  CenterContainer: { justifyContent: "center", alignItems: "center" },
  BottomLine: {
    borderBottomWidth: 1,
    width: "50%",
    position: "absolute",
    bottom: moderateScale(-10),
  },
});

export default OrderHistory;
