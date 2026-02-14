import React from "react";

import { Container } from "./Container";

// About section with image and text
export const AboutSection = () => {
  return (
    <section id="ideology" className="section about" aria-labelledby="about-title">
      <Container className="section-grid">
        <div className="card-image">
          <img src="https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/about-image_dbgoid.png" alt="Community outreach" />
        </div>
        <div className="section-text">
          <h2 id="about-title" className="section-title">
            ABOUT THE <span className="accent-red">PARTY</span>
          </h2>
          <p>
            Latchiya Jananayaga Katchi (LJK) is a progressive political party dedicated to the holistic development of the Union Territory of Puducherry. Unlike traditional political outfits rooted in legacy or caste, LJK was born from a desire to break the stagnation of the "Syndicate Raj" and replace it with Smart Governance. We believe that Puducherry, with its unique geography and human capital, has the potential to be the "Singapore of India." Our mission is to bridge the gap between the government and the common man through technology, transparency, and unyielding integrity.
          </p>
          <p>
            We believe governance requires professional planning, not just promises. Our approach is rooted in the 'Sand to Satellite' philosophy—applying the same innovation that allowed us to launch rockets with 5,000 students and revolutionize railway tourism to the administration of Puducherry.

          </p>
          
        </div>
      </Container>
    </section>
  );
};
