import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import images from "../utils/images";
import Colors from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
// import * as Animatable from "react-native-animatable";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSelectedLanguage } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";
import { useDispatch } from "react-redux";
const Splash = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  useEffect(() => {
    getLangData().then((result) => {
      console.log("getLangData>>>>>>>>>>>>", result);
      if (result == null) {
        setAppLanguage("en");
        dispatch(setSelectedLanguage("USD"));
      } else {
        dispatch(setSelectedLanguage(result));
        setAppLanguage(result == "AR" ? "ar" : "en");
      }
    });
  }, []);

  const getLangData = async () => {
    try {
      return await AsyncStorage.getItem("lang");
    } catch (e) {
      // read error
    }

    console.log("Done.");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000); // 3 seconds timer

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar />
      <View style={styles.BackImageWrapper}>
        <View style={styles.ChildBackImageWrapper}>
          <Animatable.View animation={"zoomIn"} duration={500}>
            <ImageBackground
              source={images.MainLogo}
              resizeMode="cover"
              style={styles.ImgStyle}
            />
          </Animatable.View>
        </View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  BackImageWrapper: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  ChildBackImageWrapper: {
    width: moderateScale(251),
    height: moderateScale(242),
  },
  ImgStyle: { width: "100%", height: "100%" },
});
