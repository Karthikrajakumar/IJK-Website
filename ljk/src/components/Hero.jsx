import React from "react";
import { Box } from "./Box";
import heroGif from "../assets/LJK GIF.gif";
import "../styles.css";

// Hero banner with background image and overlay
export const Hero = () => {
  return (
    <section id="home" className="hero hero-gif" aria-label="LJK animation">
      <img className="hero-gif-image" src={heroGif} alt="LJK animation" />
      <Box />
    </section>
  );
};
