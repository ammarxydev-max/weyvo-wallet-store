import { useEffect, useState } from "react";

const translations = {
  en: {
    buy1: "Buy 1",
    buy2: "Buy 2",
    buy3: "Buy 3",
    oneDesc: "One wallet for your everyday carry.",
    bestValue: "BEST VALUE",
    bestSaving: "BEST SAVING",
    save: "Save",
    each: "each.",
    language: "العربية",
  },
  ar: {
    buy1: "محفظة واحدة",
    buy2: "محفظتين",
    buy3: "3 محافظ",
    oneDesc: "محفظة عملية لكل يوم.",
    bestValue: "الأوفر",
    bestSaving: "أعلى توفير",
    save: "وفر",
    each: "للمحفظة.",
    language: "English",
  },
} as const;

type Lang = keyof typeof translations;

export function getInitialLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("weyvo-language") as Lang | null;
  if (saved === "ar" || saved === "en") return saved;
  return /^ar(?:-|$)/i.test(navigator.language) ? "ar" : "en";
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("weyvo-language", lang);
    window.dispatchEvent(new CustomEvent("weyvo-language-change", { detail: lang }));
  }, [lang]);

  const t = translations[lang];

  return (
    <button
      type="button"
      aria-label={lang === "ar" ? "Switch to English" : "تغيير اللغة إلى العربية"}
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      style={{
        position: "fixed",
        right: "16px",
        bottom: "calc(92px + env(safe-area-inset-bottom))",
        zIndex: 40,
        border: "1px solid rgba(0,0,0,.10)",
        borderRadius: 999,
        padding: "10px 16px",
        background: "rgba(17,17,17,.96)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        lineHeight: 1,
        boxShadow: "0 8px 24px rgba(0,0,0,.16)",
        cursor: "pointer",
        touchAction: "manipulation",
      }}
    >
      {t.language}
    </button>
  );
}

export { translations };
