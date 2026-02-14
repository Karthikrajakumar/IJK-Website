import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderImage from "../assets/leader2.png";
import charity1 from "../assets/charity1.png";
import charity2 from "../assets/charity2.png";
import charity3 from "../assets/charity3.png";
import charity4 from "../assets/charity4.png";
import charity5 from "../assets/charity5.png";
import charity6 from "../assets/charity6.png";
import charity7 from "../assets/charity7.png";
import charity8 from "../assets/charity8.png";
import charity9 from "../assets/charity9.png";
import charity10 from "../assets/charity10.png";
import charity11 from "../assets/charity11.png";
import charity12 from "../assets/charity12.png";
import charity13 from "../assets/charity13.png";
import charity14 from "../assets/charity14.png";
import charity15 from "../assets/charity15.png";
import charity16 from "../assets/charity16.png";
import charity17 from "../assets/charity17.png";
import charity18 from "../assets/charity18.png";
import charity19 from "../assets/charity19.png";
import charity20 from "../assets/charity20.png";
import charity21 from "../assets/charity21.png";
import charity22 from "../assets/charity22.png";
import charity23 from "../assets/charity23.png";
import charity24 from "../assets/charity24.png";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

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
