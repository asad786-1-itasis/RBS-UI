import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../utils/Colors";
import images from "../utils/images";
import CustomText from "../Components/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomStyle from "../utils/CustomStyle";
// import ImageView from "react-native-image-viewing";
import { useNavigation } from "@react-navigation/native";
const { width: screenWidth } = Dimensions.get("window");
import Loader from "../utils/Loader";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { useDispatch, useSelector } from "react-redux";
import BaseUrl from "../API/BaseUrl";
import { HandleCurrencySIgn } from "../utils/CurrencyHandle";
import { useCustomToast } from "../utils/ToastNofticiation";
import { setAddToCartData } from "../Redux/HomeReducer/homeSlice";
import { handleSelectedLanguage } from "../utils/CommonMethod";
import { t, setAppLanguage } from "../Languages/translations";
import ReviewList from "../Components/ReviewList";

const reviewData = [
  {
    userName: "haider ali badsha",
    email: "haiderbadsha@yopmail.com",
    rating: 4,
    message: "very nice product",
    createdDT: "2024-11-19T13:35:24.9298777",
    images: [],
  },
  {
    userName: "haider ali badsha",
    email: "haiderbadsha@yopmail.com",
    rating: 3,
    message: "product review added from mobile",
    createdDT: "2024-11-19T13:20:37.7840603",
    images: [],
  },
  {
    userName: "haider ali badsha",
    email: "haiderbadsha@yopmail.com",
    rating: 5,
    message: "Test test",
    createdDT: "2024-11-19T11:51:27.9590449",
    images: ["bdb73d06-2c08-4099-966d-9043b45e3173.png"],
  },
];
const ProductDetail = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { showToast } = useCustomToast();

  const addToCartData = useSelector((state) => state.home.addToCartData);
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [visibleImage, setIsVisibleImage] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [defaultImage, setDefaultImage] = useState();
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const [imageViewerArray, setImageViewerArray] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const productId = useSelector((state) => state.home.productId);
  const loginData = useSelector((state) => state.auth.loginData);
  // console.log("productId>>>>>>>>>>>>>>>>>>>>.", productId);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  useEffect(() => {
    GetProdcutDetail();
  }, []);

  const GetProdcutDetail = async () => {
    setLoading(true);
    try {
      await GETAPICALL(
        Endpoints.EndpointsGetProductDetails + "?productId=" + productId
      ).then((result) => {
        if (result?.success) {
          setProductData(result?.data?.product);
          setProductVariants(result?.data?.variants);

          // Generate imagesArray from result data directly
          let imagesArray = result?.data?.variants
            ? result.data.variants
                .filter((item) => item?.image) // Filter out null or undefined images
                .map((item, index) => ({
                  id: index + 1,
                  image: BaseUrl.BaseUrlImage + item.image,
                  index: index,
                  productId: item?.productId,
                  color: item?.color,
                  size: item?.size,
                  usdPrice: item?.usdPrice,
                  aedPrice: item?.aedPrice,
                  quantity: item?.quantity,
                  isDefault: item?.isDefault,
                  index: index,
                }))
            : [];

          imagesArray.filter((item, index) => {
            if (item?.isDefault == true) {
              setDefaultImage(item?.image);
              setSelectedProductVariants(item);
              // setSelectedSize(item?.size)
              // setSelectedColor(item)
            }
          });

          // setSelectedProductVariants(imagesArray[0]);
          // Generate imagesViewerArray from result data directly
          let imagesViewerArray = result?.data?.variants
            ? result.data.variants
                .filter((item) => item?.image) // Filter out null or undefined images
                .map((item, index) => ({
                  uri: BaseUrl.BaseUrlImage + item.image,
                }))
            : [];
          // getProdcutColors
          let ProductColors = [];
          result?.data?.variants?.map((item, index) => {
            ProductColors.push({ id: item.id, color: item.color });
          });
          setProductColors(ProductColors);
          setProductImages(imagesArray);
          setImageViewerArray(imagesViewerArray);

          const groupedVariants = groupUniqueVariantsBySize(
            result?.data?.variants
          );
          setProductSize(groupedVariants);
          // console.log("imagesArray>>>>>>>>>>>>>", groupedVariants);
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

  const groupUniqueVariantsBySize = (variants) => {
    const uniqueSizes = new Set(); // Use a Set to ensure unique sizes
    variants.forEach((variant) => {
      uniqueSizes.add(variant.size); // Add the size to the Set
    });
    return Array.from(uniqueSizes).map((size, index) => ({
      id: index + 1,
      size: size,
    }));
  };

  // const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  // const colors = ["#D9D9D9", "#A5A1A1", "#726E6E", "#7B7474", "#585858"];

  // const thumbnailImages = [
  //   { id: 1, image: images.Men },
  //   { id: 2, image: images.Men },
  //   { id: 3, image: images.Men },
  //   // Add more images if needed
  // ];

  const handleSizeSelect = (val) => {
    // console.log("val>>>>>>>>>>size", val);
    setSelectedSize(val);
    let colors = [];
    productVariants.filter((item, index) => {
      if (item.size == val) {
        setDefaultImage(BaseUrl.BaseUrlImage + item?.image);
        setSelectedProductVariants(item);
        colors.push({
          id: item.id,
          productId: item.productId,
          color: item.color,
          aedPrice: item?.aedPrice,
          image: item?.image,
          isDefault: item?.isDefault,
          productId: item?.productId,
          quantity: item?.quantity,
          size: item?.size,
          usdPrice: item?.usdPrice,
        });
      }
    });

    // console.log(colors);
    setProductColors(colors);
    setSelectedColor(null);

    // setSelectedSize(item)
  };
  const handleSelectColor = (val) => {
    // console.log("\n\n\n\n\n\n\\n\n\n\\n\n\nval>>>>>>>>>>size", val);

    if (selectedSize == null) {
      showToast("Please select size");
      return false;
    }
    setDefaultImage(BaseUrl.BaseUrlImage + val?.image),
      setSelectedProductVariants(val),
      setSelectedColor(val);
  };

  const renderThumbnail = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => [
        setImageViewerIndex(item.index),
        setDefaultImage(item?.image),
        setSelectedProductVariants(item),
        // console.log(item),
      ]}
    >
      <Image source={{ uri: item?.image }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <Loader size={"large"} color={Colors.primary} />
      </View>
    );
  }

  const handleAddtoCart = () => {
    // console.log(
    //   "\n\n\n\n\n\n\n\n\n\n",
    //   loginData?.currency == "USD"
    //     ? HandleCurrencySIgn(loginData?.currency) +
    //         selectedProductVariants?.usdPrice
    //     : HandleCurrencySIgn(loginData?.currency) +
    //         selectedProductVariants?.aedPrice
    // );
    // console.log(selectedSize);
    // console.log(selectedColor);
    if (selectedColor.quantity === 0) {
      showToast("Out of stock");
      return false;
    }

    if (selectedSize == null) {
      showToast("Please select size");
      return false;
    }
    if (selectedColor == null) {
      showToast("Please select color");
      return false;
    }

    let addToCartItem = [];
    addToCartItem.push({
      title: productData?.title,
      titleArabic: productData?.titleArabic,
      newQuantity: 0,
      ...selectedColor,
    });

    if (addToCartData != null) {
      // Concatenate new item(s) with existing cart data
      let isAlreadyInList = addToCartData.filter((item) => {
        if (item.id == selectedColor.id) {
          return true;
        } else {
          return false;
        }
      });

      if (isAlreadyInList == false) {
        const data = [...addToCartData, ...addToCartItem];
        // console.log("cart Data >>>>>>>>>>>>>>>>>>>>>>>>", data);
        dispatch(setAddToCartData(data));
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Cart" }],
        // });
        navigation.navigate("Cart");
      } else {
        showToast("Product already in add to cart");
      }
    } else {
      // Initialize cart data with the first item
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Cart" }],
      // });
      navigation.navigate("Cart");
      dispatch(setAddToCartData(addToCartItem));
      // navigation.navigate("Cart");
    }
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: moderateScale(80) },
        ]}
      >
        {/* Header */}
        <View style={{}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.header}
          >
            <Entypo
              name={"chevron-left"}
              size={moderateScale(22)}
              color={Colors.white}
            />
            <CustomText
              style={{ fontSize: moderateScale(16), fontWeight: "600" }}
            >
              {t("product")}
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Main Product Image */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsVisibleImage(true)}
          style={{ position: "relative" }}
        >
          <ImageBackground
            // source={{ uri: BaseUrl.BaseUrlImage + productImages }}
            source={{ uri: defaultImage }}
            style={styles.mainImage}
          >
            <TouchableOpacity style={styles.HeartStyle}>
              <AntDesign name="hearto" size={moderateScale(25)} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <ImageView
          // images={[images.Men]}
          images={imageViewerArray}
          imageIndex={imageViewerIndex}
          visible={visibleImage}
          onRequestClose={() => setIsVisibleImage(false)}
        />

        <View style={{ paddingHorizontal: moderateScale(10) }}>
          {/* Thumbnails */}
          <FlatList
            data={productImages}
            renderItem={renderThumbnail}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          />

          {/* Product Info */}
          <CustomText style={styles.title}>
            {handleSelectedLanguage(selectedLanguage)
              ? productData?.title
              : productData?.titleArabic}
          </CustomText>
          <CustomText style={styles.price}>
            {loginData?.currency == "USD"
              ? HandleCurrencySIgn(loginData?.currency) +
                selectedProductVariants?.usdPrice
              : HandleCurrencySIgn(loginData?.currency) +
                selectedProductVariants?.aedPrice}
          </CustomText>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <Ionicons
                key={index}
                name={index < productData?.rating ? "star" : "star-outline"}
                size={moderateScale(14)}
                color={"#C6924E"} // Set the star color
              />
            ))}
          </View>

          {/* Product Description */}
          <CustomText style={styles.sectionTitle}>
            {t("productDetail")}
          </CustomText>
          <CustomText style={styles.description}>
            {handleSelectedLanguage(selectedLanguage)
              ? productData?.description
              : productData?.descriptionArabic}
            {/* <CustomText style={styles.readMore}> Read More</CustomText> */}
          </CustomText>

          {/* Select Size */}
          <CustomText style={styles.sectionTitle}>{t("selectSize")}</CustomText>
          <View style={styles.sizeContainer}>
            {productSize?.map((item) => (
              <TouchableOpacity
                key={item?.id}
                style={[
                  styles.sizeButton,
                  selectedSize === item?.size && styles.sizeButtonSelected,
                ]}
                onPress={() => handleSizeSelect(item?.size)}
              >
                <CustomText
                  style={[
                    styles.sizeText,
                    selectedSize === item && styles.sizeTextSelected,
                  ]}
                >
                  {item?.size}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Select Color */}
          <CustomText style={styles.sectionTitle}>
            {t("selectColor")}
          </CustomText>
          <View style={styles.colorContainer}>
            {productColors?.map((color) => (
              <TouchableOpacity
                key={color?.id}
                style={[
                  styles.colorButton,
                  { backgroundColor: color?.color },
                  selectedColor?.color === color?.color && [
                    styles.colorButtonSelected,
                    { backgroundColor: color?.color },
                  ],
                ]}
                onPress={() => handleSelectColor(color)}
              >
                <CustomText
                  style={[
                    styles.colorText,
                    selectedColor?.color === color && styles.colorTextSelected,
                  ]}
                >
                  {/* {color} */}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View>
              <CustomText style={styles.totalPrice}>
                {t("totalPrice")}
              </CustomText>
              <CustomText style={styles.price}>
                {loginData?.currency == "USD"
                  ? HandleCurrencySIgn(loginData?.currency) +
                    selectedProductVariants?.usdPrice
                  : HandleCurrencySIgn(loginData?.currency) +
                    selectedProductVariants?.aedPrice}
              </CustomText>
            </View>
            <TouchableOpacity
              onPress={() => handleAddtoCart()}
              style={[styles.addButton]}
            >
              <CustomText style={styles.addButtonText}>
                {t("addToCart")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <ReviewList data={reviewData} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    // padding: moderateScale(10),
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginVertical: moderateScale(10),
  },
  mainImage: {
    width: "100%",
    height: verticalScale(350),
    borderRadius: moderateScale(10),
  },
  thumbnailContainer: {
    marginVertical: moderateScale(10),
    justifyContent: "center",
  },
  thumbnail: {
    width: scale(70),
    height: verticalScale(70),
    borderRadius: moderateScale(5),
    marginHorizontal: scale(5),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginVertical: moderateScale(5),
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: moderateScale(5),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginVertical: moderateScale(10),
  },
  description: {
    fontSize: moderateScale(13),
  },
  readMore: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  sizeContainer: {
    flexDirection: "row",
    marginVertical: moderateScale(5),
  },
  sizeButton: {
    backgroundColor: Colors.textInputClr,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: moderateScale(5),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    marginRight: moderateScale(8),
    paddingHorizontal: moderateScale(14),
  },
  sizeButtonSelected: {
    backgroundColor: Colors.primary,
    paddingHorizontal: moderateScale(14),
  },
  sizeText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  sizeTextSelected: {},
  colorContainer: {
    flexDirection: "row",
    marginVertical: moderateScale(5),
  },
  colorButton: {
    backgroundColor: "red",
    borderRadius: moderateScale(50),
    width: moderateScale(35),
    height: moderateScale(35),
    marginRight: moderateScale(8),
  },
  colorButtonSelected: {
    borderWidth: 5,
    borderColor: "#C6924E",
  },
  colorText: {
    fontSize: moderateScale(14),
  },
  colorTextSelected: {
    // color: 'black',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(15),
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(20),
    backgroundColor: Colors.textInputClr,
  },
  totalPrice: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(25),
    borderRadius: moderateScale(50),
  },
  addButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  HeartStyle: {
    position: "absolute",
    top: 5,
    right: 10,
    // bottom: 0,
    width: "15%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
});
