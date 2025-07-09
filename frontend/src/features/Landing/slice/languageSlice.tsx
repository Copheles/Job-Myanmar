// features/language/languageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "en" | "mm";

interface LanguageState {
  currentLanguage: Language;
}

// Get initial language from localStorage or browser
const getInitialLanguage = (): Language => {
  const savedLang = localStorage.getItem("language");
  if (savedLang === "en") return "en";
  return "mm"; // default
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload);
    },
    toggleLanguage: (state) => {
      const newLang = state.currentLanguage === "en" ? "mm" : "en";
      state.currentLanguage = newLang;
      localStorage.setItem("language", newLang);
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
