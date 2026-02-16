import React, { useContext, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { NavLink } from "react-router-dom";
import { Box } from "../components/Box";

import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const grievanceImage = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801227/grievance-image_pkrm9u.png";



const translations = {
  English: en,
  Tamil: ta,
};

export const GrievancePage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const grievance = t.grievancePage || {};

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Navbar />
      <main className="grievance-page">
        <section className="grievance-hero" aria-labelledby="grievance-title">
          <Container className="grievance-hero-inner">
            <h1 className="grievance-title" id="grievance-title">
              {grievance.title1} <span className="accent-red">{grievance.title2}</span>
            </h1>
            <p className="grievance-subtitle">{grievance.subtitle}</p>
            <div className="grievance-actions">
              <NavLink className="grievance-button primary" to="/grievance/raise-issue">
                {grievance.raiseIssue}
              </NavLink>
              <NavLink className="grievance-button outline" to="/grievance/track-issue">
                {grievance.trackIssue}
              </NavLink>
            </div>
          </Container>
        </section>
        <section className="grievance-image-section">
          <img src={grievanceImage} alt={grievance.imageAlt} className="grievance-image" />
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
