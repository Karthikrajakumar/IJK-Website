import React, { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "English";
  const saved = localStorage.getItem("lang");
  return saved === "Tamil" || saved === "English" ? saved : "English";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("lang-tamil", language === "Tamil");
  }, [language]);

  const changeLanguage = (nextLanguage) => {
    if (!nextLanguage) return;
    setLanguage(nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
