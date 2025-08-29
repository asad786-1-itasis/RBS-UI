import {
  StyleSheet,
  Text,
  View,
  Appearance,
  Linking,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../utils/Colors";
import MainSearch from "../Search/MainSearch";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import Fonts from "../utils/Fonts";
import SearchedData from "../Search/SearchedData";
import WishList from "../Whishlist/WishList";
import CartScreen from "../Cart/CartScreen";
import CardDetail from "../Cart/CardDetail";
import PaymentMethod from "../Cart/PaymentMethod";
import PaymentSuccess from "../Cart/PaymentSuccess";
import SettingsScreen from "../Setting/SettingsScreen";
import OrderHistory from "../Setting/OrderHistory";
import ChangePassword from "../Setting/ChangePassword";
import EditInfo from "../Setting/EditInfo";
import RateApp from "../Setting/RateApp";
import MyAccount from "../Setting/MyAccount";
import DeliveryStatusScreen from "../Setting/DeliveryStatusScreen";
import Home from "../HomeStack/Home";
import SeeAllProducts from "../HomeStack/SeeAllProducts";
import ProductDetail from "../HomeStack/ProductDetail";
import ShippingAddressDetail from "../Cart/ShippingAddressDetail";
import AddEditAddress from "../Cart/AddEditAddress";
import { useSelector } from "react-redux";
import { t, setAppLanguage } from "../Languages/translations";
import OrderDetail from "../Setting/OrderDetail";
// import TimelineScreen from "../Components/TimelineScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const iconSize = moderateScale(21);
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainSearch"
        component={MainSearch}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchedData"
        component={SearchedData}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartScreen"
        component={CartScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="SeeAllProducts"
        component={SeeAllProducts}
      />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderHistory"
        component={OrderHistory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditInfo"
        component={EditInfo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RateApp"
        component={RateApp}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyAccount"
        component={MyAccount}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DeliveryStatusScreen"
        component={DeliveryStatusScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetail"
        component={OrderDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="WishList"
        component={WishList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartScreen"
        component={CartScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="TimelineScreen"
        component={TimelineScreen}
      /> */}

      {/* auth End */}
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SeeAllProducts"
        component={SeeAllProducts}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartScreen"
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartScreen"
        component={CartScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CardDetail"
        component={CardDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentMethod"
        component={PaymentMethod}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentSuccess"
        component={PaymentSuccess}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShippingAddressDetail"
        component={ShippingAddressDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddEditAddress"
        component={AddEditAddress}
      />
    </Stack.Navigator>
  );
}

function WishListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="WishList"
        component={WishList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CartScreen"
        component={CartScreen}
      />
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#F0F0F0",
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontFamily: Fonts.JOST,
        },
        tabBarStyle: {},
      }}

      //   sceneContainerStyle={{backgroundColor: 'red'}}
    >
      <Tab.Screen
        name="Homes"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == "ios"
                  ? selectedLanguage == "AR"
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t("home"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Entypo
                name={"shop"}
                size={iconSize}
                // color={colorScheme ==='dark'? focused ?Colors.primary : 'white':focused ?Colors.primary : 'black'}
                color={focused ? Colors.primary : "#F0F0F0"}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == "ios"
                  ? selectedLanguage == "AR"
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t("search"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Octicons
                name={"search"}
                size={iconSize}
                color={focused ? Colors.primary : "#F0F0F0"}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishListStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == "ios"
                  ? selectedLanguage == "AR"
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t("wishList"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Feather
                name={"shopping-bag"}
                size={iconSize}
                color={focused ? Colors.primary : "#F0F0F0"}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == "ios"
                  ? selectedLanguage == "AR"
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t("cart"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Entypo
                name={"shopping-cart"}
                size={iconSize}
                color={focused ? Colors.primary : "#F0F0F0"}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == "ios"
                  ? selectedLanguage == "AR"
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t("more"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <AntDesign
                name={"setting"}
                size={iconSize}
                color={focused ? Colors.primary : "#F0F0F0"}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const getRouteName = (route) => {
  // if(route?.name ==='WishListStack'){
  //   return 'none'
  // }
  const routeName = getFocusedRouteNameFromRoute(route);
  //   console.log('routeName>>>>>>>>>>>>>>>>>>>>', routeName);
  if (
    routeName?.includes("OrderHistory") ||
    routeName?.includes("RateApp") ||
    routeName?.includes("EditInfo") ||
    routeName?.includes("MyAccount") ||
    routeName?.includes("ChangePassword") ||
    routeName?.includes("PaymentMethod") ||
    routeName?.includes("CardDetail") ||
    routeName?.includes("AddEditAddress") ||
    routeName?.includes("ActivityScreen")
  ) {
    return "none";
  } else {
    return "flex";
  }
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: Colors.textInputClr,
    paddingTop: moderateScale(5),
    borderTopWidth: 0,
    // borderRadius: 10,
    borderTopLeftRadius: moderateScale(15), // Add top left radius
    borderTopRightRadius: moderateScale(15), // Add top right radius
    position: "absolute", // Make sure the tab bar is positioned correctly
    // overflow: "hidden", // Ensure the radius applies properly without overflow issues
  },
});
