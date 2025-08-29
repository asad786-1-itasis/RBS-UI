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
import PopupMenu from "../utils/PopupMenu";
import Loader from "../utils/Loader";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { useDispatch, useSelector } from "react-redux";
import { useCustomToast } from "../utils/ToastNofticiation";
import { setSubcategoryId } from "../Redux/HomeReducer/homeSlice";
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
    rating: 4,
  },
];

const SeeAllProducts = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("USDPrice");
  const [alldata, setAllData] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const loginData = useSelector((state) => state.auth.loginData);
  const subcategoryId = useSelector((state) => state.home.subcategoryId);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  console.log(
    "\n\n\n\n\n\n\n\\n\n\n================================================",
    subcategoryId
  );
  const showMenu = (event) => {
    // console.log('event>>>>>>>',event.nativeEvent)
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

  useEffect(() => {
    GetAllProductsBySubcategory();
    // return () => {
    //   dispatch(setSubcategoryId(0));
    // };
  }, [subcategoryId, orderDirection, orderBy]);

  const GetAllProductsBySubcategory = () => {
    setLoading(true);
    try {
      GETAPICALL(
        Endpoints.EndpointsGetAllProductsBySubcategory +
          "?subcategoryId=" +
          subcategoryId +
          "&orderBy=" +
          orderBy +
          "&orderDirection=" +
          orderDirection +
          "&userId=" +
          loginData?.id
      ).then((result) => {
        // console.log(
        //   "Response handleLogin >>>>>>>>>>>>",
        //   Endpoints.EndpointsGetAllProductsBySubcategory +
        //     "?subcategoryId=" +
        //     subcategoryId +
        //     "&orderBy=" +
        //     orderBy +
        //     "&orderDirection=" +
        //     orderDirection +
        //     "&userId=" +
        //     loginData?.id
        // );
        if (result?.success == true) {
          setAllData(result?.data);
          setLoading(false);
        } else {
          // showToast(result?.message);
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

  const handleFilter = (val) => {
    // console.log("handleFilter>>>>>>>>>>>>>>>>>>>>>>>>>>>", val);
    if (val == "PRICE ASC") {
      setOrderBy(loginData?.currency == "AED" ? "AEDPrice" : "USDPrice");
      setOrderDirection("asc");
    }
    if (val == "PRICE DESC") {
      setOrderBy(loginData?.currency == "AED" ? "AEDPrice" : "USDPrice");
      setOrderDirection("desc");
    }
    // Date wise
    if (val == "DATE ASC") {
      setOrderBy("CreatedDT");
      setOrderDirection("asc");
    }
    if (val == "DATE DESC") {
      setOrderBy("CreatedDT");
      setOrderDirection("desc");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <Loader size={"large"} color={Colors.primary} />
      </View>
    );
  }

  const handleEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomText style={{ fontSize: moderateScale(16), fontWeight: "500" }}>
          {t("noRecordFound")}
        </CustomText>
      </View>
    );
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.HeaderStyle}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.containerSearch}
            >
              <Entypo
                name={"chevron-left"}
                size={moderateScale(20)}
                color={Colors.white}
              />
              <CustomText
                style={{ fontSize: moderateScale(14), fontWeight: "600" }}
              >
                {t("product")}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              //   onPress={() => setMenuVisible(true)}
              onPress={showMenu}
              style={styles.centerContainer}
            >
              <Entypo
                name={"menu"}
                size={moderateScale(25)}
                color={Colors.white}
              />
              <PopupMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                position={menuPosition}
                MyorderDirection={handleFilter}
              />
            </TouchableOpacity>
          </View>

          {/* Category */}
          <View style={{ paddingTop: moderateScale(15) }}>
            <FlatList
              data={alldata}
              //   horizontal={true}
              renderItem={({ item }) => (
                <ProductCard
                  image={item.defaultImage}
                  heading={item.title}
                  headingArabic={item.titleArabic}
                  price={
                    HandleCurrencySIgn(loginData?.currency) == "$"
                      ? item?.usdPrice
                      : item?.aedPrice
                  }
                  rating={item.rating}
                  navigation={navigation}
                  item={item}
                  isInWishList={item?.isInWishList}
                  onHeartPress={AddToWishList}
                  onRemoveWishListPress={RemoveToWishList}
                />
              )}
              numColumns={2}
              ListEmptyComponent={handleEmpty}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SeeAllProducts;

const styles = StyleSheet.create({
  AdvancedSearch: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: Colors.textInputClr,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  HeaderStyle: {
    paddingBottom: moderateScale(5),
    flexDirection: "row",
    justifyContent: "space-between",
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
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
});
