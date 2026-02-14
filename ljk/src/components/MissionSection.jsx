import React, { useContext } from "react";

import { Container } from "./Container";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

// Mission section with emblem illustration
export const MissionSection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const mission = t.missionPage || {};

  return (
    <section id="grievance" className="section mission" aria-labelledby="mission-title">
      <Container className="section-grid">
        <div className="section-text">
          <h2 id="mission-title" className="section-title">
            {mission.title1} <span className="accent-gold">{mission.title2}</span>
          </h2>
          <h3 className="section-lead">{mission.subtitle}</h3>
          <p>{mission.description}</p>
        </div>
        <div className="card-image emblem">
          <img src="https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801230/mission-emblem_w3fva7.png" alt="Party emblem" />
        </div>
      </Container>
    </section>
  );
};
