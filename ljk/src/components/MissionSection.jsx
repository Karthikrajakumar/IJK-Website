import React from "react";

import { Container } from "./Container";

// Mission section with emblem illustration
export const MissionSection = () => {
  return (
    <section id="grievance" className="section mission" aria-labelledby="mission-title">
      <Container className="section-grid">
        <div className="section-text">
          <h2 id="mission-title" className="section-title">
            CURRENT <span className="accent-gold">MISSION</span>
          </h2>
          <h3 className="section-lead">The 60-Day Foot March (Padayatra)</h3>
          <p>
           Our leader, Jose Charles Martin, is undertaking a historic 60-day journey across  Puducherry to meet you at your doorstep, hear your grievances, and formulate a  manifesto that truly belongs to the people.
          </p>
          
        </div>
        <div className="card-image emblem">
          <img src="https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801230/mission-emblem_w3fva7.png" alt="Party emblem" />
        </div>
      </Container>
    </section>
  );
};
