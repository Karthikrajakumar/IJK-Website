import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderImage from "../assets/leader2.png";
import flagImage from "../assets/leader-with-flag.png";
import charity1 from "../assets/charity1.png";
import charity2 from "../assets/charity2.png";
import charity3 from "../assets/charity3.png";
import charity4 from "../assets/charity4.png";
import charity5 from "../assets/charity5.png";
import charity6 from "../assets/charity6.png";

const newsPhotos = [charity1, charity2, charity3, charity4, charity5, charity6];

const newsStories = [
  {
    title: "Jose Charles Martin Donates Rs 69 Lakhs to Tamil Research Foundation",
    body:
      "Mr. Jose Charles Martin has made a significant contribution of Rs 69 lakhs to the Tamil Research Foundation, reaffirming his commitment to the preservation and advancement of Tamil language and heritage. The contribution will support research initiatives, publications, seminars, and outreach programs that strengthen Tamil scholarship for future generations.",
    images: [newsPhotos[0], newsPhotos[1], newsPhotos[2]],
  },
  {
    title: "Jose Charles Martin Supports Goshala Feed Program Through CSR",
    body:
      "Mr. Jose Charles Martin, Chairman and Managing Director of the Charles Group, is supporting the Goshala livestock feed program of the Satguru Charitable Trust in Tiruvannamalai through CSR funds. This annual support benefits around 350 animals and ensures nutrition, clean upkeep, and vaccination support while also contributing to annadhanam service.",
    images: [newsPhotos[3], newsPhotos[4], newsPhotos[5]],
  },
  {
    title: "Jose Charles Martin Contributes Rs 32.75 Lakhs for Maruthamalai Temple",
    body:
      "Mr. Jose Charles Martin has donated Rs 32.75 lakhs to Sri Subramaniya Swamy Temple, Maruthamalai, for Rajagopuram renovation work and seven gold kalasams for the upcoming kumbhabhishekam. The support helps preserve temple heritage and improve the devotional experience for devotees.",
    images: [newsPhotos[0], newsPhotos[1], newsPhotos[2]],
  },
  {
    title: "Jose Charles Martin Donates Rs 2.77 Crores to Delphic India Trust",
    body:
      "Mr. Jose Charles Martin has donated Rs 2.77 crores to the Delphic India Trust to promote sports and cultural unity through the Modern Pythian Games. The initiative supports youth participation, intercultural dialogue, and multidisciplinary events across arts and athletics.",
    images: [newsPhotos[3], newsPhotos[4], newsPhotos[5]],
  },
  {
    title: "Jose Charles Martin Donates Rs 1.53 Crore for Choolai Temple Work",
    body:
      "Mr. Jose Charles Martin has contributed Rs 1.53 crores towards gold-plated copper work of the East Sanctum Tower at Arulmigu Angalaparameshwari Kaasi Vishwanathaswamy Temple, Choolai, Chennai. The contribution supports the upcoming Maha Kumbabishekam and temple restoration efforts.",
    images: [newsPhotos[0], newsPhotos[1], newsPhotos[2]],
  },
  {
    title: "Jose Charles Martin Donates Rs 10 Lakhs to Marudhamalai School",
    body:
      "Mr. Jose Charles Martin has donated furniture and a high-capacity RO system to Marudhamalai Higher Secondary School, Vadavalli, Coimbatore. The support includes benches, desks, tables, chairs, and safe drinking water infrastructure to improve student learning conditions.",
    images: [newsPhotos[3], newsPhotos[4], newsPhotos[5]],
  },
  {
    title: "Rs 22.11 Lakh Contribution Supports Thiruvadanai Temple Chariots",
    body:
      "Mr. Jose Charles Martin has contributed Rs 22.11 lakhs for repair, renovation, and new ornate wooden frames for the temple chariots of Shree Aadhirethneshwarar and Snegavalli Amman Temple in Thiruvadanai, Ramanathapuram, helping preserve heritage craftsmanship for future festivals.",
    images: [newsPhotos[0], newsPhotos[1], newsPhotos[2]],
  },
];

const NewsImage = ({ src, className, alt }) => {
  const handleError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.nextElementSibling.style.display = "flex";
  };

  return (
    <div className={`news-image-frame ${className}`}>
      <img src={src} alt={alt} onError={handleError} />
      <div className="news-image-missing">
        <span>Image unavailable</span>
      </div>
    </div>
  );
};

export const NewsPage = () => {
  return (
    <>
      <Navbar />
      <main className="news-page">
        <section className="news-hero" aria-labelledby="news-title">
          <Container className="news-hero-inner">
            <div className="news-hero-copy">
              <h1 id="news-title">LJK Unfiltered</h1>
              <p>
                The truth, directly from us. Breaking news, campaign highlights, and the stories
                that matter.
              </p>
            </div>
            <div className="news-hero-art" aria-hidden="true">
              <img src={flagImage} alt="" className="news-hero-flag" />
              <img src={leaderImage} alt="" className="news-hero-leader" />
            </div>
          </Container>
        </section>

        <section className="news-feed" aria-label="LJK News Updates">
          <Container className="news-feed-inner">
            {newsStories.map((story) => (
              <article className="news-story" key={story.title}>
                <h2 className="news-story-title">{story.title}</h2>

                <div className="news-featured-single">
                  <NewsImage src={story.images[0]} alt={story.title} />
                </div>

                <p className="news-story-body">{story.body}</p>

                <div className="news-gallery-grid">
                  <NewsImage src={story.images[1]} alt={`${story.title} gallery one`} />
                  <NewsImage src={story.images[2]} alt={`${story.title} gallery two`} />
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
