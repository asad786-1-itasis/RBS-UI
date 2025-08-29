import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { Children, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import Colors from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";
import ClothesCard from "../Components/ClothesCard";
import images from "../utils/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { AccordionList } from "accordion-collapse-react-native";
import CustomText from "../Components/CustomText";
import FilterModal from "../Components/FilterModal";
import ProductCard from "../Components/ProductCard";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";

const products = [
  {
    id: 1,
    image: images.Shirt4, // Replace with actual URL
    heading: "Casual Shirt",
    price: "$29.99",
    rating: 4,
  },
  {
    id: 2,
    image: images.Shirt2, // Replace with actual URL
    heading: "Stylish Jeans",
    price: "$49.99",
    rating: 5,
  },
  {
    id: 3,
    image: images.Shirt3,
    heading: "Graphic T-Shirt",
    price: "$19.99",
    rating: 4,
  },
  {
    id: 4,
    image: images.Shirt4,
    heading: "Cozy Sweater",
    price: "$39.99",
    rating: 5,
  },
  {
    id: 5,
    image: images.Shirt2,
    heading: "Leather Jacket",
    price: "$89.99",
    rating: 4,
  },
  {
    id: 6,
    image: images.Shirt3,
    heading: "Summer Shorts",
    price: "$24.99",
    rating: 3,
  },
  {
    id: 7,
    image: images.Shirt4,
    heading: "Formal Blazer",
    price: "$79.99",
    rating: 4,
  },
  {
    id: 8,
    image: images.Shirt2,
    heading: "Evening Dress",
    price: "$59.99",
    rating: 5,
  },
  {
    id: 9,
    image: images.Shirt3,
    heading: "Comfort Sandals",
    price: "$29.99",
    rating: 3,
  },
];
const SearchedData = () => {
  let navigation = useNavigation();
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
          <View style={styles.containerSearch}>
            <View
              style={[
                CustomStyle.InputWithIconWrapper,
                {
                  flex: 0.97,
                  marginTop: moderateScale(0),
                  borderRadius: moderateScale(50),
                },
              ]}
            >
              <Feather name="search" size={20} color={Colors.white} />
              <TextInput
                placeholderTextColor={"grey"}
                placeholder="Search"
                style={[
                  CustomStyle.InputWithIcon,
                  { paddingLeft: moderateScale(10) },
                ]}
              />
            </View>
            <TouchableOpacity style={[styles.AdvancedSearch, {}]}>
              <Ionicons name="filter-outline" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View
            style={[
              CustomStyle.InputWithIconWrapper,
              { width: "200%", marginLeft: moderateScale(-10) },
            ]}
          >
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "400",
                marginLeft: moderateScale(10),
              }}
            >
              We found 50 products
            </CustomText>
          </View>

          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                image={item.image}
                heading={item.heading}
                price={item.price}
                rating={item.rating}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Set number of columns
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContainer}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchedData;

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
  },
  flatListContainer: {
    marginTop: moderateScale(20),
  },
});
