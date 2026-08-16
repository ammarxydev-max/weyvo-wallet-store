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
    language: "عربي",
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
    language: "EN",
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
        top: "max(12px, env(safe-area-inset-top))",
        right: "16px",
        zIndex: 1200,
        minWidth: 46,
        height: 36,
        padding: "0 12px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(17,17,17,.12)",
        borderRadius: 999,
        background: "rgba(255,255,255,.94)",
        color: "#111",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: ".15px",
        boxShadow: "0 5px 18px rgba(0,0,0,.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {t.language}
    </button>
  );
}

export { translations };
