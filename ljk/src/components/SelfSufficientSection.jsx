import React, { useContext } from "react";

import { Container } from "./Container";
import animationGif from "../assets/vid.gif";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

// Self-sufficient section with headline and image
export const SelfSufficientSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const self = t.selfSufficientPage || {};

  return (
    <section className="section self-sufficient" aria-labelledby="self-title">
      <Container>
        <div className="self-header">
          <h2 id="self-title" className="section-title">
            {self.title1} <span className="accent-red">{self.title2}</span>
          </h2>
          <p className="self-subtitle" style={{ justifyContent: "center" }}>
            {self.subtitle1}
          </p>
          <p className="self-subtitle" style={{ justifyContent: "center" }}>
            {self.subtitle2}
          </p>
        </div>

        <div className="self-gif">
          <img src={animationGif} alt={self.imageAlt} />
        </div>
      </Container>
    </section>
  );
};
