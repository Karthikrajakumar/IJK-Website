import React, { useContext, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";


// import cardTemplate from "../assets/membership.jpg";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const leaderPortrait = "https://res.cloudinary.com/dot0wbsfv/image/upload/v1771225784/group5_puelbi.png";


const translations = {
  English: en,
  Tamil: ta,
};

export const MembershipPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const membership = t.membershipPage || {};

  const [mobile, setMobile] = useState("");
  // const [generating, setGenerating] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    constituency: "",
    boothNumber: "",
    voterId: "",
    district: "",
    address: "",
    commitment: "",
    photoPreview: null,
  });

  // API Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setFormErrors((prev) => ({ ...prev, photo: membership.photoErrorSize }));
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({ ...prev, photo: membership.photoErrorType }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({ ...prev, photoPreview: ev.target.result }));
      setFormErrors((prev) => ({ ...prev, photo: "" }));
    };
    reader.readAsDataURL(file);
  };

  // Age calculator from DOB
  const calcAge = (dob) => {
    if (!dob) return "—";
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return String(age);
  };

  // Validate all required fields
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = membership.validationName;
    if (!mobile.trim()) errors.mobile = membership.validationMobile;
    if (!formData.dob) errors.dob = membership.validationDob;
    if (!formData.gender) errors.gender = membership.validationGender;
    if (!formData.email.trim()) errors.email = membership.validationEmail;
    if (!formData.photoPreview) errors.photo = membership.validationPhoto;
    if (!formData.constituency) errors.constituency = membership.validationConstituency;
    if (!formData.boothNumber.trim()) errors.boothNumber = membership.validationBoothNumber;
    if (!formData.voterId.trim()) errors.voterId = membership.validationVoterId;
    if (!formData.commitment) errors.commitment = membership.validationCommitment;
    return errors;
  };

  // Submit membership to backend
const submitMembership = async () => {
  const errors = validate();

  console.log("Submitting membership with data:", {
    name: formData.name,
    email: formData.email,
    mobileNumber: mobile,
    constituency: formData.constituency,
    district: formData.district || formData.constituency,
    address: formData.address,
    age: calcAge(formData.dob),
    voterId: formData.voterId,
    gender: formData.gender,
    boothNumber: formData.boothNumber,
    commitment: formData.commitment,
  });

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    const firstErrorKey = Object.keys(errors)[0];
    const el = document.getElementById(`field-${firstErrorKey}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return null;
  }

  setFormErrors({});
  setSubmitting(true);

  try {
    const url = `${API_BASE_URL}/membership/register`;
    console.log("API URL:", url);
    console.log("Calling API:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        mobileNumber: mobile,
        constituency: formData.constituency,
        district: formData.district || formData.constituency,
        address: formData.address,
        otp: true,
        age: parseInt(calcAge(formData.dob)),
        voterId: formData.voterId,
        photo: formData.photoPreview, // can set null for testing
        gender: formData.gender,
        boothNumber: formData.boothNumber,
        commitment: formData.commitment,
        dob: formData.dob,
      }),
    });

    console.log("Response status:", response.status);

    // Read raw text first
    const rawText = await response.text();
    console.log("Raw response:", rawText);

    // Try parse JSON safely
    let data = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch (e) {
      console.error("JSON parse failed");
    }

    console.log("Parsed data:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Server error");
    }

    if (!data || !data.membershipId) {
      throw new Error("membershipId missing in backend response");
    }

    return data.membershipId;
  } catch (error) {
    console.error("Membership submission error:", error);
    alert(error.message || "Submission failed");
    return null;
  } finally {
    setSubmitting(false);
  }
};


  // Dynamically load jsPDF
  // const loadScript = (src) =>
  //   new Promise((resolve, reject) => {
  //     if (document.querySelector(`script[src="${src}"]`)) {
  //       resolve();
  //       return;
  //     }
  //     const s = document.createElement("script");
  //     s.src = src;
  //     s.onload = resolve;
  //     s.onerror = reject;
  //     document.head.appendChild(s);
  //   });

  // Generate PDF membership card
  // const generateMembershipCard = async (membershipId) => {
  //   setGenerating(true);

  //   try {
  //     await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

  //     const CW = 1400;
  //     const CH = 900;
  //     const canvas = document.createElement("canvas");
  //     canvas.width = CW;
  //     canvas.height = CH;
  //     const ctx = canvas.getContext("2d");

  //     // 1. Draw card template background
  //     await new Promise((resolve, reject) => {
  //       const bg = new Image();
  //       bg.src = cardTemplate;
  //       bg.onload = () => {
  //         ctx.drawImage(bg, 0, 0, CW, CH);
  //         resolve();
  //       };
  //       bg.onerror = reject;
  //     });

  //     // 2. Draw member photo into the black box
  //     const PHOTO_X = 90;
  //     const PHOTO_Y = 270;
  //     const PHOTO_W = 235;
  //     const PHOTO_H = 325;

  //     if (formData.photoPreview) {
  //       await new Promise((resolve) => {
  //         const img = new Image();
  //         img.src = formData.photoPreview;
  //         img.onload = () => {
  //           ctx.save();
  //           ctx.beginPath();
  //           ctx.rect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
  //           ctx.clip();
  //           const scale = Math.max(PHOTO_W / img.width, PHOTO_H / img.height);
  //           const dw = img.width * scale;
  //           const dh = img.height * scale;
  //           ctx.drawImage(
  //             img,
  //             PHOTO_X + (PHOTO_W - dw) / 2,
  //             PHOTO_Y + (PHOTO_H - dh) / 2,
  //             dw,
  //             dh
  //           );
  //           ctx.restore();
  //           resolve();
  //         };
  //       });
  //     }

  //     // 3. Write values after the colons
  //     ctx.font = "bold 34px Arial";
  //     ctx.fillStyle = "#0d2f6e";

  //     const VALUE_X = 660;
  //     const fields = [
  //       { value: formData.name, y: 350 },
  //       { value: formData.constituency, y: 424 },
  //       { value: formData.boothNumber, y: 488 },
  //       { value: calcAge(formData.dob), y: 555 },
  //       {
  //         value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
  //         y: 607,
  //       },
  //     ];

  //     fields.forEach(({ value, y }) => ctx.fillText(value, VALUE_X, y));

  //     // Add membership ID to the card if you want
  //     if (membershipId) {
  //       ctx.font = "bold 28px Arial";
  //       ctx.fillText(`ID: ${membershipId}`, VALUE_X, 680);
  //     }

  //     // 4. Export as PDF and trigger download
  //     const { jsPDF } = window.jspdf;
  //     const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a5" });
  //     const imgData = canvas.toDataURL("image/jpeg", 1.0);
  //     pdf.addImage(imgData, "JPEG", 0, 0, 210, 148);
  //     pdf.save(`LJK_Membership_${formData.name}_${membershipId || ""}.pdf`);

  //     alert(membership.alertSuccess);
  //   } catch (err) {
  //     console.error("Card generation failed:", err);
  //     alert(membership.alertFailure);
  //   } finally {
  //     setGenerating(false);
  //   }
  // };

  // Handle complete submission flow
  const handleSubmit = async () => {
  console.log("Submit clicked");
  const membershipId = await submitMembership();
  console.log("Received membership ID:", membershipId);
};

  // Helper: field error message
  const FieldError = ({ name }) =>
    formErrors[name] ? (
      <span className="raise-field-error">{formErrors[name]}</span>
    ) : null;

  return (
    <>
      <Navbar />
      <main className="membership-page">
        {/* Hero */}
        <section className="membership-hero" aria-labelledby="membership-title">
          <Container className="membership-hero-inner">
            <div className="membership-hero-media">
              <div className="membership-hero-brush" aria-hidden="true" />
              <img src={leaderPortrait} alt={membership.heroImageAlt} />
            </div>
            <div className="membership-hero-text">
              <h1 id="membership-title">{membership.heroTitle}</h1>
              <p>{membership.heroDescription}</p>
              <div className="membership-hero-note">
                <p>{membership.heroNote}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Form */}
        <section className="membership-form-section" aria-labelledby="membership-form-title">
          <Container>
            <div className="membership-form-header">
              <h2 id="membership-form-title">{membership.formTitle}</h2>
              <p>{membership.formSubtitle}</p>
            </div>

            <form className="raise-form" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <label className="raise-field" id="field-name">
                <span>
                  {membership.nameLabel} <span className="required-star">*</span>
                </span>
                <input
                  type="text"
                  placeholder={membership.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, name: e.target.value }));
                    setFormErrors((p) => ({ ...p, name: "" }));
                  }}
                  className={formErrors.name ? "input-error" : ""}
                />
                <FieldError name="name" />
              </label>

              {/* Mobile */}
              <label className="raise-field" id="field-mobile">
                <span>
                  {membership.mobileLabel} <span className="required-star">*</span>
                </span>
                <input
                  type="tel"
                  placeholder={membership.mobilePlaceholder}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setFormErrors((p) => ({ ...p, mobile: "" }));
                  }}
                  className={formErrors.mobile ? "input-error" : ""}
                />
                <FieldError name="mobile" />
              </label>

              {/* Date of Birth */}
              <label className="raise-field" id="field-dob">
                <span>
                  {membership.dobLabel} <span className="required-star">*</span>
                </span>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, dob: e.target.value }));
                    setFormErrors((p) => ({ ...p, dob: "" }));
                  }}
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  className={formErrors.dob ? "input-error" : ""}
                />
                {formData.dob && (
                  <small>
                    {membership.dobAgeLabel} {calcAge(formData.dob)} years
                  </small>
                )}
                <FieldError name="dob" />
              </label>

              {/* Gender */}
              <fieldset className="raise-field gender" id="field-gender">
                <span>
                  {membership.genderLabel} <span className="required-star">*</span>
                </span>
                <div className="gender-options">
                  {["female", "male", "other"].map((g, index) => (
                    <label key={g}>
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, gender: e.target.value }));
                          setFormErrors((p) => ({ ...p, gender: "" }));
                        }}
                      />
                      {" "}
                      {membership.genderOptions[index]}
                    </label>
                  ))}
                </div>
                <FieldError name="gender" />
              </fieldset>

              {/* Email + Photo */}
              <div className="raise-field split">
                <label className="raise-field" id="field-email">
                  <span>
                    {membership.emailLabel} <span className="required-star">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder={membership.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, email: e.target.value }));
                      setFormErrors((p) => ({ ...p, email: "" }));
                    }}
                    className={formErrors.email ? "input-error" : ""}
                  />
                  <FieldError name="email" />
                </label>
                <label className="raise-field" id="field-photo">
                  <span>
                    {membership.photoLabel} <span className="required-star">*</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={formErrors.photo ? "input-error" : ""}
                  />
                  <small>{membership.photoHint}</small>
                  {formData.photoPreview && (
                    <div style={{ marginTop: "8px" }}>
                      <img
                        src={formData.photoPreview}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  )}
                  <FieldError name="photo" />
                </label>
              </div>

              {/* Voter ID */}
              <label className="raise-field" id="field-voterId">
                <span>
                  {membership.voterIdLabel} <span className="required-star">*</span>
                </span>
                <input
                  type="text"
                  placeholder={membership.voterIdPlaceholder}
                  value={formData.voterId}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, voterId: e.target.value }));
                    setFormErrors((p) => ({ ...p, voterId: "" }));
                  }}
                  className={formErrors.voterId ? "input-error" : ""}
                />
                <FieldError name="voterId" />
              </label>

              {/* Constituency */}
              <label className="raise-field select" id="field-constituency">
                <span>
                  {membership.constituencyLabel} <span className="required-star">*</span>
                </span>
                <select
                  value={formData.constituency}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, constituency: e.target.value }));
                    setFormErrors((p) => ({ ...p, constituency: "" }));
                  }}
                  className={formErrors.constituency ? "input-error" : ""}
                >
                  <option value="">{membership.constituencyPlaceholder}</option>
                  {[
                    "Ariankuppam",
                    "Bahour",
                    "Embalam",
                    "Kalapet",
                    "Lawspet",
                    "Mannadipet",
                    "Nettapakkam",
                    "Ozhukarai",
                    "Thattanchavady",
                    "Villianur",
                    "Mudaliarpet",
                    "Muthialpet",
                    "Cassicade",
                    "Raj Bhavan",
                    "Reddiarpalayam",
                    "Thirubuvanai",
                    "Kuruvinatham",
                    "Kamaraj Nagar",
                    "Kirumampakkam",
                    "Neravy-TR-Pattinam",
                    "Oupalam",
                    "Puducherry North",
                    "Puducherry South",
                    "Karaikal North",
                    "Karaikal South",
                    "Karaikal East",
                    "Mahe",
                    "Yanam",
                    "Indira Nagar",
                    "Oulgaret",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <FieldError name="constituency" />
              </label>

              {/* District (Optional) */}
              <label className="raise-field" id="field-district">
                <span>{membership.districtLabel}</span>
                <input
                  type="text"
                  placeholder={membership.districtPlaceholder}
                  value={formData.district}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, district: e.target.value }));
                  }}
                />
              </label>

              {/* Address (Optional) */}
              <label className="raise-field" id="field-address">
                <span>{membership.addressLabel}</span>
                <textarea
                  placeholder={membership.addressPlaceholder}
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, address: e.target.value }));
                  }}
                  rows="3"
                />
              </label>

              {/* Booth Number */}
              <label className="raise-field" id="field-boothNumber">
                <span>
                  {membership.boothNumberLabel} <span className="required-star">*</span>
                </span>
                <input
                  type="text"
                  placeholder={membership.boothNumberPlaceholder}
                  value={formData.boothNumber}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, boothNumber: e.target.value }));
                    setFormErrors((p) => ({ ...p, boothNumber: "" }));
                  }}
                  className={formErrors.boothNumber ? "input-error" : ""}
                />
                <FieldError name="boothNumber" />
              </label>

              {/* Commitment Level */}
              <label className="raise-field select" id="field-commitment">
                <span>
                  {membership.commitmentLabel} <span className="required-star">*</span>
                </span>
                <select
                  value={formData.commitment}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, commitment: e.target.value }));
                    setFormErrors((p) => ({ ...p, commitment: "" }));
                  }}
                  className={formErrors.commitment ? "input-error" : ""}
                >
                  <option value="">{membership.commitmentPlaceholder}</option>
                  {membership.commitmentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FieldError name="commitment" />
              </label>

              {/* Submit */}
              <button
                className="raise-action raise-otp-button"
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting
                  ? membership.submitRegistering
                  : membership.submitDefault}
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
