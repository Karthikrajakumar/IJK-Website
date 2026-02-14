import React, { useContext } from "react";
import { Box } from "./Box";

import "../styles.css";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

// Hero banner with background image and overlay
export const Hero = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const hero = t.hero || {};

  return (
    <section id="home" className="hero hero-gif" aria-label={hero.ariaLabel}>
      <video
        className="hero-gif-image"
        src="https://res.cloudinary.com/dot0wbsfv/video/upload/v1770801231/LJK_GIF_fmxmdv.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label={hero.videoLabel}
      />
      <Box />
    </section>
  );
};
