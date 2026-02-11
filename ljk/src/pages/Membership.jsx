import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderPortrait from "../assets/grp5.png";

export const MembershipPage = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otpStatus, setOtpStatus] = useState("idle");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (window.initSendOTP || customElements.get("h-captcha")) {
      return;
    }
    const scriptUrls = [
      "https://verify.msg91.com/otp-provider.js",
      "https://verify.phone91.com/otp-provider.js",
    ];
    let index = 0;

    const attemptLoad = () => {
      if (index >= scriptUrls.length) return;
      if (document.querySelector(`script[src="${scriptUrls[index]}"]`)) {
        return;
      }
      const script = document.createElement("script");
      script.src = scriptUrls[index];
      script.async = true;
      script.onload = () => {};
      script.onerror = () => {
        index += 1;
        attemptLoad();
      };
      document.head.appendChild(script);
    };

    attemptLoad();
  }, []);

  const sendOtp = () => {
    setOtpError("");
    setOtpVerified(false);
    const trimmed = mobile.replace(/\D/g, "");

    if (!trimmed || trimmed.length !== 10) {
      setOtpError("Enter a valid 10-digit mobile number.");
      setOtpStatus("error");
      return;
    }

    if (typeof window.initSendOTP !== "function") {
      setOtpError("OTP service is not available right now. Please try again.");
      setOtpStatus("error");
      return;
    }

    setOtpStatus("sending");

    const configuration = {
      widgetId: "36626a67706c333432373235",
      tokenAuth: "493421TbeXBwrq3J698add0fP1",
      identifier: `91${trimmed}`,
      success: () => {
        setOtpVerified(true);
        setOtpStatus("verified");
      },
      failure: () => {
        setOtpVerified(false);
        setOtpStatus("error");
        setOtpError("OTP verification failed. Please try again.");
      },
    };

    window.initSendOTP(configuration);
  };

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
                <span>Date of Birth</span>
                <input
                  type="date"
                  onClick={(event) => event.currentTarget.showPicker?.()}
                />
              </label>
              <label className="raise-field">
                <span>Email</span>
                <input type="email" placeholder="Short answer text" />
              </label>
              <label className="raise-field">
                <span>Mobile Number</span>
                <input
                  type="tel"
                  placeholder="Short answer text"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </label>
              <div className="raise-otp">
                <button
                  type="button"
                  className="raise-otp-button"
                  onClick={sendOtp}
                  disabled={otpStatus === "sending"}
                >
                  {otpStatus === "sending" ? "Sending..." : "Send OTP"}
                </button>
                <span className={`raise-otp-status ${otpVerified ? "is-verified" : ""}`}>
                  <span className="otp-indicator" aria-hidden="true" />
                  {otpVerified ? "OTP verified" : "OTP not verified"}
                </span>
              </div>
              {otpError && <p className="raise-otp-error">{otpError}</p>}
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
