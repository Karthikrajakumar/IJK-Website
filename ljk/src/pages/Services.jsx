import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";

import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const leaderImage = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801228/leader2_nnvkg0.png";

const charity1 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/charity1_juk0sb.png";
const charity2 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity2_oyelru.png";
const charity3 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/charity3_zwcgdm.png";
const charity4 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/charity4_nt8asv.png";
const charity5 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801221/charity5_prins8.png";
const charity6 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801222/charity6_kprdpd.png";
const charity7 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801222/charity7_izucbg.png ";
const charity8 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801222/charity8_ojvyjn.png";
const charity9 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801222/charity9_umjwzu.png";
const charity10 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801222/charity10_xfw8rb.png";
const charity11 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801223/charity11_epgnj4.png";
const charity12 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801223/charity12_s8xtax.png";
const charity13 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity13_mvk2ky.png";
const charity14 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity14_irad9f.png";
const charity15 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801223/charity15_u0amil.png";
const charity16 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity16_qswdos.png";
const charity17 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity17_x2f7bf.png";
const charity18 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801224/charity18_v3harr.png";
const charity19 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801225/charity19_wslj7x.png";
const charity20 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801230/charity20_lobzqs.png";
const charity21 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801226/charity21_cbmvnm.png";
const charity22 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801226/charity22_x3kafh.png";
const charity23 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801226/charity23_xdfzil.png";
const charity24 = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801227/charity24_ceflbd.png";



const translations = {
  English: en,
  Tamil: ta,
};

const servicesPhotos = [
  charity1,
  charity2,
  charity3,
  charity4,
  charity5,
  charity6,
  charity7,
  charity8,
  charity9,
  charity10,
  charity11,
  charity12,
  charity13,
  charity14,
  charity15,
  charity16,
  charity17,
  charity18,
  charity19,
  charity20,
  charity21,
  charity22,
  charity23,
  charity24,
];

const ServicesImage = ({ src, className, alt, missingText }) => {
  const handleError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.nextElementSibling.style.display = "flex";
  };

  return (
    <div className={`services-image-frame ${className}`}>
      <img src={src} alt={alt} onError={handleError} />
      <div className="services-image-missing">
        <span>{missingText}</span>
      </div>
    </div>
  );
};

export const ServicesPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const services = t.servicesPage || {};
  const servicesStories = services.stories || [];

  return (
    <>
      <Navbar />
      <main className="services-page">
        <section className="services-hero" aria-labelledby="services-title">
          <Container className="services-hero-inner">
            <div className="services-hero-copy">
              <h1 id="services-title">{services.title}</h1>
              <p>{services.subtitle}</p>
            </div>
            <div className="services-hero-art" aria-hidden="true">
              <img src={leaderImage} alt="" className="services-hero-leader" />
            </div>
          </Container>
        </section>

        <section className="services-feed" aria-label="LJK Services">
          <Container className="services-feed-inner">
            {servicesStories.map((story, index) => (
              <article className="services-story" key={`${story.title}-${index}`}>
                <h2 className="services-story-title">{story.title}</h2>

                <div className="services-featured-single">
                  <ServicesImage
                    src={servicesPhotos[index * 3]}
                    alt={story.title}
                    missingText={services.imageMissing}
                  />
                </div>

                <p className="services-story-body">{story.body}</p>

                <div className="services-gallery-grid">
                  <ServicesImage
                    src={servicesPhotos[index * 3 + 1]}
                    alt={`${story.title} gallery one`}
                    missingText={services.imageMissing}
                  />
                  <ServicesImage
                    src={servicesPhotos[index * 3 + 2]}
                    alt={`${story.title} gallery two`}
                    missingText={services.imageMissing}
                  />
                </div>
              </article>
            ))}
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
