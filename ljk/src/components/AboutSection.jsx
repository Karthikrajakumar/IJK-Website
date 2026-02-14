import React, { useContext } from "react";

import { Container } from "./Container";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

// About section with image and text
export const AboutSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const about = t.aboutPage || {};

  return (
    <section id="ideology" className="section about" aria-labelledby="about-title">
      <Container className="section-grid">
        <div className="card-image">
          <img src="https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/about-image_dbgoid.png" alt="Community outreach" />
        </div>
        <div className="section-text">
          <h2 id="about-title" className="section-title">
            {about.title1} <span className="accent-red">{about.title2}</span>
          </h2>
          <p>{about.para1}</p>
          <p>{about.para2}</p>
        </div>
      </Container>
    </section>
  );
};
