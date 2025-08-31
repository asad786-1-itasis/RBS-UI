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
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import images from "../utils/images";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLoginData } from "../Redux/AuthReducer/authSlice";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
// import Endpoints from "../API/Endpoints";
// import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSelectedLanguage } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";
import DropDownPicker from "react-native-dropdown-picker";
// import FastImage from 'react-native-fast-image'

const AppSetting = () => {
    let navigation = useNavigation();
    let dispatch = useDispatch();
    let { showToast } = useCustomToast();
    const [loading, setLoading] = useState(false);
    const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

    useEffect(() => {
        if (selectedLanguage == "fr") {
            setAppLanguage("fr");
        } else {
            setAppLanguage("en");
        }
    }, [selectedLanguage]);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
        // { label: "Espanol", value: "es" },
        // { label: "Deutsch", value: "de" },

    ]);

    const handlelanguageChange = async (lang) => {
        // alert(lang)
        setAppLanguage(lang);
        dispatch(setSelectedLanguage(lang));
        console.log("value>>>>>>>", value);
        try {
            await AsyncStorage.setItem("lang", value);
        } catch (e) {
            console.log("storeLangData>>>>>", e);
        }
    }

    useEffect(() => {
        getLangData().then((result) => {
            console.log("getLangData>>>>>>>>>>>>", result);
            if (result == null) {
                setAppLanguage("en");
                setValue('en')
            } else {
                dispatch(setSelectedLanguage(result));
                setAppLanguage(result == "fr" ? "fr" : "en");
                setValue(result)
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

    return (
        <SafeAreaView style={[CustomStyle.SafeAreaStyle, {}]}>
            <CustomStatusBar />
            <KeyboardAwareScrollView
                style={{ flex: 1, backgroundColor: Colors.background, }}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.background }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                <View style={[CustomStyle.BodyStyle, { justifyContent: 'center' }]}>
                    <View style={styles.cardView}>
                        <Animatable.View animation={"fadeInRight"} duration={500}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: moderateScale(20),
                            }}>
                                <CustomText
                                    style={[styles.LogoTxt, { textAlign: selectedLanguage == "AR" ? "right" : "left", }]}
                                >
                                    {t("welcomeToRBS")}
                                </CustomText>
                                <CustomText
                                    style={[styles.txt, {}]}
                                >
                                    {t("selectLanguage")}
                                </CustomText>

                            </View>
                        </Animatable.View>
                        <View style={styles.inputWrapper}>
                            <Animatable.View animation={"fadeInRight"} duration={500}>

                                <View style={[styles.container]}>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        placeholder="Select Language"
                                        style={styles.dropdown}
                                        dropDownContainerStyle={styles.dropdownContainer}
                                        listMode="SCROLLVIEW"
                                        zIndex={3000}
                                        zIndexInverse={1000}
                                        onChangeValue={(e) => {
                                            handlelanguageChange(e)
                                        }}
                                        scrollViewProps={{
                                            nestedScrollEnabled: true,
                                            persistentScrollbar: true,
                                        }}
                                        textStyle={{
                                            fontSize: moderateScale(14),
                                            allowFontScaling: false, // 👈 yaha add karo
                                        }}

                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Login")}
                                    style={[CustomStyle.FullButton, { marginTop: moderateScale(30) }]}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (
                                        <Loader size={25} color={Colors.BtnClr} />
                                    ) : (
                                        <CustomText style={styles.loginTxt}>{t("login")}</CustomText>
                                    )}
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: "flex-end", zIndex: -100 }}>
                            <View style={styles.textContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SignUp')}
                                    style={styles.signUpButton}
                                >
                                    <CustomText
                                        style={{
                                            fontSize: moderateScale(14),
                                            paddingVertical: moderateScale(10),
                                            fontWeight: "700",
                                            color: Colors.BtnClr,
                                            paddingLeft: 5,
                                        }}
                                    >
                                        {t("signUp")}
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default AppSetting;

const styles = StyleSheet.create({
    imageStyle: { width: moderateScale(155), height: moderateScale(144.5) },
    inputWrapper: {
        flex: 1,
        // backgroundColor: Colors.white,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginTxt: {
        fontSize: moderateScale(18),
        paddingVertical: moderateScale(10),
        fontWeight: "600",
        color: Colors.white,
        fontWeight: '500'
    },

    cardView: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(10),
        // overflow: "hidden",
        padding: moderateScale(20),
        // 🌟 Shadow for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        // 🌟 Shadow for Android
        elevation: 6,
    },
    LogoTxt: {
        fontSize: moderateScale(18),

        color: '#6f60bf',
        fontWeight: 'bold'
    },
    txt: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: moderateScale(10),
        paddingTop: moderateScale(10)
    },
    container: {
        // flex: 1,
        marginTop: moderateScale(10),
        zIndex: 3000,        // 👈 yahan rakho
        elevation: 3000,     // 👈 Android ke liye
        // borderWidth: 5
    },
    dropdown: {
        borderColor: "#ccc",
        borderRadius: 10,
    },
    dropdownContainer: {
        borderColor: "#ccc",
        borderRadius: 10,
        zIndex: 3000,
        elevation: 5,
        // maxHeight: 200,     // 👈 dropdown scroll enable karne ke liye
    },
    signUpButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        flex: 1,
        justifyContent: "center",
        borderColor: Colors.BtnClr,
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20),
    }
});
