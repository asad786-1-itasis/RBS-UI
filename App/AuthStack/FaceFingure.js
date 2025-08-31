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
import { setSelectedLanguage } from "../Redux/HomeReducer/homeSlice";
import { t, setAppLanguage } from "../Languages/translations";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

const FaceFingure = () => {
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

    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const checkRegistration = async () => {
            const registered = await AsyncStorage.getItem("biometricRegistered");
            if (registered === "true") setIsRegistered(true);
        };
        checkRegistration();
    }, []);

    // ✅ Proper Register Flow
    const handleRegisterBiometrics = async () => {
        try {
            // Always delete previous keys if user cancels before
            const { keysExist } = await rnBiometrics.biometricKeysExist();
            if (keysExist) {
                await rnBiometrics.deleteKeys();
            }

            const { publicKey } = await rnBiometrics.createKeys();
            console.log("Public Key:", publicKey);

            // Prompt biometric right away
            const result = await rnBiometrics.simplePrompt({
                promptMessage: "Confirm your biometrics to register",
            });

            if (result.success) {
                await AsyncStorage.setItem("biometricRegistered", "true");
                setIsRegistered(true);
                // dispatch(setLogin(true));
                Alert.alert("Success", "Biometric registered successfully!");
            } else {
                await rnBiometrics.deleteKeys(); // ❌ Delete keys on cancel
                Alert.alert("Cancelled", "Biometric registration cancelled.");
            }
        } catch (error) {
            console.log("Error registering biometrics:", error);
            Alert.alert("Error", "Failed to register biometrics.");
        }
    };

    // ✅ Authenticate
    const handleAuthenticate = async () => {
        try {
            const result = await rnBiometrics.simplePrompt({
                promptMessage: "Authenticate with biometrics",
            });

            if (result.success) {
                Alert.alert("Success", "Authentication successful!");
            } else {
                Alert.alert("Failed", "Authentication cancelled.");
            }
        } catch (error) {
            console.log("Auth error:", error);
            Alert.alert("Error", "Authentication failed.");
        }
    };

    return (
        <SafeAreaView style={[CustomStyle.SafeAreaStyle, {}]}>
            <CustomStatusBar />
            <KeyboardAwareScrollView
                style={{ flex: 1, backgroundColor: Colors.background }}
                contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.background }}
                keyboardShouldPersistTaps="handled"
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
                                    style={[styles.LogoTxt, { fontSize: moderateScale(40) }]}
                                >
                                    🔐
                                </CustomText>
                                <CustomText
                                    style={[styles.LogoTxt,]}
                                >
                                    {t("enableBiometric")}
                                </CustomText>

                            </View>
                        </Animatable.View>
                        <View style={styles.inputWrapper}>
                            <Animatable.View animation={"fadeInRight"} duration={500}>
                                <CustomText style={{ color: Colors.black, textAlign: 'center', marginBottom: moderateScale(19) }}>
                                    {isRegistered
                                        ? t("biometricIsAlready")
                                        : t("registerYourBiometrics")}
                                </CustomText>
                                {!isRegistered ? (
                                    <TouchableOpacity
                                        style={styles.registerButton}
                                        onPress={handleRegisterBiometrics}
                                    >
                                        <CustomText style={styles.btnTxt}>Register Biometrics</CustomText>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.authButton}
                                        onPress={handleAuthenticate}
                                    >
                                        <CustomText style={styles.btnTxt}>Authenticate</CustomText>
                                    </TouchableOpacity>
                                )}
                            </Animatable.View>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: "flex-end", }}>
                            <View style={styles.textContainer}>
                                {/* <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <CustomText
                                        style={{
                                            fontSize: moderateScale(14),
                                            paddingVertical: moderateScale(10),
                                            fontWeight: "600",
                                            color: Colors.BtnClr,
                                            paddingLeft: 5,
                                        }}
                                    >
                                        {t("backToLogin")}
                                    </CustomText>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default FaceFingure;

const styles = StyleSheet.create({
    imageWrapper: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
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
    forgetTxt: {
        width: "40%",
        alignSelf: "flex-end",

    },
    cardView: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(10),
        overflow: "hidden",
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
    registerButton: {
        backgroundColor: Colors.BtnClr,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
        elevation: 3,
    },
    authButton: {
        backgroundColor: Colors.BtnClr,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
        elevation: 3,
    },
    btnTxt: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: moderateScale(14)
    }
});
