import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import { Link } from "react-router-dom";
import grp5 from "../assets/grp5.png";

import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

export const WelfarismPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const landing = t.welfarismLanding || {};

  return (
    <>
      <Navbar />
      <main className="welfarism-page">
        <section
          className="welfarism-hero welfarism-landing-hero"
          aria-labelledby="welfarism-landing-title"
        >
          <Container className="welfarism-hero-inner">
            <div className="welfarism-hero-copy">
              <h1 id="welfarism-landing-title">{landing.title}</h1>

              {/* BULLETS */}
              {landing.bullets && (
                <ul className="welfarism-bullets">
                  {landing.bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {/* LEAD */}
              {landing.lead && (
                <p className="welfarism-lead">{landing.lead}</p>
              )}

              {/* FOCUS SECTIONS */}
              {landing.focus && (
                <div className="welfarism-focus">
                  {landing.focus.map((f, i) => (
                    <div key={i} className="welfarism-focus-card">
                      <h3>{f.title}</h3>
                      <p>{f.body}</p>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Link
                  className="welfarism-landing-button"
                  to="/welfarism-explore"
                >
                  {landing.button}
                </Link>
              </div>
            </div>

            <div className="welfarism-hero-art" aria-hidden="true">
              <img src={grp5} alt="" className="welfarism-hero-leader" />
            </div>
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
