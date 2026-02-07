import React from "react";

import sectionGif from "../assets/Gif.gif";
import { Container } from "./Container";

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
        </div>
        
        <div className="self-gif">
          <img src={sectionGif} alt="Puducherry progress animation" />
        </div>
      </Container>
    </section>
  );
};
