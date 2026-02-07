import React from "react";
import { Container } from "./Container";
import { Box } from "./Box";


// Wings list section
export const WingsSection = () => {
  return (
    <section  className="section wings" aria-labelledby="wings-title">
      <Container>
        <div className="section-header">
          <h2 id="wings-title" className="section-title">WINGS</h2>
          <p className="wings-list">
            Youth Wing, Women&#39;s Wing, Agriculture Wing, Information Technology
            Wing, Labour Wing
          </p>
        </div>
      </Container>
      <Box />
    </section>
  
  );
};
