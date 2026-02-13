import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { NavLink } from "react-router-dom";
import { Box } from "../components/Box";
import grievanceImage from "../assets/grievance-image.png";

export const GrievancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="grievance-page">
        <section className="grievance-hero" aria-labelledby="grievance-title">
          <Container className="grievance-hero-inner">
            <h1 className="grievance-title" id="grievance-title">
              YOUR VOICE, YOUR CONSTITUENCY, <span className="accent-red">YOUR SOLUTION</span>
            </h1>
            <p className="grievance-subtitle">
              "Don't just live with the problem. Report it. Our team, led by JCM, is listening and
              ready to act."
            </p>
            <div className="grievance-actions">
              <NavLink className="grievance-button primary" to="/grievance/raise-issue">
                Raise an Issue
              </NavLink>
              <NavLink className="grievance-button outline" to="/grievance/track-issue">
                Track your Issue
              </NavLink>
            </div>
          </Container>
        </section>
        <section className="grievance-image-section">
          <img src={grievanceImage} alt="LJK Leader with Party Flag" className="grievance-image" />
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
