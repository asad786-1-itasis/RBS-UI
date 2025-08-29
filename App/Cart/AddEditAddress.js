import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useCustomToast } from "../utils/ToastNofticiation";
// import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import Loader from "../utils/Loader";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import Endpoints from "../API/Endpoints";
import CustomStatusBar from "../utils/CustomStatusBar";
import images from "../utils/images";
import CustomText from "../Components/CustomText";
import CustomStyle from "../utils/CustomStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { setAddressUserData } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";

const AddEditAddress = () => {
  let navigation = useNavigation();

  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  let { showToast } = useCustomToast();
  let dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const loginData = useSelector((state) => state.auth.loginData);
  const addressUserData = useSelector((state) => state.home.addressUserData);
  const [errorMessage, setErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("US"); // Default to United States
  const [countryData, setCountryData] = useState();
  const handleSelectCountry = (country) => {
    console.log("country>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", country);
    setCountryCode(country.cca2);
    setCountryData(country);
  };

  const handleShowPass = () => {
    setShowPassword((prev) => setShowPassword(!prev));
  };
  const handleShowPassConfirm = () => {
    setShowPasswordConfirm((prev) => setShowPasswordConfirm(!prev));
  };
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage(""); // Clear error if they match
    }
  };

  const validateFields = () => {
    if (
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !phoneNo ||
      !addressTitle
    ) {
      showToast("Please enter all credentials");
      return false;
    }

    return true;
  };
  const handleSaveAddress = async () => {
    if (validateFields()) {
      try {
        setLoading(true);
        let formData = new FormData();
        if (addressUserData?.id != null) {
          formData.append("id", addressUserData?.id);
        }
        formData.append("CustomerId", loginData?.id);
        formData.append("Address", address);
        formData.append("City", city);
        formData.append("State", state);
        formData.append("PostalCode", postalCode);
        formData.append("PhoneNo", phoneNo);
        formData.append("Title", addressTitle);
        console.log("formData Login >>>>>>>>", formData);
        POSTAPICALLFORMDATA(
          Endpoints.EndpointsAddEditAddresss,
          formData,
          false
        ).then((result) => {
          console.log("Response handleSaveAddress >>>>>>>>>>>>", result);
          if (result?.success == true) {
            // showToast('Login Successfull');
            dispatch(setAddressUserData({}));
            setLoading(false);
            setAddress("");
            setCity("");
            setState("");
            setPostalCode("");
            setPhoneNo("");
            setAddressTitle("");

            navigation.goBack();
            // dispatch(setLogin(true));
          } else {
            showToast(result?.message);
            setLoading(false);
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (addressUserData?.id != 0) {
      handleAddValue(addressUserData);
    } else {
      dispatch(setAddressUserData({}));
    }
  }, [addressUserData]);
  const handleAddValue = (val) => {
    console.log(
      "handleAddValue====================================",
      addressUserData
    );
    setAddress(val?.address);
    setCity(val?.city);
    setState(val?.state);
    setPostalCode(val?.postalCode);
    setPhoneNo(val?.phoneNo);
    setAddressTitle(val.title);
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[[styles.headerContainer, { flexDirection: "row" }]]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.headerContainer,
              { marginBottom: moderateScale(15), flexDirection: "row" },
            ]}
          >
            <Entypo
              name={"chevron-left"}
              size={moderateScale(25)}
              color={Colors.white} // Star color
            />
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: "600",
                paddingLeft: 10,
              }}
            >
              {addressUserData?.id != null
                ? t("editShippingAddress")
                : t("addShippingAddress")}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={[
            CustomStyle.BodyStyle,
            { paddingHorizontal: moderateScale(15) },
          ]}
        >
          <Animatable.View animation={"fadeInRight"} duration={500}>
            <View style={styles.inputWrapper}>
              <CustomText style={{ fontSize: moderateScale(16) }}>
                {t("address")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginBottom: 10,
                    height: moderateScale(100),
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterAddress")}
                value={address}
                onChangeText={setAddress}
                multiline={true}
                textAlignVertical="top"
              />
              <CustomText style={{ fontSize: moderateScale(16) }}>
                {t("city")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginTop: 0,
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterCity")}
                value={city}
                onChangeText={setCity}
              />
              <CustomText
                style={{ fontSize: moderateScale(16), marginTop: 10 }}
              >
                {t("stateRegion")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginTop: 0,
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterStateRegion")}
                value={state}
                onChangeText={setState}
              />

              <CustomText
                style={{ fontSize: moderateScale(16), marginTop: 10 }}
              >
                {t("postalCode")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginTop: 0,
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterPostalCode")}
                value={postalCode}
                onChangeText={setPostalCode}
              />
              <CustomText
                style={{ fontSize: moderateScale(16), marginTop: 10 }}
              >
                {t("phoneNo")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginTop: 0,
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterPhoneNo")}
                value={phoneNo}
                onChangeText={setPhoneNo}
              />

              <CustomText
                style={{ fontSize: moderateScale(16), marginTop: 10 }}
              >
                {t("addressTitle")}
                <Text style={CustomStyle.red}>*</Text>
              </CustomText>
              <TextInput
                style={[
                  CustomStyle.input,
                  {
                    marginTop: 0,
                    textAlign: selectedLanguage == "AR" ? "right" : "left",
                  },
                ]}
                placeholderTextColor={"grey"}
                placeholder={t("enterAddressTitle")}
                value={addressTitle}
                onChangeText={setAddressTitle}
              />

              <TouchableOpacity
                onPress={handleSaveAddress}
                disabled={loading ? true : false}
                style={[
                  CustomStyle.FullButton,
                  { marginTop: moderateScale(60) },
                ]}
              >
                {loading ? (
                  <Loader size={25} color={Colors.white} />
                ) : (
                  <CustomText style={styles.signuptxt}>{t("save")}</CustomText>
                )}
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddEditAddress;

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: moderateScale(15),
  },
  imageStyle: { width: moderateScale(155), height: moderateScale(144.5) },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signuptxt: {
    fontSize: moderateScale(18),
    paddingVertical: moderateScale(10),
    fontWeight: "600",
  },
});
