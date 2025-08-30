import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

const Biomateric = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Biomateric Security</Text>
      <Text style={styles.subtitle}>
        {isRegistered
          ? "Biometric is already registered. You can authenticate below."
          : "Register your biometrics to enable secure login."}
      </Text>

      {!isRegistered ? (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegisterBiometrics}
        >
          <Text style={styles.buttonText}>Register Biometrics</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.authButton}
          onPress={handleAuthenticate}
        >
          <Text style={styles.buttonText}>Authenticate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Biomateric;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  authButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
