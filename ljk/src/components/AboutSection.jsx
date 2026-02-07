import React from "react";
import aboutImage from "../assets/about-image.png";
import { Container } from "./Container";

// About section with image and text
export const AboutSection = () => {
  return (
    <section id="ideology" className="section about" aria-labelledby="about-title">
      <Container className="section-grid">
        <div className="card-image">
          <img src={aboutImage} alt="Community outreach" />
        </div>
        <div className="section-text">
          <h2 id="about-title" className="section-title">
            ABOUT THE <span className="accent-red">PARTY</span>
          </h2>
          <p>
            Latchiya Jananayaga Katchi (LJK) is a progressive political party dedicated to the holistic development of the Union Territory of Puducherry. Unlike traditional political outfits rooted in legacy or caste, LJK was born from a desire to break the stagnation of the "Syndicate Raj" and replace it with Smart Governance. We believe that Puducherry, with its unique geography and human capital, has the potential to be the "Singapore of India." Our mission is to bridge the gap between the government and the common man through technology, transparency, and unyielding integrity.
          </p>
          
        </div>
      </Container>
    </section>
  );
};
