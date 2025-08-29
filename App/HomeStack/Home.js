import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
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
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import HomeBanner from "../Components/HomeBanner";
import CategoryComponent from "../Components/CategoryComponent";
import ProductCard from "../Components/ProductCard";
import ProductCardHome from "../Components/ProductCardHome";
import NewArrival from "../Components/NewArrival";
import * as Animatable from "react-native-animatable";
import Loader from "../utils/Loader";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { useSelector } from "react-redux";
import { useCustomToast } from "../utils/ToastNofticiation";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { t, setAppLanguage } from "../Languages/translations";


const products = [
  {
    id: 1,
    image: images.Shirt4, // Replace with actual URL
    heading: "Casual Shirt Get up to 30% Off New Arrivals",
    price: "$29.99",
    rating: 4,
  },
  {
    id: 2,
    image: images.Shirt2, // Replace with actual URL
    heading: "Stylish Jeans Get up to 10% Off New Arrivals",
    price: "$49.99",
    rating: 5,
  },
  {
    id: 3,
    image: images.Shirt3,
    heading: "Graphic T-Shirt Get up to 50% Off New Arrivals",
    price: "$19.99",
    rating: 4,
  },
  {
    id: 4,
    image: images.Shirt4,
    heading: "Cozy Sweater Get up to 20% Off New Arrivals",
    price: "$39.99",
  },
];

const Home = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();

  const [loading, setLoading] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const loginData = useSelector((state) => state.auth.loginData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const handleToggleLoader = () => {
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    GetHomeScreenData();
  }, []);

  const GetHomeScreenData = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsHomeScreen + "?userId=" + loginData?.id
      ).then((result) => {
        // console.log("Response handleLogin >>>>>>>>>>>>", result?.success);
        if (result?.success == true) {
          setNewArrivals(result?.data?.newArrivals);
          setSubcategories(result?.data?.subcategories);
          setTopProducts(result?.data?.topProducts);
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

  const AddToWishList = (id, wishlistState) => {
    // setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsAddToWishList +
          "?productId=" +
          id +
          "&userId=" +
          loginData?.id
      ).then((result) => {
        console.log("AddToWishList>>>>>>>>", result);
        if (result?.success == true) {
          wishlistState(true);
          showToast("Add to wishlist");
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
  const RemoveToWishList = (id, wishlistState) => {
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
          wishlistState(false);
          showToast("Remove from wishlist");
          setLoading(false);
        } else {
          if (result?.message == "Failed Process") {
            wishlistState(false);
          } else {
            showToast(result?.message);
          }
          setLoading(false);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
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

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(80),
          }}
        >
          <Animatable.View animation={"fadeIn"} duration={500} delay={200}>
            <View style={styles.containerSearch}>
              <View>
                <CustomText style={{ fontSize: moderateScale(12) }}>
                  {t("helloWelcome")} 👋
                </CustomText>
                <CustomText
                  style={{ fontSize: moderateScale(16), fontWeight: "600" }}
                >
                  {loginData?.firstName}
                </CustomText>
              </View>

              <TouchableOpacity
                onPress={handleToggleLoader}
                style={[styles.AdvancedSearch, {}]}
              >
                <Image
                  source={images.Men}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <View style={{ paddingTop: moderateScale(30) }}>
            {/* Boday start here */}
            <HomeBanner data={products} />
          </View>
          {/* Category */}
          {/* <View style={{}}>
            <CategoryComponent />
          </View> */}

          {/* Category */}
          <Animatable.View animation={"fadeInRight"} duration={500} delay={200}>
            <View style={{ paddingTop: moderateScale(0) }}>
              <View style={styles.SubHeader}>
                <CustomText
                  style={{ fontSize: moderateScale(14), fontWeight: "600" }}
                >
                  {t("allCollection")}
                </CustomText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SeeAllProducts")}
                  style={styles.centerContainer}
                >
                  <CustomText
                    style={{ fontSize: moderateScale(14), fontWeight: "600" }}
                  >
                    {t("seeAll")}
                  </CustomText>
                  <Entypo
                    name={"chevron-right"}
                    size={moderateScale(20)}
                    color={Colors.white} // Star color
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={subcategories}
                horizontal={true}
                renderItem={({ item }) => (
                  <ProductCardHome
                    image={item.image}
                    heading={item.name}
                    price={item.price}
                    item={item}
                    headingArabic={item.nameArabic}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </Animatable.View>
          {/* New Arrivals */}
          <View style={{ paddingTop: moderateScale(15) }}>
            <View style={styles.SubHeader}>
              <CustomText
                style={{ fontSize: moderateScale(14), fontWeight: "600" }}
              >
                {t("newArrival")}
              </CustomText>
              <TouchableOpacity
                onPress={() => navigation.navigate("SeeAllProducts")}
                style={styles.centerContainer}
              >
                <CustomText
                  style={{ fontSize: moderateScale(14), fontWeight: "600" }}
                >
                  {t("seeAll")}
                </CustomText>
                <Entypo
                  name={"chevron-right"}
                  size={moderateScale(20)}
                  color={Colors.white} // Star color
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={newArrivals}
              renderItem={({ item }) => (
                <NewArrival
                  image={item?.defaultImage}
                  heading={item?.title}
                  headingArabic={item?.titleArabic}
                  price={
                    HandleCurrencySIgn(loginData?.currency) == "$"
                      ? item?.usdPrice
                      : item?.aedPrice
                  }
                  category={item?.category}
                  subHeading={item.category}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          {/* All Products */}
          <View style={{ paddingTop: moderateScale(15) }}>
            <View style={styles.SubHeader}>
              <CustomText
                style={{ fontSize: moderateScale(14), fontWeight: "600" }}
              >
                {t("allProducts")}
              </CustomText>
              <TouchableOpacity
                onPress={() => navigation.navigate("SeeAllProducts")}
                style={styles.centerContainer}
              >
                <CustomText
                  style={{ fontSize: moderateScale(14), fontWeight: "600" }}
                >
                  {t("seeAll")}
                </CustomText>
                <Entypo
                  name={"chevron-right"}
                  size={moderateScale(20)}
                  color={Colors.white} // Star color
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={topProducts}
              //   horizontal={true}
              renderItem={({ item }) => (
                <ProductCard
                  image={item?.defaultImage}
                  heading={item?.title}
                  headingArabic={item?.titleArabic}
                  price={
                    HandleCurrencySIgn(loginData?.currency) == "$"
                      ? item?.usdPrice
                      : item?.aedPrice
                  }
                  rating={item?.rating}
                  navigation={navigation}
                  isInWishList={item?.isInWishList}
                  item={item}
                  onHeartPress={AddToWishList}
                  onRemoveWishListPress={RemoveToWishList}
                />
              )}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  AdvancedSearch: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: Colors.textInputClr,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  containerSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS == "android" && moderateScale(20),
  },
  body: {
    padding: moderateScale(15),
    backgroundColor: "#fff",
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(5),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  bodyText: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "black", // Changed to black for better visibility
  },
  childItem: {
    fontSize: moderateScale(14),
    marginVertical: moderateScale(5),
    color: "black", // Changed to black for better visibility
  },
  ChildWrapper: {
    backgroundColor: "black",
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(8),
  },
  ChildContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBlockEndColor: Colors.BtnClr,
    paddingVertical: 8,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  SubHeader: {
    paddingBottom: moderateScale(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingRight: 1,
  },
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
});
