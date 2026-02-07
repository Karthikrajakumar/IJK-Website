import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderFlag from "../assets/leader-with-flag.png";

export const RaiseIssuePage = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [category, setCategory] = useState("");
  const [otherIssue, setOtherIssue] = useState("");

  return (
    <>
      <Navbar />
      <main className="raise-issue-page">
        <section className="raise-hero" aria-labelledby="raise-issue-title">
          <Container className="raise-hero-inner">
            <div className="raise-hero-text">
              <h1 id="raise-issue-title">Direct Access To Leadership</h1>
              <p>
                You no longer need to wait in long queues at government offices or rely on
                unresponsive representatives. The Latchiya Jananayaga Party (LJK) believes in
                proactive governance. Whether it's a broken pipe, a dark street, admission issues,
                or civic neglect, use this portal to alert us directly. Every grievance submitted
                here is tracked, categorized, and brought to the attention of our Constituency
                Action Teams and our Leader, Jose Charles Martin.
              </p>
            </div>
            <div className="raise-hero-media">
              <div className="raise-hero-glow" aria-hidden="true" />
              <img src={leaderFlag} alt="Leader holding the LJK flag" />
            </div>
          </Container>
        </section>

        <section className="raise-form-section" aria-labelledby="raise-form-title">
          <Container>
            <div className="raise-form-header">
              <h2 id="raise-form-title">The Grievance Form</h2>
              <p>Submit Your Grievance</p>
            </div>
            <form className="raise-form">
              <div className="raise-group">
                <h3>Field 1: Personal Details</h3>
                <label className="raise-field">
                  <span>Full Name</span>
                  <input type="text" placeholder="Enter your full name" />
                </label>
                <label className="raise-field">
                  <span>Mobile Number</span>
                  <input type="tel" placeholder="Enter mobile number" />
                  <small>Essential for OTP verification</small>
                </label>
                <label className="raise-field">
                  <span>OTP Code</span>
                  <input type="text" placeholder="Enter OTP" />
                </label>
                <label className="raise-otp">
                  <input
                    type="checkbox"
                    checked={otpVerified}
                    onChange={(event) => setOtpVerified(event.target.checked)}
                  />
                  <span>OTP verified</span>
                </label>
              </div>

              <div className="raise-group">
                <h3>Field 2: Location Details</h3>
                <label className="raise-field select compact">
                  <span>Constituency</span>
                  <select defaultValue="" disabled={!otpVerified}>
                    <option value="" disabled>
                      Select constituency
                    </option>
                    <option value="Mannadipet">Mannadipet</option>
                    <option value="Thirubhuvanai (SC)">Thirubhuvanai (SC)</option>
                    <option value="Ossudu (SC)">Ossudu (SC)</option>
                    <option value="Mangalam">Mangalam</option>
                    <option value="Villianur">Villianur</option>
                    <option value="Ozhukarai">Ozhukarai</option>
                    <option value="Kadirgamam">Kadirgamam</option>
                    <option value="Indira Nagar">Indira Nagar</option>
                    <option value="Thattanchavady">Thattanchavady</option>
                    <option value="Kamaraj Nagar">Kamaraj Nagar</option>
                    <option value="Lawspet">Lawspet</option>
                    <option value="Kalapet">Kalapet</option>
                    <option value="Muthialpet">Muthialpet</option>
                    <option value="Raj Bhavan">Raj Bhavan</option>
                    <option value="Oupalam">Oupalam</option>
                    <option value="Orleampeth">Orleampeth</option>
                    <option value="Nellithope">Nellithope</option>
                    <option value="Mudaliarpet">Mudaliarpet</option>
                    <option value="Ariankuppam">Ariankuppam</option>
                    <option value="Manavely">Manavely</option>
                    <option value="Embalam (SC)">Embalam (SC)</option>
                    <option value="Nettapakkam (SC)">Nettapakkam (SC)</option>
                    <option value="Bahour">Bahour</option>
                    <option value="Nedungadu (SC)">Nedungadu (SC)</option>
                    <option value="Thirunallar">Thirunallar</option>
                    <option value="Karaikal North">Karaikal North</option>
                    <option value="Karaikal South">Karaikal South</option>
                    <option value="Neravy T.R.Pattinam">Neravy T.R.Pattinam</option>
                    <option value="Mahe">Mahe</option>
                    <option value="Yanam">Yanam</option>
                  </select>
                </label>
                <label className="raise-field">
                  <span>Area / Ward Name</span>
                  <input
                    type="text"
                    placeholder="Enter area or ward name"
                    disabled={!otpVerified}
                  />
                </label>
                <label className="raise-field">
                  <span>Street / Landmark</span>
                  <input
                    type="text"
                    placeholder="Enter street or landmark"
                    disabled={!otpVerified}
                  />
                </label>
              </div>

              <div className="raise-group">
                <h3>Field 3: The Issue</h3>
                <label className="raise-field select">
                  <span>Category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    disabled={!otpVerified}
                  >
                    <option value="">Select category</option>
                    <option value="Water Supply">Water Supply</option>
                    <option value="Sanitation/Garbage">Sanitation/Garbage</option>
                    <option value="Street Lights">Street Lights</option>
                    <option value="Roads/Potholes">Roads/Potholes</option>
                    <option value="Housing">Housing</option>
                    <option value="Pension/Welfare">Pension/Welfare</option>
                    <option value="Education">Education</option>
                    <option value="Police/Safety">Police/Safety</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {category === "Other" && (
                  <label className="raise-field">
                    <span>Describe Other Issue</span>
                    <input
                      type="text"
                      placeholder="Share the issue details"
                      value={otherIssue}
                      onChange={(event) => setOtherIssue(event.target.value)}
                      disabled={!otpVerified}
                    />
                  </label>
                )}
                <label className="raise-field">
                  <span>Description</span>
                  <textarea
                    placeholder="Please describe the issue in detail. How long has it been happening?"
                    rows={4}
                    disabled={!otpVerified}
                  />
                </label>
                <label className="raise-field">
                  <span>Evidence Upload</span>
                  <input type="file" disabled={!otpVerified} />
                  <small>Upload Photo/Video (Max 10MB)</small>
                  <em>A picture is worth a thousand words. Show us the problem.</em>
                </label>
              </div>

              <button className="raise-submit" type="submit" disabled={!otpVerified}>
                Submit Grievance
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
