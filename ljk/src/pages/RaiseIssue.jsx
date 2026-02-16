import React, { useContext, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";

import { submitGrievanceAPI } from "../pages/Api";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const leaderFlag = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1770801229/leader-with-flag_vw75ol.png";



const translations = {
  English: en,
  Tamil: ta,
};

export const RaiseIssuePage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const raise = t.raiseIssuePage || {};

  const [category, setCategory] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [mobile, setMobile] = useState("");

  // Form fields
  const [fullName, setFullName] = useState("");
  const [constituency, setConstituency] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceFile, setEvidenceFile] = useState(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError(raise.fileTooLarge);
        event.target.value = "";
        return;
      }
      setEvidenceFile(file);
      setSubmitError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset states
    setSubmitError("");
    setSubmitSuccess(false);

    // Validation
    if (!fullName || !mobile || !constituency || !area || !street || !category || !description) {
      setSubmitError(raise.validationRequiredFields);
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData object
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("mobileNumber", mobile);
      formData.append("constituency", constituency);
      formData.append("area", area);
      formData.append("street", street);
      formData.append("category", category === "Other" ? otherIssue : category);
      formData.append("description", description);
      formData.append("otp", "true");

      // Append file if exists
      if (evidenceFile) {
        formData.append("files", evidenceFile);
      }

      // Submit to backend
      const response = await submitGrievanceAPI(formData);
      console.log("Grievance submitted successfully:", response);

      // Success!
      setSubmitSuccess(true);
      setTrackingId(response.trackingId);
      console.log("Tracking ID:", response.trackingId);

      // Reset form
      setFullName("");
      setMobile("");
      setConstituency("");
      setArea("");
      setStreet("");
      setCategory("");
      setDescription("");
      setOtherIssue("");
      setEvidenceFile(null);

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setSubmitError(error.message || "Failed to submit grievance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="raise-issue-page">
        <section className="raise-hero" aria-labelledby="raise-issue-title">
          <Container className="raise-hero-inner">
            <div className="raise-hero-text">
              <h1 id="raise-issue-title">{raise.heroTitle}</h1>
              <p>{raise.heroDescription}</p>
            </div>
            <div className="raise-hero-media">
              <div className="raise-hero-glow" aria-hidden="true" />
              <img src={leaderFlag} alt={raise.heroImageAlt} />
            </div>
          </Container>
        </section>

        <section className="raise-form-section" aria-labelledby="raise-form-title">
          <Container>
            <div className="raise-form-header">
              <h2 id="raise-form-title">{raise.formTitle}</h2>
              <p>{raise.formSubtitle}</p>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="raise-success-message">
                <h3>{raise.successTitle}</h3>
                <p>
                  {raise.successTrackingPrefix} <strong>{trackingId}</strong>
                </p>
                <p>{raise.successNote}</p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="raise-error-message">
                <p>{raise.errorPrefix} {submitError}</p>
              </div>
            )}

            <form className="raise-form" onSubmit={handleSubmit}>
              <div className="raise-group">
                <h3>{raise.sectionPersonal}</h3>
                <label className="raise-field">
                  <span>{raise.fullNameLabel}</span>
                  <input
                    type="text"
                    placeholder={raise.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>{raise.mobileLabel}</span>
                  <input
                    type="tel"
                    placeholder={raise.mobilePlaceholder}
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                  />
                  
                </label>
              </div>

              <div className="raise-group">
                <h3>{raise.sectionLocation}</h3>
                <label className="raise-field select compact">
                  <span>{raise.constituencyLabel}</span>
                  <select
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      {raise.constituencyPlaceholder}
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
                  <span>{raise.areaLabel}</span>
                  <input
                    type="text"
                    placeholder={raise.areaPlaceholder}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>{raise.streetLabel}</span>
                  <input
                    type="text"
                    placeholder={raise.streetPlaceholder}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="raise-group">
                <h3>{raise.sectionIssue}</h3>
                <label className="raise-field select">
                  <span>{raise.issueCategoryLabel}</span>
                  <input
                    type="text"
                    placeholder={raise.issueCategoryPlaceholder}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </label>
                {category === "Other" && (
                  <label className="raise-field">
                    <span>{raise.otherIssueLabel}</span>
                    <input
                      type="text"
                      placeholder={raise.otherIssuePlaceholder}
                      value={otherIssue}
                      onChange={(event) => setOtherIssue(event.target.value)}
                      required
                    />
                  </label>
                )}
                <label className="raise-field">
                  <span>{raise.descriptionLabel}</span>
                  <textarea
                    placeholder={raise.descriptionPlaceholder}
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>{raise.evidenceLabel}</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                  />
                  <small>{raise.evidenceHint}</small>
                  <em>{raise.evidenceNote}</em>
                </label>
              </div>

              <button
                className="raise-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? raise.submitButtonLoading : raise.submitButton}
              </button>
              {submitSuccess && (
                <p className="raise-inline-success" role="status">
                  Grievance Submitted Successfully
                </p>
              )}
              {submitError && (
                <p className="raise-inline-error" role="alert">
                  failed to fetch
                </p>
              )}
            </form>
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
