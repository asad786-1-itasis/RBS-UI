import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import translate from "translate-google-api";

const LanguageTranslator = () => {
  const [loading, setLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default to Spanish
  const textToTranslate = "Hello, how are you?"; // Text to be translated

  // Language options with their codes
  const languageOptions = [
    { label: "Spanish", value: "es" },
    { label: "Arabic", value: "ar" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Chinese", value: "zh" },
    // Add more languages as needed
  ];

  useEffect(() => {
    setLoading(true);
    const translateText = async () => {
      try {
        const result = await translate(textToTranslate, {
          to: selectedLanguage,
        });
        setTranslatedText(result); // Set the translated text
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Translation error:", error);
      }
    };

    translateText(); // Call the translate function whenever the language changes
  }, [selectedLanguage]); // Re-run effect when selectedLanguage changes

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        {languageOptions.map((language) => (
          <Picker.Item
            key={language.value}
            label={language.label}
            value={language.value}
          />
        ))}
      </Picker>
      <Text style={styles.translatedText}>Translated Text</Text>
      {loading ? (
        <ActivityIndicator size={30} color={"black"} />
      ) : (
        <Text style={styles.translatedText}>{translatedText}</Text>
      )}
    </SafeAreaView>
  );
};

export default LanguageTranslator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
  },
  translatedText: {
    marginTop: 20,
    fontSize: 18,
  },
});
