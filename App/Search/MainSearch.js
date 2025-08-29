import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Children, useState, useRef, useEffect } from "react";
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
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import Endpoints from "../API/Endpoints";
import { GETAPICALL } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
import { setSubcategoryId } from "../Redux/HomeReducer/homeSlice";
import { handleSelectedLanguage } from "../utils/CommonMethod";


const MainSearch = () => {
  let navigation = useNavigation();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  let dispatch = useDispatch();
  let { showToast } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    GetCategriesItemCounts();
    GetFilters();
  }, []);

  const GetCategriesItemCounts = async () => {
    setLoading(true);
    try {
      await GETAPICALL(Endpoints.EndpointsGetCategriesItemCounts).then(
        (result) => {
          if (result?.success == true) {
            const updatedData = result?.data.map((category, index) => ({
              id: index + 1, // Setting a unique ID based on index
              ...category,
            }));
            setList(updatedData);
            setLoading(false);
          } else {
            showToast(result?.message);
            setLoading(false);
          }
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };
  const GetFilters = async () => {
    setLoading(true);
    try {
      await GETAPICALL(Endpoints.EndpointsGetFilters).then((result) => {
        if (result?.success == true) {
          setFilterList(result?.data);
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

  const [modalVisibleFilter, setModalVisibleFilter] = useState(false);

  const filters = [
    { id: 1, label: "Jeans (18)" },
    { id: 2, label: "Shirts (30)" },
    { id: 3, label: "T-Shirts (25)" },
    { id: 4, label: "Sweaters (15)" },
    { id: 5, label: "Jackets (10)" },
    { id: 6, label: "Coats (12)" },
    { id: 7, label: "Dresses (22)" },
    { id: 8, label: "Skirts (14)" },
    { id: 9, label: "Shorts (20)" },
    { id: 10, label: "Suits (8)" },
    { id: 11, label: "Activewear (16)" },
    { id: 12, label: "Swimwear (10)" },
    { id: 13, label: "Pajamas (7)" },
    { id: 14, label: "Accessories (25)" },
    { id: 15, label: "Bags (15)" },
    { id: 16, label: "Shoes (40)" },
    { id: 17, label: "Sandals (18)" },
    { id: 18, label: "Boots (12)" },
    { id: 19, label: "Hats (9)" },
    { id: 20, label: "Scarves (11)" },
    { id: 21, label: "Gloves (6)" },
    { id: 22, label: "Belts (20)" },
    { id: 23, label: "Socks (25)" },
    { id: 24, label: "Jewelry (35)" },
    { id: 25, label: "Watches (15)" },
    { id: 26, label: "Sunglasses (20)" },
    { id: 27, label: "Makeup (30)" },
    { id: 28, label: "Skincare (28)" },
    { id: 29, label: "Perfumes (12)" },
    { id: 30, label: "Underwear (22)" },
    { id: 31, label: "Loungewear (14)" },
    { id: 32, label: "Ethnic Wear (8)" },
    { id: 33, label: "Plus Size Clothing (20)" },
    { id: 34, label: "Maternity Wear (10)" },
    { id: 35, label: "Formal Wear (11)" },
    { id: 36, label: "Children’s Clothing (30)" },
    { id: 37, label: "Baby Clothing (25)" },
    { id: 38, label: "Costumes (5)" },
    { id: 39, label: "Sports Gear (15)" },
    { id: 40, label: "Sleepwear (12)" },
  ];

  const Header = (item, expanded) => {
    return <ClothesCard data={item} key={item.key} />;
  };

  // Body function for the AccordionList
  const CardBoday = (item, index) => {
    // console.log("item>>>>>>>>>>>>", item);
    const handleNav = (id) => {
      console.log("==============================", id);
      dispatch(setSubcategoryId(id));
      // navigation.navigate("SearchedData");
      navigation.navigate("SeeAllProducts");
    };
    return (
      <Animatable.View
        animation={"fadeInUp"}
        duration={500}
        delay={index * 10}
      >
        <View style={styles.ChildWrapper}>
          {item?.subcategories.map((childItem, index) => (
            <TouchableOpacity
              onPress={() => handleNav(childItem.id)}
              style={styles.ChildContainer}
            >
              <CustomText
                key={index}
                style={{
                  fontSize: moderateScale(18),
                }}
              >
                {handleSelectedLanguage(selectedLanguage)? childItem?.name:childItem?.nameArabic}
              </CustomText>
              <CustomText
                key={index}
                style={{
                  fontSize: moderateScale(18),
                }}
              >
                {childItem?.itemCounts}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </Animatable.View>
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
            <TouchableOpacity
              onPress={() => setModalVisibleFilter(true)}
              style={[styles.AdvancedSearch, {}]}
            >
              <Ionicons name="filter-outline" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: moderateScale(20) }}>
            <AccordionList
              list={list}
              header={Header}
              body={CardBoday}
              keyExtractor={(item) => item.id}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <FilterModal
        visible={modalVisibleFilter}
        onClose={() => setModalVisibleFilter(false)}
        filters={filterList}
      />
    </SafeAreaView>
  );
};

export default MainSearch;

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
  loadingStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
});
