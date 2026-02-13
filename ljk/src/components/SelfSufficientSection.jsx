import React from "react";


import { Container } from "./Container";
import animationGif from "../assets/vid.gif"

// Self-sufficient section with headline and image
export const SelfSufficientSection = () => {
  return (
    <section className="section self-sufficient" aria-labelledby="self-title">
      <Container>
        <div className="self-header">
          <h2 id="self-title" className="section-title">
            A SELF-SUFFICIENT <span className="accent-red">PUDUCHERRY</span>
          </h2>
          <p className="self-subtitle" style={{justifyContent: "center"}}>
            Our goal is singular and ambitious: to elevate Puducherry&#39;s
            infrastructure, economy, and standard of living to match global
            standards, inspired by the efficiency and prosperity of Singapore.
          </p>
          <p className="self-subtitle" style={{justifyContent: "center"}}>
This is not a vague dream. To ensure this becomes reality, our leader has already engaged a Singapore-based architectural and planning firm to design a future development roadmap. This master plan focuses on modern traffic management systems, strategic flyovers, and expanding coastal tourism to truly match global standards.          </p>
        </div>
        
        <div className="self-gif">
           <img
           style={{
            
           }}
    src={animationGif}
    alt="Puducherry progress animation"
  />
        </div>
      </Container>
    </section>
  );
};
