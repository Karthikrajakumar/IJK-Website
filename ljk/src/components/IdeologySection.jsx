import React, { useContext } from "react";
import { Container } from "./Container";
import { Box } from "./Box";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";
const scheme1 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801231/SCHEM_1_jl8as9.png";
const scheme2 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801231/SCHEM_2_vs13z9.png";
const scheme3 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801236/SCHEM_3_d5c1b4.png";
const scheme4 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801232/SCHEM_4_qdoqft.png";
const scheme5 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801232/SCHEM_5_q9kdwk.png";
const scheme6 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801232/SCHEM_6_qjemcq.png";

const lionPic = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801229/lion-pic_o8n3kr.png";




const translations = {
  English: en,
  Tamil: ta,
};

const schemeImages = {
  scheme1,
  scheme2,
  scheme3,
  scheme4,
  scheme5,
  scheme6,
};

// Our Ideology section aligned to the provided reference image
export const IdeologySection = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const ideology = t.ideologyPage || {};

  const amountRegex = /₹\s?\d[\d,]*(?:\s?Lakhs)?/g;

  const splitWithAmounts = (text, extraRegex) => {
    const parts = [];
    let lastIndex = 0;
    const combinedRegex = extraRegex
      ? new RegExp(`${extraRegex.source}|${amountRegex.source}`, "g")
      : amountRegex;
    for (const match of text.matchAll(combinedRegex)) {
      const start = match.index ?? 0;
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }
      parts.push(
        <span key={`${match[0]}-${start}`} className="bullet-amount">
          {match[0]}
        </span>
      );
      lastIndex = start + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  const renderParts = (parts) =>
    parts.map((part, index) => (
      <React.Fragment key={`part-${index}`}>{part}</React.Fragment>
    ));

  const renderBullet = (bullet, scheme) => {
    const separatorIndex = bullet.indexOf(":");
    const allowAmountHighlight = Boolean(scheme.allowAmountHighlight);
    const specialPhraseRegex = scheme.specialPhraseRegex
      ? new RegExp(scheme.specialPhraseRegex, "gi")
      : null;

    if (separatorIndex !== -1) {
      const heading = bullet.slice(0, separatorIndex + 1);
      const rest = bullet.slice(separatorIndex + 1);
      const restContent = allowAmountHighlight
        ? renderParts(splitWithAmounts(rest, specialPhraseRegex))
        : rest;
      return (
        <>
          <span className="bullet-heading">{heading}</span>
          {restContent}
        </>
      );
    }

    const leadMatch = bullet.match(/^(.*?)(\s(?:for|up to)\b)/i);
    if (!leadMatch) {
      if (allowAmountHighlight) {
        return <>{renderParts(splitWithAmounts(bullet, specialPhraseRegex))}</>;
      }
      return <>{bullet}</>;
    }

    const lead = leadMatch[1];
    const tail = bullet.slice(lead.length);
    const tailContent = allowAmountHighlight
      ? renderParts(splitWithAmounts(tail, specialPhraseRegex))
      : tail;
    return (
      <>
        <span className="bullet-heading">{lead}</span>
        {tailContent}
      </>
    );
  };

  return (
    <section id="ideology" className="ideology-page" aria-labelledby="ideology-title">
      <div className="ideology-hero">
        <Container>
          <p className="ideology-hero-title" id="ideology-title">
            {ideology.heroTitleLine1}
            <br />{ideology.heroTitleLine2}
          </p>
          <p className="ideology-hero-subtitle">{ideology.heroSubtitle}</p>
        </Container>
      </div>

      <div className="ideology-content">
        <Container>
          <div className="scheme-list">
            {(ideology.schemes || []).map((scheme, index) => (
              <article
                key={`${scheme.title}-${index}`}
                className={`scheme ${scheme.mediaSide === "right" ? "reverse" : ""}`}
              >
                <header className="scheme-header">
                  <h3 className="scheme-title">
                    <span className={`scheme-accent ${scheme.accent}`}>
                      {scheme.title.split(" ").slice(0, scheme.highlightCount).join(" ")}
                    </span>{" "}
                    {scheme.title.split(" ").slice(scheme.highlightCount).join(" ")}
                  </h3>
                  <p className="scheme-subtitle">{scheme.subtitle}</p>
                </header>
                <div className="scheme-body">
                  <div className="scheme-media">
                    <img
                      className="scheme-image"
                      src={schemeImages[scheme.imageKey]}
                      alt={scheme.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="scheme-text">
                    <ul className="scheme-points">
                      {scheme.bullets.map((bullet) => (
                        <li key={bullet}>{renderBullet(bullet, scheme)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="leader-pledge">
            <div className="leader-pledge-text">
              <h2>{ideology.pledgeTitle}</h2>
              <p>
                <span className="pledge-bold">{ideology.pledgeLead}</span>{" "}
                {ideology.pledgeBody}
                {" "}
                <span className="pledge-bold">{ideology.pledgeHighlight}</span>{" "}
                <span className="pledge-bold">{ideology.pledgeAttribution}</span>
              </p>
            </div>
            <div className="leader-pledge-media">
              <div className="leader-pledge-lion">
                <img src={lionPic} alt={ideology.pledgeLionAlt} loading="lazy" />
              </div>
              
            </div>
          </div>
        </Container>
      </div>
      <Box />
    </section>
  );
};
