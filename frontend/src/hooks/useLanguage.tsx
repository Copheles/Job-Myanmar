import { useAppSelector } from "@redux/hooks";
import enTranslations from "@assets/locales/en.json";
import mmTranslations from "@assets/locales/mm.json";

export default function useLanguage() {
  const { currentLanguage } = useAppSelector((state) => state.language);

  const language = currentLanguage === "mm" ? mmTranslations : enTranslations;

  return {
    language,
  };
}
