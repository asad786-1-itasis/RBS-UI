import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CustomStyle from "../utils/CustomStyle";
import Colors from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";
import Entypo from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomText from "../Components/CustomText";
import WishListProduct from "../Components/WishListProduct";
import CustomStatusBar from "../utils/CustomStatusBar";
import * as Animatable from "react-native-animatable";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import images from "../utils/images";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import BaseUrl from "../API/BaseUrl";
import { useCustomToast } from "../utils/ToastNofticiation";
import { useSelector } from "react-redux";
import Loader from "../utils/Loader";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { t, setAppLanguage } from "../Languages/translations";

const WishList = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);

  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const loginData = useSelector((state) => state.auth.loginData);
  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const handleRemove = (id) => {
    console.log(`Remove item with id: ${id}`);
    // setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsRemoveFromWishList +
          "?productId=" +
          id +
          "&userId=" +
          loginData?.id
      ).then((result) => {
        console.log("RemoveToWishList>>>>>>>>", result);
        if (result?.success == true) {
          // showToast("Remove from wishlist");
          setWishlistData([]);
          GetUserWishList();
          setLoading(false);
        } else {
          showToast(result?.message);
          setLoading(false);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const [shouldAnimate, setShouldAnimate] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setShouldAnimate(true); // Set to true when screen is focused
      GetUserWishList();
      // Reset shouldAnimate when screen is unfocused
      return () => {
        setShouldAnimate(false);
      };
    }, [])
  );

  const GetUserWishList = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsGetUserWishList + "?userId=" + loginData?.id
      ).then((result) => {
        console.log("Response GetUserWishList >>>>>>>>>>>>", result?.data);
        if (result?.success == true) {
          setWishlistData(result?.data);
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

  const handleEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText style={{ fontSize: moderateScale(16), fontWeight: "500" }}>
          No record found
        </CustomText>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <CustomStatusBar />
        <Loader size={"large"} color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />

      <View style={styles.HeaderWrapper}>
        <Entypo
          name={"chevron-left"}
          size={moderateScale(25)}
          color={Colors.white}
        />
        <CustomText
          style={{
            fontSize: moderateScale(18),
            fontWeight: "500",
            paddingLeft: 10,
          }}
        >
          {t("wishList")}
        </CustomText>
      </View>

      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(80),
          }}
        >
          <Animatable.View
            animation={shouldAnimate ? "fadeInUp" : undefined}
            duration={500}
          >
            {wishlistData.length > 0 && (
              <CustomText
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: "600",
                }}
              >
                {wishlistData.length} items
              </CustomText>
            )}
            <FlatList
              data={wishlistData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation={shouldAnimate ? "fadeInUp" : undefined} // Animate only if shouldAnimate is true
                  duration={600}
                  delay={index * 100}
                >
                  <WishListProduct
                    image={BaseUrl.BaseUrlImage + item.defaultImage}
                    heading={item.title}
                    headingArabic={item.titleArabic}
                    price={
                      HandleCurrencySIgn(loginData?.currency) == "$"
                        ? item?.usdPrice
                        : item?.aedPrice
                    }
                    rating={item.rating}
                    item={item}
                    onRemove={() => handleRemove(item.id)}
                  />
                </Animatable.View>
              )}
              ListEmptyComponent={handleEmpty}
            />
          </Animatable.View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  HeaderWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: moderateScale(15),
  },
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
});
