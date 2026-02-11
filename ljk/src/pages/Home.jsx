import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { MissionSection } from "../components/MissionSection";
import { SelfSufficientSection } from "../components/SelfSufficientSection";
import { WingsSection } from "../components/WingsSection";
import { Footer } from "../components/Footer";

// Home page layout
export const Home = () => {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <Hero />
        <AboutSection />
        <MissionSection />
        <SelfSufficientSection />
        <WingsSection />
      </main>
      <Footer />
    </>
  );
};
