import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
// import Carousel, { Pagination } from "react-native-snap-carousel";
import Colors from "../utils/Colors";
import CustomText from "./CustomText";
import CustomStyle from "../utils/CustomStyle";

const { width: screenWidth } = Dimensions.get("window");
const HomeBanner = (props) => {
  const [useScroll, setUseScroll] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  let dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);

  const addLineBreaks = (text, maxChars) => {
    if (!text || typeof text !== "string") return text;

    // Split the text into chunks of `maxChars`
    const regex = new RegExp(`.{1,${maxChars}}`, "g");
    return text.match(regex)?.join("\n") || text;
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <View activeOpacity={0.1} style={[styles.item]}>
          <Image
            source={item.image}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
          {/* Overlay to add opacity */}
          <View style={styles.imageOverlay} />
          <View style={styles.textContainer}>
            <CustomText style={styles.itemText}>
              {addLineBreaks(item.heading, 26)}
            </CustomText>
            <TouchableOpacity
              style={[
                CustomStyle.FullButton,
                {
                  alignSelf: "flex-start",
                  paddingHorizontal: moderateScale(20),
                  paddingVertical: moderateScale(8),
                },
              ]}
            >
              <CustomText
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: "600",
                  color: "white", // Ensures the text is visible on the image
                }}
              >
                Explore
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const handleNavigation = (val) => {
    dispatch(setWhereFrom(22));
    dispatch(setEventId(val));
    props.navigation.navigate("TicketDetail");
  };

  return (
    <View style={styles.SliderContainer}>
      <Carousel
        data={props?.data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={"default"}
        useScrollView={true}
        autoplay={true}
        autoplayDelay={5000}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.13}
        horizontal={true}
        loop={true}
        onSnapToItem={(index) => setActiveSlide(index)} // Updates the active slide index
      />

      {/* Pagination dots */}
      <Pagination
        dotsLength={props?.data.length} // Number of dots should match the number of carousel items
        activeDotIndex={activeSlide}
        dotStyle={styles.PaginatioStyle}
        inactiveDotStyle={{
          backgroundColor: Colors.textInputClr,
          //   opacity: 1.4,
        }}
        inactiveDotOpacity={1.4} // Extra opacity setting for inactive dots
        inactiveDotScale={0.9} // Slightly reduce the size of inactive dots
      />
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  SliderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: moderateScale(15),
    bottom: moderateScale(10), // Fill the entire container
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    zIndex: 100, // Make sure text is above the image
  },
  item: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
    height: moderateScale(200),
  },
  itemText: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "white",
    flexWrap: "wrap",
    textAlign: "left",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire image
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    borderRadius: 10,
  },
  itemTextBook: {},
  PaginatioStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: moderateScale(-10),
    backgroundColor: Colors.primary,
    marginTop: moderateScale(-9),
  },
});
