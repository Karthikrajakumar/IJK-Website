import React, { useContext } from "react";
import { Container } from "./Container";
import { Box } from "./Box";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

// Wings list section
export const WingsSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const wings = t.wingsPage || {};

  return (
    <section className="section wings" aria-labelledby="wings-title">
      <Container>
        <div className="section-header">
          <h2 id="wings-title" className="section-title">{wings.title}</h2>
          <p className="wings-list">{wings.list}</p>
        </div>
      </Container>
      <Box />
    </section>
  );
};
