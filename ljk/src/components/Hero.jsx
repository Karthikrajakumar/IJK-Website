import React from "react";
import { Box } from "./Box";

import "../styles.css";

// Hero banner with background image and overlay
export const Hero = () => {
  return (
    <section id="home" className="hero hero-gif" aria-label="LJK animation">
      <video
        className="hero-gif-image"
        src="https://res.cloudinary.com/dot0wbsfv/video/upload/v1770801231/LJK_GIF_fmxmdv.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="LJK animation"
      />
      <Box />
    </section>
  );
};
