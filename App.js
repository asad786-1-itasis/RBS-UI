// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <NewAppScreen templateFileName="App.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from "react-native";

// import Fonts from "./App/utils/Fonts";
// import Splash from "./App/AuthStack/Splash";
import Login from "./App/AuthStack/Login";
import SignUp from "./App/AuthStack/SignUp";
import ForgetPassword from "./App/AuthStack/ForgetPassword";
// import OtpVerificationScreen from "./App/AuthStack/OtpVerificationScreen";
// import ResetPassword from "./App/AuthStack/ResetPassword";
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import MainSearch from "./App/Search/MainSearch";
// import Test from "./App/Test";
// import SearchedData from "./App/Search/SearchedData";
// import WishList from "./App/Whishlist/WishList";
// import CartScreen from "./App/Cart/CartScreen";
// import PaymentMethod from "./App/Cart/PaymentMethod";
// import CardDetail from "./App/Cart/CardDetail";
// import PaymentSuccess from "./App/Cart/PaymentSuccess";
// import SettingsScreen from "./App/Setting/SettingsScreen";
// import MyAccount from "./App/Setting/MyAccount";
// import RateApp from "./App/Setting/RateApp";
// import ChangePassword from "./App/Setting/ChangePassword";
// import OrderHistory from "./App/Setting/OrderHistory";
// import EditInfo from "./App/Setting/EditInfo";
// import DeliveryStatusScreen from "./App/Setting/DeliveryStatusScreen";
import BottomNavigation from "./App/BottomNavigation/BottomNavigation";
import store from "./App/Redux/store";
import { Provider, useSelector } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import { moderateScale } from "react-native-size-matters";
import LanguageTranslator from "./App/LanguageTranslator";
import AppSetting from "./App/AuthStack/AppSetting";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AppSetting"
        component={AppSetting}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />

      {/*
      
     
      
      <Stack.Screen
        options={{ headerShown: false }}
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPassword}
      /> */}
    </Stack.Navigator>
  );
}

const MainApp = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated in App.js>>>>>>>>>>>>>>>>>>>>', isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomNavigation /> : <AuthStack />}
      {/* <LanguageTranslator /> */}

    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ToastProvider
        placement="bottom"
        duration={5000}
        animationType="slide-in"
        animationDuration={250}
        textStyle={{ fontSize: moderateScale(11) }}
        offset={50}
        successColor="green"
        normalColor="#606060"
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
      >
        <MainApp />
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
