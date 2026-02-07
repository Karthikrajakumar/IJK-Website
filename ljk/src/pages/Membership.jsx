import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderPortrait from "../assets/grp5.png";

export const MembershipPage = () => {
  return (
    <>
      <Navbar />
      <main className="membership-page">
        <section className="membership-hero" aria-labelledby="membership-title">
          <Container className="membership-hero-inner">
            <div className="membership-hero-media">
              <div className="membership-hero-brush" aria-hidden="true" />
              <img src={leaderPortrait} alt="Leader of LJK" />
            </div>
            <div className="membership-hero-text">
              <h1 id="membership-title">Be The Change You Want To See</h1>
              <p>
                Politics is not a spectator sport. Join the Latchiya Jananayaga Party (LJK) today
                and help us build the Puducherry of tomorrow.
              </p>
              <div className="membership-hero-note">
              <p>
                Be a decision maker. Don&apos;t just vote every 5 years. As a member, you shape our
                policies and choose our candidates. Identity &amp; Pride. Receive an official
                digital membership ID card immediately upon registration.
              </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="membership-form-section" aria-labelledby="membership-form-title">
          <Container>
            <div className="membership-form-header">
              <h2 id="membership-form-title">The Membership Form</h2>
              <p>Official Membership Registration</p>
            </div>
            <form className="raise-form">
              <label className="raise-field">
                <span>Name</span>
                <input type="text" placeholder="Short answer text" />
              </label>
              <label className="raise-field">
                <span>Email</span>
                <input type="email" placeholder="Short answer text" />
              </label>
              <label className="raise-field">
                <span>Mobile Number</span>
                <input type="tel" placeholder="Short answer text" />
              </label>
              <label className="raise-field">
                <span>OTP Code</span>
                <input type="text" placeholder="Short answer text" />
              </label>
              <div className="raise-field split">
                <label className="raise-field">
                  <span>Constituency</span>
                  <input type="text" placeholder="Short answer text" />
                </label>
                <label className="raise-field select">
                  <span>Constituency</span>
                  <select>
                    <option>Short answer</option>
                  </select>
                </label>
              </div>
              <label className="raise-field">
                <span>Constituency</span>
                <input type="text" placeholder="Short answer text" />
              </label>

              <button className="raise-submit" type="submit">
                Submit
              </button>
            </form>
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
