import React from "react";
import { Container } from "./Container";
import { Box } from "./Box";
import scheme1 from "../assets/SCHEM 1.png";
import scheme2 from "../assets/SCHEM 2.png";
import scheme3 from "../assets/SCHEM 3.png";
import scheme4 from "../assets/SCHEM 4.png";
import scheme5 from "../assets/SCHEM 5.png";
import scheme6 from "../assets/SCHEM 6.png";
import lionPic from "../assets/lion-pic.png";


const schemes = [
  {
    title: "Veeramangai Velu Nachiyar Women Safety Scheme",
    accent: "accent-blue",
    image: scheme1,
    subtitle: "Dedicated to ensuring women's safety at home, work, and public spaces.",
    bullets: [
      "Rapid Response: A 24/7 integrated control center accessible via '112', guaranteeing police assistance within 7 minutes.",
      "The Pink Patrol: A specialized women's police force equipped with 50 SVU patrol bikes for schools, colleges, and IT parks.",
      "Smart Surveillance: 100% CCTV coverage on all public roads with AI-threat detection linked directly to the control room.",
      "Panic Buttons: Installation of \"SOS Buttons\" in markets and beaches that trigger sirens, lock gates, and start a video call with police.",
      "Legal & Judicial Support: Free legal aid centers for women and 2 Fast-Track Courts to resolve crimes within 6 months.",
      "Digital Safety: A special cybercrime unit to handle online harassment and morphing complaints."
    ],
    mediaSide: "left"
  },
  {
    title: "Dharmambal Livelihood Development Scheme",
    accent: "accent-gold",
    image: scheme2,
    subtitle: "Focusing on financial independence and entrepreneurship.",
    bullets: [
      "Direct Aid: Annual financial assistance of ₹50,000 for female heads of households below the poverty line.",
      "Mobility Support:" ,
      "Free electric scooters for meritorious college students (GPA > 9.5).",
       "60% vehicle subsidy for working women.",  "10% auto subsidy for female drivers under the \"Munneru Va Thozhi\" scheme.",
      "Tech for All:", 
      "\"Smart Sister\" scheme for free smartphones for women entrepreneurs.", 
      "\"Vidya\" scheme for free laptops for all college students.",
      "Business Loans: Collateral-free loans up to ₹15 Lakhs (with 50% subsidy) for starting a business.",
      "Interest-Free Loans: Up to ₹10 Lakhs for Self-Help Groups (SHGs).",
      "Legal & Judicial Support: Free legal aid centers for women and 2 Fast-Track Courts to resolve crimes within 6 months.",
      "She-Marts: Exclusive e-commerce platforms and physical marts to sell SHG products."
    ],
    mediaSide: "right"
  },
  {
    title: "Muthulakshmi Reddy Women's Health Scheme",
    accent: "accent-red",
    image: scheme3,
    subtitle: "Prioritizing maternal and mental health.",
    bullets: [
      "Maternal Support: ₹35,000 financial aid plus a \"JCM Nutrition Kit\" for pregnant women.",
      "School Enrollment Bonus: ₹20,000 annually for mothers enrolling children in government schools.",
      "Mental Health: Free, confidential counseling centers in every constituency to support women facing domestic pressure or depression."
    ],
    mediaSide: "left"
  },
  {
    title: "Maniammai Self-Respect Scheme",
    accent: "accent-blue",
    image: scheme4,
    subtitle: "Supporting the most vulnerable women in society.",
    bullets: [
      "Marriage Assistance: ₹1 Lakh plus 10 grams of gold for brides from families below the poverty line.",
      "Pension Support: Annual pension of ₹60,000 for widows, destitute women, and unmarried women to ensure dignity.",
      "Crisis Support: Interest-free emergency loans up to ₹10 Lakhs for widows and abandoned women."
    ],
    mediaSide: "right"
  },
  {
    title: "Avvaiyar Governance Scheme",
    accent: "accent-gold",
    image: scheme5,
    subtitle: "Ensuring women have a seat at the table.",
    bullets: [
      "Political Reservation:", 
      "50% reservation for women in local body elections.", 
      "33% reservation in high-level government administrative posts.", 
      "33% reservation on the boards of all Co-operative Societies.",
      "Future Leaders: A special government academy to provide diploma training in governance for aspiring female politicians.",
      "Fellowships: A one-year paid internship for female graduates to work directly with Ministers and IAS officers."
    ],
    mediaSide: "left"
  },
  {
    title: "Saraswathi Subbiah Rights Scheme",
    accent: "accent-red",
    image: scheme6,
    subtitle: "Everyday essentials for a better quality of life.",
    bullets: [
      "Domestic Support: Free LPG cylinders annually for homemakers.",
      "Mobility: Free bus travel for women in all Puducherry government buses.",
      "Skill Development: Free driving license and driver training, with costs borne by the state.",
      "Hygiene: \"Pink ATMs\" dispensing free sanitary napkins in educational institutions and public places.",
      "Green Energy: Free solar power connections for households headed by widows or differently-abled women under the \"Kannagi Solar Energy Scheme.\""
    ],
    mediaSide: "right"
  }
];

// Our Ideology section aligned to the provided reference image
export const IdeologySection = () => {
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

  const getHighlightCount = (title) => {
    if (title.startsWith("Veeramangai Velu Nachiyar")) {
      return 3;
    }
    if (title.startsWith("Muthulakshmi Reddy")) {
      return 2;
    }
    if (title.startsWith("Saraswathi Subbiah")) {
      return 2;
    }
    return 1;
  };

  const renderBullet = (bullet, schemeTitle) => {
    const separatorIndex = bullet.indexOf(":");
    const allowAmountHighlight =
      schemeTitle === "Dharmambal Livelihood Development Scheme" ||
      schemeTitle === "Maniammai Self-Respect Scheme" ||
      schemeTitle === "Saraswathi Subbiah Rights Scheme" ||
      schemeTitle === "Avvaiyar Governance Scheme";
    const specialPhraseRegex =
      schemeTitle === "Maniammai Self-Respect Scheme" ||
      schemeTitle === "Saraswathi Subbiah Rights Scheme"
        ? /₹1 Lakh plus 10 grams|₹60,000|60,000|60000|₹10 Lakhs|10 Lakhs|10 lakhs/gi
        : schemeTitle === "Avvaiyar Governance Scheme"
        ? /\d+%\s+reservation/gi
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
            EMPOWERING WOMEN STRENGTHENING
            <br />SOCIETY
          </p>
          <p className="ideology-hero-subtitle">
            "When women are strong, Puducherry prospers" — Jose Charles Martin
          </p>
        </Container>
      </div>

      <div className="ideology-content">
        <Container>
          <div className="scheme-list">
            {schemes.map((scheme, index) => (
              <article
                key={`${scheme.title}-${index}`}
                className={`scheme ${scheme.mediaSide === "right" ? "reverse" : ""}`}
              >
                <header className="scheme-header">
                  <h3 className="scheme-title">
                    <span className={`scheme-accent ${scheme.accent}`}>
                      {scheme.title.split(" ").slice(0, getHighlightCount(scheme.title)).join(" ")}
                    </span>{" "}
                    {scheme.title.split(" ").slice(getHighlightCount(scheme.title)).join(" ")}
                  </h3>
                  <p className="scheme-subtitle">{scheme.subtitle}</p>
                </header>
                <div className="scheme-body">
                  <div className="scheme-media">
                    <img
                      className="scheme-image"
                      src={scheme.image}
                      alt={scheme.title}
                      loading="lazy"
                      
                    />
                  </div>
                  <div className="scheme-text">
                    <ul className="scheme-points">
                      {scheme.bullets.map((bullet) => (
                        <li key={bullet}>{renderBullet(bullet, scheme.title)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="leader-pledge">
            <div className="leader-pledge-text">
              <h2>THE LEADER&apos;S PERSONAL PLEDGE</h2>
              <p>
                <span className="pledge-bold">The ₹100 Crore Promise:</span>{" "}
                "In the new LJK government of 2026, I pledge to allocate{" "}
                <span className="pledge-bold">₹100 Crores from my personal funds</span> to uplift
                the livelihoods of the people of Puducherry."{" "}
                <span className="pledge-bold">— Jose Charles Martin</span>
              </p>
            </div>
            <div className="leader-pledge-media">
              <div className="leader-pledge-lion">
                <img src={lionPic} alt="Lion statue" loading="lazy" />
              </div>
              
            </div>
          </div>
        </Container>
      </div>
      <Box />
    </section>
  );
};
