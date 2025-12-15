import { useLanguage } from "../../contexts";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "vi" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      title={language === "en" ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === "en" ? "EN" : "VI"}</span>
    </button>
  );
}
