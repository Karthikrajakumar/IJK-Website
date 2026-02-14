
// import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { Container } from "../components/Container";
// import { Box } from "../components/Box";
// import leaderPortrait from "../assets/group5.png"
// import cardTemplate from "../assets/membership.jpg";

// export const MembershipPage = () => {
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [mobile, setMobile] = useState("");
//   const [otpStatus, setOtpStatus] = useState("idle");
//   const [otpError, setOtpError] = useState("");
//   const [generating, setGenerating] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     gender: "",
//     email: "",
//     constituency: "",
//     boothNumber: "",
//     commitment: "",
//     photoPreview: null,
//   });

//   // ── Load MSG91 OTP script ──────────────────────────────────────────────────
//   useEffect(() => {
//     if (window.initSendOTP || customElements.get("h-captcha")) return;
//     const scriptUrls = [
//       "https://verify.msg91.com/otp-provider.js",
//       "https://verify.phone91.com/otp-provider.js",
//     ];
//     let index = 0;
//     const attemptLoad = () => {
//       if (index >= scriptUrls.length) return;
//       if (document.querySelector(`script[src="${scriptUrls[index]}"]`)) return;
//       const script = document.createElement("script");
//       script.src = scriptUrls[index];
//       script.async = true;
//       script.onerror = () => { index += 1; attemptLoad(); };
//       document.head.appendChild(script);
//     };
//     attemptLoad();
//   }, []);

//   // ── OTP ────────────────────────────────────────────────────────────────────
//   const sendOtp = () => {
//     setOtpError("");
//     setOtpVerified(false);
//     const trimmed = mobile.replace(/\D/g, "");
//     if (!trimmed || trimmed.length !== 10) {
//       setOtpError("Enter a valid 10-digit mobile number.");
//       setOtpStatus("error");
//       return;
//     }
//     if (typeof window.initSendOTP !== "function") {
//       setOtpError("OTP service is not available right now. Please try again.");
//       setOtpStatus("error");
//       return;
//     }
//     setOtpStatus("sending");
//     window.initSendOTP({
//       widgetId: "36626a67706c333432373235",
//       tokenAuth: "493421TbeXBwrq3J698add0fP1",
//       identifier: `91${trimmed}`,
//       success: () => { setOtpVerified(true); setOtpStatus("verified"); },
//       failure: () => {
//         setOtpVerified(false);
//         setOtpStatus("error");
//         setOtpError("OTP verification failed. Please try again.");
//       },
//     });
//   };

//   // ── Photo upload ───────────────────────────────────────────────────────────
//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setFormData((prev) => ({ ...prev, photoPreview: ev.target.result }));
//       setFormErrors((prev) => ({ ...prev, photo: "" }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // ── Age calculator from DOB ────────────────────────────────────────────────
//   const calcAge = (dob) => {
//     if (!dob) return "—";
//     const today = new Date();
//     const birth = new Date(dob);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return String(age);
//   };

//   // ── Validate all required fields ───────────────────────────────────────────
//   const validate = () => {
//     const errors = {};
//     if (!formData.name.trim())       errors.name         = "Name is required.";
//     if (!mobile.trim())              errors.mobile       = "Mobile number is required.";
//     if (!otpVerified)                errors.otp          = "Please verify your mobile number via OTP.";
//     if (!formData.dob)               errors.dob          = "Date of birth is required.";
//     if (!formData.gender)            errors.gender       = "Please select a gender.";
//     if (!formData.email.trim())      errors.email        = "Email is required.";
//     if (!formData.photoPreview)      errors.photo        = "Please upload a photo.";
//     if (!formData.constituency)      errors.constituency = "Please select a constituency.";
//     if (!formData.boothNumber.trim()) errors.boothNumber = "Booth number is required.";
//     if (!formData.commitment)        errors.commitment   = "Please select a commitment level.";
//     return errors;
//   };

//   // ── Dynamically load jsPDF ─────────────────────────────────────────────────
//   const loadScript = (src) =>
//     new Promise((resolve, reject) => {
//       if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
//       const s = document.createElement("script");
//       s.src = src;
//       s.onload = resolve;
//       s.onerror = reject;
//       document.head.appendChild(s);
//     });

//   // ── Generate PDF membership card ───────────────────────────────────────────
//   const generateMembershipCard = async () => {
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       // Scroll to first error
//       const firstErrorKey = Object.keys(errors)[0];
//       const el = document.getElementById(`field-${firstErrorKey}`);
//       if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
//       return;
//     }

//     setFormErrors({});
//     setGenerating(true);

//     try {
//       await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

//       const CW = 1400;
//       const CH = 900;
//       const canvas = document.createElement("canvas");
//       canvas.width = CW;
//       canvas.height = CH;
//       const ctx = canvas.getContext("2d");

//       // ── 1. Draw card template background ──────────────────────────────────
//       await new Promise((resolve, reject) => {
//         const bg = new Image();
//         bg.src = cardTemplate;
//         bg.onload = () => { ctx.drawImage(bg, 0, 0, CW, CH); resolve(); };
//         bg.onerror = reject;
//       });

//       // ── 2. Draw member photo into the black box ────────────────────────────
//       const PHOTO_X = 90;
//       const PHOTO_Y = 270;
//       const PHOTO_W = 235;
//       const PHOTO_H = 325;

//       if (formData.photoPreview) {
//         await new Promise((resolve) => {
//           const img = new Image();
//           img.src = formData.photoPreview;
//           img.onload = () => {
//             ctx.save();
//             ctx.beginPath();
//             ctx.rect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
//             ctx.clip();
//             const scale = Math.max(PHOTO_W / img.width, PHOTO_H / img.height);
//             const dw = img.width * scale;
//             const dh = img.height * scale;
//             ctx.drawImage(
//               img,
//               PHOTO_X + (PHOTO_W - dw) / 2,
//               PHOTO_Y + (PHOTO_H - dh) / 2,
//               dw,
//               dh
//             );
//             ctx.restore();
//             resolve();
//           };
//         });
//       }

//       // ── 3. Write values after the colons ──────────────────────────────────
//       ctx.font      = "bold 34px Arial";
//       ctx.fillStyle = "#0d2f6e";

//       const VALUE_X = 660;
//       const fields = [
//         { value: formData.name,                                           y: 350 },
//         { value: formData.constituency,                                   y: 424 },
//         { value: formData.boothNumber,                                    y: 488 },
//         { value: calcAge(formData.dob),                                   y: 555 },
//         {
//           value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
//           y: 607,
//         },
//       ];

//       fields.forEach(({ value, y }) => ctx.fillText(value, VALUE_X, y));

//       // ── 4. Export as PDF and trigger download ──────────────────────────────
//       const { jsPDF } = window.jspdf;
//       const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a5" });
//       const imgData = canvas.toDataURL("image/jpeg", 1.0);
//       pdf.addImage(imgData, "JPEG", 0, 0, 210, 148);
//       pdf.save(`LJK_Membership_${formData.name}.pdf`);

//     } catch (err) {
//       console.error("Card generation failed:", err);
//       alert("Failed to generate membership card. Please try again.");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   // ── Helper: field error message ────────────────────────────────────────────
//   const FieldError = ({ name }) =>
//     formErrors[name] ? (
//       <span className="raise-field-error">{formErrors[name]}</span>
//     ) : null;

//   return (
//     <>
//       <Navbar />
//       <main className="membership-page">

//         {/* ── Hero ──────────────────────────────────────────────────────────── */}
//         <section className="membership-hero" aria-labelledby="membership-title">
//           <Container className="membership-hero-inner">
//             <div className="membership-hero-media">
//               <div className="membership-hero-brush" aria-hidden="true" />
//               <img src={leaderPortrait} alt="Leader of LJK" />
//             </div>
//             <div className="membership-hero-text">
//               <h1 id="membership-title">Be The Change You Want To See</h1>
//               <p>
//                 Politics is not a spectator sport. Join the Latchiya Jananayaga Party (LJK) today
//                 and help us build the Puducherry of tomorrow.
//               </p>
//               <div className="membership-hero-note">
//                 <p>
//                   Be a decision maker. Don&apos;t just vote every 5 years. As a member, you shape
//                   our policies and choose our candidates. Identity &amp; Pride. Receive an official
//                   digital membership ID card immediately upon registration.
//                 </p>
//               </div>
//             </div>
//           </Container>
//         </section>

//         {/* ── Form ──────────────────────────────────────────────────────────── */}
//         <section className="membership-form-section" aria-labelledby="membership-form-title">
//           <Container>
//             <div className="membership-form-header">
//               <h2 id="membership-form-title">The Membership Form</h2>
//               <p>Official Membership Registration</p>
//             </div>

//             <form className="raise-form" onSubmit={(e) => e.preventDefault()}>

//               {/* Name */}
//               <label className="raise-field" id="field-name">
//                 <span>Name <span className="required-star">*</span></span>
//                 <input
//                   type="text"
//                   placeholder="Enter your Name (as per Voter ID)"
//                   value={formData.name}
//                   onChange={(e) => {
//                     setFormData((p) => ({ ...p, name: e.target.value }));
//                     setFormErrors((p) => ({ ...p, name: "" }));
//                   }}
//                   className={formErrors.name ? "input-error" : ""}
//                 />
//                 <FieldError name="name" />
//               </label>

//               {/* Mobile */}
//               <label className="raise-field" id="field-mobile">
//                 <span>Mobile Number <span className="required-star">*</span></span>
//                 <input
//                   type="tel"
//                   placeholder="Enter your mobile number"
//                   value={mobile}
//                   onChange={(e) => {
//                     setMobile(e.target.value);
//                     setFormErrors((p) => ({ ...p, mobile: "" }));
//                   }}
//                   className={formErrors.mobile ? "input-error" : ""}
//                 />
//                 <FieldError name="mobile" />
//               </label>

//               {/* OTP */}
//               <div className="raise-otp" id="field-otp">
//                 <button
//                   type="button"
//                   className="raise-otp-button"
//                   onClick={sendOtp}
//                   disabled={otpStatus === "sending"}
//                 >
//                   {otpStatus === "sending" ? "Sending..." : "Send OTP"}

                
//                 </button>
//                 <span className={`raise-otp-status ${otpVerified ? "is-verified" : ""}`}>
//                   <span className="otp-indicator" aria-hidden="true" />
//                   {otpVerified ? "OTP verified" : "OTP not verified"}
//                 </span>
//               </div>
//               {otpError && <p className="raise-otp-error">{otpError}</p>}
//               <FieldError name="otp" />

//               {/* Date of Birth */}
//               <label className="raise-field" id="field-dob">
//                 <span>Date of Birth <span className="required-star">*</span></span>
//                 <input
//                   type="date"
//                   value={formData.dob}
//                   onChange={(e) => {
//                     setFormData((p) => ({ ...p, dob: e.target.value }));
//                     setFormErrors((p) => ({ ...p, dob: "" }));
//                   }}
//                   onClick={(e) => e.currentTarget.showPicker?.()}
//                   className={formErrors.dob ? "input-error" : ""}
//                 />
//                 {formData.dob && (
//                   <small>Age: {calcAge(formData.dob)} years</small>
//                 )}
//                 <FieldError name="dob" />
//               </label>

//               {/* Gender */}
//               <fieldset className="raise-field gender" id="field-gender">
//                 <span>Gender <span className="required-star">*</span></span>
//                 <div className="gender-options">
//                   {["female", "male", "other"].map((g) => (
//                     <label key={g}>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value={g}
//                         checked={formData.gender === g}
//                         onChange={(e) => {
//                           setFormData((p) => ({ ...p, gender: e.target.value }));
//                           setFormErrors((p) => ({ ...p, gender: "" }));
//                         }}
//                       />
//                       {" "}{g.charAt(0).toUpperCase() + g.slice(1)}
//                     </label>
//                   ))}
//                 </div>
//                 <FieldError name="gender" />
//               </fieldset>

//               {/* Email + Photo */}
//               <div className="raise-field split">
//                 <label className="raise-field" id="field-email">
//                   <span>Email <span className="required-star">*</span></span>
//                   <input
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={formData.email}
//                     onChange={(e) => {
//                       setFormData((p) => ({ ...p, email: e.target.value }));
//                       setFormErrors((p) => ({ ...p, email: "" }));
//                     }}
//                     className={formErrors.email ? "input-error" : ""}
//                   />
//                   <FieldError name="email" />
//                 </label>
//                 <label className="raise-field" id="field-photo">
//                   <span>Photo <span className="required-star">*</span></span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className={formErrors.photo ? "input-error" : ""}
//                   />
//                   <small>Upload photo (Max 10MB)</small>
//                   <FieldError name="photo" />
//                 </label>
//               </div>

//               {/* Constituency */}
//               <label className="raise-field select" id="field-constituency">
//                 <span>Constituency <span className="required-star">*</span></span>
//                 <select
//                   value={formData.constituency}
//                   onChange={(e) => {
//                     setFormData((p) => ({ ...p, constituency: e.target.value }));
//                     setFormErrors((p) => ({ ...p, constituency: "" }));
//                   }}
//                   className={formErrors.constituency ? "input-error" : ""}
//                 >
//                   <option value="">Select your Constituency</option>
//                   {[
//                     "Ariankuppam", "Bahour", "Embalam", "Kalapet", "Lawspet",
//                     "Mannadipet", "Nettapakkam", "Ozhukarai", "Thattanchavady",
//                     "Villianur", "Mudaliarpet", "Muthialpet", "Cassicade",
//                     "Raj Bhavan", "Reddiarpalayam", "Thirubuvanai", "Kuruvinatham",
//                     "Kamaraj Nagar", "Kirumampakkam", "Neravy-TR-Pattinam",
//                     "Oupalam", "Puducherry North", "Puducherry South",
//                     "Karaikal North", "Karaikal South", "Karaikal East",
//                     "Mahe", "Yanam", "Indira Nagar", "Oulgaret",
//                   ].map((c) => <option key={c} value={c}>{c}</option>)}
//                 </select>
//                 <FieldError name="constituency" />
//               </label>

//               {/* Booth Number */}
//               <label className="raise-field" id="field-boothNumber">
//                 <span>Booth Number <span className="required-star">*</span></span>
//                 <input
//                   type="text"
//                   placeholder="Enter your booth number"
//                   value={formData.boothNumber}
//                   onChange={(e) => {
//                     setFormData((p) => ({ ...p, boothNumber: e.target.value }));
//                     setFormErrors((p) => ({ ...p, boothNumber: "" }));
//                   }}
//                   className={formErrors.boothNumber ? "input-error" : ""}
//                 />
//                 <FieldError name="boothNumber" />
//               </label>

//               {/* Commitment Level */}
//               <label className="raise-field select" id="field-commitment">
//                 <span>Commitment Level <span className="required-star">*</span></span>
//                 <select
//                   value={formData.commitment}
//                   onChange={(e) => {
//                     setFormData((p) => ({ ...p, commitment: e.target.value }));
//                     setFormErrors((p) => ({ ...p, commitment: "" }));
//                   }}
//                   className={formErrors.commitment ? "input-error" : ""}
//                 >
//                   <option value="">Select your Commitment Level</option>
//                   <option>Just be a supporter.</option>
//                   <option>Volunteer for events.</option>
//                   <option>Work on social media campaigns.</option>
//                   <option>Run for a party position</option>
//                 </select>
//                 <FieldError name="commitment" />
//               </label>

//               {/* Submit */}
//               <button
//                 className="raise-action raise-otp-button"
//                 type="button"
//                 onClick={generateMembershipCard}
//                 disabled={generating}
//               >
//                 {generating ? "GENERATING..." : "GENERATE MY MEMBERSHIP CARD"}
//               </button>

//             </form>
//           </Container>
//         </section>

//       </main>
//       <Box />
//       <Footer />
//     </>
//   );
// };


import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import leaderPortrait from "../assets/group5.png"
import cardTemplate from "../assets/membership.jpg";

export const MembershipPage = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otpStatus, setOtpStatus] = useState("idle");
  const [otpError, setOtpError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    constituency: "",
    boothNumber: "",
    voterId: "",        // Added
    district: "",       // Added
    address: "",        // Added
    commitment: "",
    photoPreview: null,
  });

  // ── API Configuration ──────────────────────────────────────────────────────
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // ── Load MSG91 OTP script ──────────────────────────────────────────────────
  useEffect(() => {
    if (window.initSendOTP || customElements.get("h-captcha")) return;
    const scriptUrls = [
      "https://verify.msg91.com/otp-provider.js",
      "https://verify.phone91.com/otp-provider.js",
    ];
    let index = 0;
    const attemptLoad = () => {
      if (index >= scriptUrls.length) return;
      if (document.querySelector(`script[src="${scriptUrls[index]}"]`)) return;
      const script = document.createElement("script");
      script.src = scriptUrls[index];
      script.async = true;
      script.onerror = () => { index += 1; attemptLoad(); };
      document.head.appendChild(script);
    };
    attemptLoad();
  }, []);

  // ── OTP ────────────────────────────────────────────────────────────────────
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
    window.initSendOTP({
      widgetId: "36626a67706c333432373235",
      tokenAuth: "493421TbeXBwrq3J698add0fP1",
      identifier: `91${trimmed}`,
      success: () => { setOtpVerified(true); setOtpStatus("verified"); },
      failure: () => {
        setOtpVerified(false);
        setOtpStatus("error");
        setOtpError("OTP verification failed. Please try again.");
      },
    });
  };

  // ── Photo upload ───────────────────────────────────────────────────────────
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setFormErrors((prev) => ({ ...prev, photo: "Photo size must be less than 10MB" }));
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({ ...prev, photo: "Please upload a valid image (JPG, PNG, or WebP)" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({ ...prev, photoPreview: ev.target.result }));
      setFormErrors((prev) => ({ ...prev, photo: "" }));
    };
    reader.readAsDataURL(file);
  };

  // ── Age calculator from DOB ────────────────────────────────────────────────
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

  // ── Validate all required fields ───────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!formData.name.trim())       errors.name         = "Name is required.";
    if (!mobile.trim())              errors.mobile       = "Mobile number is required.";
    if (!otpVerified)                errors.otp          = "Please verify your mobile number via OTP.";
    if (!formData.dob)               errors.dob          = "Date of birth is required.";
    if (!formData.gender)            errors.gender       = "Please select a gender.";
    if (!formData.email.trim())      errors.email        = "Email is required.";
    if (!formData.photoPreview)      errors.photo        = "Please upload a photo.";
    if (!formData.constituency)      errors.constituency = "Please select a constituency.";
    if (!formData.boothNumber.trim()) errors.boothNumber = "Booth number is required.";
    if (!formData.voterId.trim())    errors.voterId      = "Voter ID is required.";
    if (!formData.commitment)        errors.commitment   = "Please select a commitment level.";
    return errors;
  };

  // ── Submit membership to backend ───────────────────────────────────────────
  const submitMembership = async () => {
    const errors = validate();
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
      const response = await fetch(`${API_BASE_URL}/membership/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobileNumber: mobile,
          constituency: formData.constituency,
          district: formData.district || formData.constituency, // Use constituency if district not provided
          address: formData.address,
          otp: otpVerified, // Send boolean
          age: parseInt(calcAge(formData.dob)),
          voterId: formData.voterId,
          photo: formData.photoPreview, // Send base64 photo to backend
          // Additional fields
          gender: formData.gender,
          boothNumber: formData.boothNumber,
          commitment: formData.commitment,
          dob: formData.dob,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Return membershipId for PDF generation
      return data.membershipId;

    } catch (error) {
      console.error("Membership submission error:", error);
      alert(error.message || "Failed to register membership. Please try again.");
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  // ── Dynamically load jsPDF ─────────────────────────────────────────────────
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

  // ── Generate PDF membership card ───────────────────────────────────────────
  const generateMembershipCard = async (membershipId) => {
    setGenerating(true);

    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      const CW = 1400;
      const CH = 900;
      const canvas = document.createElement("canvas");
      canvas.width = CW;
      canvas.height = CH;
      const ctx = canvas.getContext("2d");

      // ── 1. Draw card template background ──────────────────────────────────
      await new Promise((resolve, reject) => {
        const bg = new Image();
        bg.src = cardTemplate;
        bg.onload = () => { ctx.drawImage(bg, 0, 0, CW, CH); resolve(); };
        bg.onerror = reject;
      });

      // ── 2. Draw member photo into the black box ────────────────────────────
      const PHOTO_X = 90;
      const PHOTO_Y = 270;
      const PHOTO_W = 235;
      const PHOTO_H = 325;

      if (formData.photoPreview) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = formData.photoPreview;
          img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.rect(PHOTO_X, PHOTO_Y, PHOTO_W, PHOTO_H);
            ctx.clip();
            const scale = Math.max(PHOTO_W / img.width, PHOTO_H / img.height);
            const dw = img.width * scale;
            const dh = img.height * scale;
            ctx.drawImage(
              img,
              PHOTO_X + (PHOTO_W - dw) / 2,
              PHOTO_Y + (PHOTO_H - dh) / 2,
              dw,
              dh
            );
            ctx.restore();
            resolve();
          };
        });
      }

      // ── 3. Write values after the colons ──────────────────────────────────
      ctx.font      = "bold 34px Arial";
      ctx.fillStyle = "#0d2f6e";

      const VALUE_X = 660;
      const fields = [
        { value: formData.name,                                           y: 350 },
        { value: formData.constituency,                                   y: 424 },
        { value: formData.boothNumber,                                    y: 488 },
        { value: calcAge(formData.dob),                                   y: 555 },
        {
          value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
          y: 607,
        },
      ];

      fields.forEach(({ value, y }) => ctx.fillText(value, VALUE_X, y));

      // Add membership ID to the card if you want
      if (membershipId) {
        ctx.font = "bold 28px Arial";
        ctx.fillText(`ID: ${membershipId}`, VALUE_X, 680);
      }

      // ── 4. Export as PDF and trigger download ──────────────────────────────
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a5" });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 148);
      pdf.save(`LJK_Membership_${formData.name}_${membershipId || ""}.pdf`);

      alert("Membership registered successfully! Your card has been downloaded.");

    } catch (err) {
      console.error("Card generation failed:", err);
      alert("Membership registered, but card generation failed. Please contact support.");
    } finally {
      setGenerating(false);
    }
  };
  

  // ── Handle complete submission flow ────────────────────────────────────────
  const handleSubmit = async () => {
    // First submit to backend
    const membershipId = await submitMembership();
    
    // If successful, generate PDF card
    if (membershipId) {
      await generateMembershipCard(membershipId);
    }
  };

  // ── Helper: field error message ────────────────────────────────────────────
  const FieldError = ({ name }) =>
    formErrors[name] ? (
      <span className="raise-field-error">{formErrors[name]}</span>
    ) : null;

  return (
    <>
      <Navbar />
      <main className="membership-page">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
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
                  Be a decision maker. Don&apos;t just vote every 5 years. As a member, you shape
                  our policies and choose our candidates. Identity &amp; Pride. Receive an official
                  digital membership ID card immediately upon registration.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Form ──────────────────────────────────────────────────────────── */}
        <section className="membership-form-section" aria-labelledby="membership-form-title">
          <Container>
            <div className="membership-form-header">
              <h2 id="membership-form-title">The Membership Form</h2>
              <p>Official Membership Registration</p>
            </div>

            <form className="raise-form" onSubmit={(e) => e.preventDefault()}>

              {/* Name */}
              <label className="raise-field" id="field-name">
                <span>Name <span className="required-star">*</span></span>
                <input
                  type="text"
                  placeholder="Enter your Name (as per Voter ID)"
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
                <span>Mobile Number <span className="required-star">*</span></span>
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setFormErrors((p) => ({ ...p, mobile: "" }));
                  }}
                  className={formErrors.mobile ? "input-error" : ""}
                />
                <FieldError name="mobile" />
              </label>

              {/* OTP */}
              <div className="raise-otp" id="field-otp">
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
              <FieldError name="otp" />

              {/* Date of Birth */}
              <label className="raise-field" id="field-dob">
                <span>Date of Birth <span className="required-star">*</span></span>
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
                  <small>Age: {calcAge(formData.dob)} years</small>
                )}
                <FieldError name="dob" />
              </label>

              {/* Gender */}
              <fieldset className="raise-field gender" id="field-gender">
                <span>Gender <span className="required-star">*</span></span>
                <div className="gender-options">
                  {["female", "male", "other"].map((g) => (
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
                      {" "}{g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
                <FieldError name="gender" />
              </fieldset>

              {/* Email + Photo */}
              <div className="raise-field split">
                <label className="raise-field" id="field-email">
                  <span>Email <span className="required-star">*</span></span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
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
                  <span>Photo <span className="required-star">*</span></span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={formErrors.photo ? "input-error" : ""}
                  />
                  <small>Upload photo (Max 10MB, JPG/PNG/WebP)</small>
                  {formData.photoPreview && (
                    <div style={{ marginTop: '8px' }}>
                      <img 
                        src={formData.photoPreview} 
                        alt="Preview" 
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }} 
                      />
                    </div>
                  )}
                  <FieldError name="photo" />
                </label>
              </div>

              {/* Voter ID */}
              <label className="raise-field" id="field-voterId">
                <span>Voter ID <span className="required-star">*</span></span>
                <input
                  type="text"
                  placeholder="Enter your Voter ID number"
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
                <span>Constituency <span className="required-star">*</span></span>
                <select
                  value={formData.constituency}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, constituency: e.target.value }));
                    setFormErrors((p) => ({ ...p, constituency: "" }));
                  }}
                  className={formErrors.constituency ? "input-error" : ""}
                >
                  <option value="">Select your Constituency</option>
                  {[
                    "Ariankuppam", "Bahour", "Embalam", "Kalapet", "Lawspet",
                    "Mannadipet", "Nettapakkam", "Ozhukarai", "Thattanchavady",
                    "Villianur", "Mudaliarpet", "Muthialpet", "Cassicade",
                    "Raj Bhavan", "Reddiarpalayam", "Thirubuvanai", "Kuruvinatham",
                    "Kamaraj Nagar", "Kirumampakkam", "Neravy-TR-Pattinam",
                    "Oupalam", "Puducherry North", "Puducherry South",
                    "Karaikal North", "Karaikal South", "Karaikal East",
                    "Mahe", "Yanam", "Indira Nagar", "Oulgaret",
                  ].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <FieldError name="constituency" />
              </label>

              {/* District (Optional) */}
              <label className="raise-field" id="field-district">
                <span>District</span>
                <input
                  type="text"
                  placeholder="Enter your district (optional)"
                  value={formData.district}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, district: e.target.value }));
                  }}
                />
              </label>

              {/* Address (Optional) */}
              <label className="raise-field" id="field-address">
                <span>Address</span>
                <textarea
                  placeholder="Enter your address (optional)"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, address: e.target.value }));
                  }}
                  rows="3"
                />
              </label>

              {/* Booth Number */}
              <label className="raise-field" id="field-boothNumber">
                <span>Booth Number <span className="required-star">*</span></span>
                <input
                  type="text"
                  placeholder="Enter your booth number"
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
                <span>Commitment Level <span className="required-star">*</span></span>
                <select
                  value={formData.commitment}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, commitment: e.target.value }));
                    setFormErrors((p) => ({ ...p, commitment: "" }));
                  }}
                  className={formErrors.commitment ? "input-error" : ""}
                >
                  <option value="">Select your Commitment Level</option>
                  <option>Just be a supporter.</option>
                  <option>Volunteer for events.</option>
                  <option>Work on social media campaigns.</option>
                  <option>Run for a party position</option>
                </select>
                <FieldError name="commitment" />
              </label>

              {/* Submit */}
              <button
                className="raise-action raise-otp-button"
                type="button"
                onClick={handleSubmit}
                disabled={generating || submitting}
              >
                {submitting
                  ? "REGISTERING..."
                  : generating
                  ? "GENERATING CARD..."
                  : "REGISTER & GET MY MEMBERSHIP CARD"}
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