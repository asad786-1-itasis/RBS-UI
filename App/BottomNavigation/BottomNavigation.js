import {
  StyleSheet,
  Text,
  View,
  Appearance,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../utils/Colors';
import MainSearch from '../Search/MainSearch';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Fonts from '../utils/Fonts';
import SearchedData from '../Search/SearchedData';
import WishList from '../Whishlist/WishList';
import CartScreen from '../Cart/CartScreen';
import CardDetail from '../Cart/CardDetail';
import PaymentMethod from '../Cart/PaymentMethod';
import PaymentSuccess from '../Cart/PaymentSuccess';
import SettingsScreen from '../Setting/SettingsScreen';
import OrderHistory from '../Setting/OrderHistory';
import ChangePassword from '../Setting/ChangePassword';
import EditInfo from '../Setting/EditInfo';
import RateApp from '../Setting/RateApp';
import MyAccount from '../Setting/MyAccount';
import DeliveryStatusScreen from '../Setting/DeliveryStatusScreen';
import Home from '../HomeStack/Home';
import SeeAllProducts from '../HomeStack/SeeAllProducts';
import ProductDetail from '../HomeStack/ProductDetail';
import ShippingAddressDetail from '../Cart/ShippingAddressDetail';
import AddEditAddress from '../Cart/AddEditAddress';
import { useSelector } from 'react-redux';
import { t, setAppLanguage } from '../Languages/translations';
import OrderDetail from '../Setting/OrderDetail';
import AdminChat from '../ChatStack/AdminChat';
import AssignTask from '../TaskStack/AssignTask';
import TaskDetails from '../TaskStack/TaskDetails';
import MyTasks from '../Components/MyTasks';
import Invoices from '../InvoiceStack/Invoices';
import ProfileScreen from '../Components/ProfileScreen';
// import TimelineScreen from "../Components/TimelineScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const iconSize = moderateScale(21);

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
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminChat"
        component={AdminChat}
      />
    </Stack.Navigator>
  );
}

function TaskStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AssignTask"
        component={AssignTask}
      />
        <Stack.Screen
        options={{ headerShown: false }}
        name="TaskDetails"
        component={TaskDetails}
      />
    </Stack.Navigator>
  );
}
function InvoiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Invoices"
        component={Invoices}
      />
        <Stack.Screen
        options={{ headerShown: false }}
        name="TaskDetails"
        component={TaskDetails}
      />
    </Stack.Navigator>
  );
}
function BottomNavigation() {
  const selectedLanguage = useSelector(state => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == 'fr') {
      setAppLanguage('fr');
    } else {
      setAppLanguage('en');
    }
  }, [selectedLanguage]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.activeClr,
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontFamily: Fonts.JOST,
        },
        tabBarStyle: {},
      }}

      //   sceneContainerStyle={{backgroundColor: 'red'}}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == 'ios'
                  ? selectedLanguage == 'AR'
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t('home'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Entypo
                name={'shop'}
                size={iconSize}
                // color={colorScheme ==='dark'? focused ?Colors.primary : 'white':focused ?Colors.primary : 'black'}
                color={focused ? Colors.activeClr : 'grey'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Task"
        component={TaskStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == 'ios'
                  ? selectedLanguage == 'AR'
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t('Task'),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Ionicons
                name={'document-text-outline'}
                size={iconSize}
                color={focused ? Colors.activeClr : 'grey'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == 'ios'
                  ? selectedLanguage == 'AR'
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t('search'),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Ionicons
                name={'chatbubble-ellipses-outline'}
                size={iconSize}
                color={focused ? Colors.activeClr : 'grey'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Invoice"
        component={InvoiceStack}
        options={({ route }) => ({
          tabBarStyle: [
            styles.tabStyle,
            {
              height:
                Platform.OS == 'ios'
                  ? selectedLanguage == 'AR'
                    ? moderateScale(90)
                    : moderateScale(80)
                  : moderateScale(55),
              display: getRouteName(route),
            },
          ],
          tabBarLabel: t('Invoices'),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Feather
                name={'file-text'}
                size={iconSize}
                // color={colorScheme ==='dark'? focused ?Colors.primary : 'white':focused ?Colors.primary : 'black'}
                color={focused ? Colors.activeClr : 'grey'}
              />
            </View>
          ),
        })}
      />
      {/* <Tab.Screen
        name="Cart"
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
          tabBarLabel: t("cart"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <Entypo
                name={"shopping-cart"}
                size={iconSize}
                color={focused ? Colors.activeClr : "grey"}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
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
          tabBarLabel: t("more"),
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: moderateScale(1) }}>
              <AntDesign
                name={"setting"}
                size={iconSize}
                color={focused ? Colors.activeClr : "grey"}
              />
            </View>
          ),
        })}
      /> */}
    </Tab.Navigator>
  );
}

const getRouteName = route => {
  // if(route?.name ==='WishListStack'){
  //   return 'none'
  // }
  const routeName = getFocusedRouteNameFromRoute(route);
  //   console.log('routeName>>>>>>>>>>>>>>>>>>>>', routeName);
  if (
    routeName?.includes('OrderHistory') ||
    routeName?.includes('RateApp') ||
    routeName?.includes('EditInfo') ||
    routeName?.includes('MyAccount') ||
    routeName?.includes('ChangePassword') ||
    routeName?.includes('PaymentMethod') ||
    routeName?.includes('CardDetail') ||
    routeName?.includes('AddEditAddress') ||
    routeName?.includes('ProfileScreen') ||
    routeName?.includes('ActivityScreen')
  ) {
    return 'none';
  } else {
    return 'flex';
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
    position: 'absolute', // Make sure the tab bar is positioned correctly
    // overflow: "hidden", // Ensure the radius applies properly without overflow issues
  },
});
