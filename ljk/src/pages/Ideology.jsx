import React from "react";
import { Navbar } from "../components/Navbar";
import { IdeologySection } from "../components/IdeologySection";
import { Footer } from "../components/Footer";

export const IdeologyPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <IdeologySection />
      </main>
      <Footer />
    </>
  );
};
