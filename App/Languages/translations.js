import en from "./en.json";
import ar from "./ar.json";
import fr from "./fr.json";

// Define supported languages
const languages = { en, ar,fr };

// Set default language
let currentLanguage = "en";

// Function to set language
export const setAppLanguage = (langCode) => {
  if (languages[langCode]) {
    currentLanguage = langCode;
  } else {
    console.warn(`Language ${langCode} not supported.`);
  }
};

// Function to get a translation
export const t = (key) => {
  return languages[currentLanguage][key] || key;
};
