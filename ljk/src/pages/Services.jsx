import React from "react";
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

const servicesStories = [
  
  {
    title: "Jose Charles Martin Donates Rs 69 Lakhs to Tamil Research Foundation",
    body:
      "Mr. Jose Charles Martin has made a significant contribution of Rs 69 lakhs to the Tamil Research Foundation, reaffirming his commitment to the preservation and advancement of Tamil language and heritage. The contribution will support research initiatives, publications, seminars, and outreach programs that strengthen Tamil scholarship for future generations.",
    images: [servicesPhotos[0], servicesPhotos[1], servicesPhotos[2]],
  },
  {
    title: "Jose Charles Martin Supports Goshala Feed Program Through CSR",
    body:
      "Mr. Jose Charles Martin, Chairman and Managing Director of the Charles Group, is supporting the Goshala livestock feed program of the Satguru Charitable Trust in Tiruvannamalai through CSR funds. This annual support benefits around 350 animals and ensures nutrition, clean upkeep, and vaccination support while also contributing to annadhanam service.",
    images: [servicesPhotos[3], servicesPhotos[4], servicesPhotos[5]],
  },
  {
    title: "Jose Charles Martin Contributes Rs 32.75 Lakhs for Maruthamalai Temple",
    body:
      "Mr. Jose Charles Martin has donated Rs 32.75 lakhs to Sri Subramaniya Swamy Temple, Maruthamalai, for Rajagopuram renovation work and seven gold kalasams for the upcoming kumbhabhishekam. The support helps preserve temple heritage and improve the devotional experience for devotees.",
    images: [servicesPhotos[6], servicesPhotos[7], servicesPhotos[8]],
  },
  {
    title: "Jose Charles Martin Donates Rs 2.77 Crores to Delphic India Trust",
    body:
      "Mr. Jose Charles Martin has donated Rs 2.77 crores to the Delphic India Trust to promote sports and cultural unity through the Modern Pythian Games. The initiative supports youth participation, intercultural dialogue, and multidisciplinary events across arts and athletics.",
    images: [servicesPhotos[9], servicesPhotos[10], servicesPhotos[11]],
  },
  {
    title: "Jose Charles Martin Donates Rs 1.53 Crore for Choolai Temple Work",
    body:
      "Mr. Jose Charles Martin has contributed Rs 1.53 crores towards gold-plated copper work of the East Sanctum Tower at Arulmigu Angalaparameshwari Kaasi Vishwanathaswamy Temple, Choolai, Chennai. The contribution supports the upcoming Maha Kumbabishekam and temple restoration efforts.",
    images: [servicesPhotos[12], servicesPhotos[13], servicesPhotos[14]],
  },
  {
    title: "Jose Charles Martin Donates Rs 10 Lakhs to Marudhamalai School",
    body:
      "Mr. Jose Charles Martin has donated furniture and a high-capacity RO system to Marudhamalai Higher Secondary School, Vadavalli, Coimbatore. The support includes benches, desks, tables, chairs, and safe drinking water infrastructure to improve student learning conditions.",
    images: [servicesPhotos[15], servicesPhotos[16], servicesPhotos[17]],
  },
  {
    title: "Rs 22.11 Lakh Contribution Supports Thiruvadanai Temple Chariots",
    body:
      "Mr. Jose Charles Martin has contributed Rs 22.11 lakhs for repair, renovation, and new ornate wooden frames for the temple chariots of Shree Aadhirethneshwarar and Snegavalli Amman Temple in Thiruvadanai, Ramanathapuram, helping preserve heritage craftsmanship for future festivals.",
    images: [servicesPhotos[18], servicesPhotos[19], servicesPhotos[20]],
  },
  {
    title: "Jose Charles Martin Contributes Rs 69 Lakhs to Tamil Research Foundation",
    body:
      "Mr. Jose Charles Martin has made a significant contribution of Rs 69 lakhs to the Tamil Research Foundation, reaffirming his commitment to the preservation and advancement of Tamil language and heritage. The contribution will support research initiatives, publications, seminars, and outreach programs that strengthen Tamil scholarship for future generations.",
    images: [servicesPhotos[21], servicesPhotos[22], servicesPhotos[23]],
  },
];

const ServicesImage = ({ src, className, alt }) => {
  const handleError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.nextElementSibling.style.display = "flex";
  };

  return (
    <div className={`services-image-frame ${className}`}>
      <img src={src} alt={alt} onError={handleError} />
      <div className="services-image-missing">
        <span>Image unavailable</span>
      </div>
    </div>
  );
};

export const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main className="services-page">
        <section className="services-hero" aria-labelledby="services-title">
          <Container className="services-hero-inner">
            <div className="services-hero-copy">
              <h1 id="services-title">LJK Charity &amp; Service</h1>
              <p>
                Committed to care,service, and social Impact
              </p>
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
                  <ServicesImage src={story.images[0]} alt={story.title} />
                </div>

                <p className="services-story-body">{story.body}</p>

                <div className="services-gallery-grid">
                  <ServicesImage src={story.images[1]} alt={`${story.title} gallery one`} />
                  <ServicesImage src={story.images[2]} alt={`${story.title} gallery two`} />
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
