// import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { Container } from "../components/Container";
// import { Box } from "../components/Box";
// import leaderFlag from "../assets/leader-with-flag.png";

// export const RaiseIssuePage = () => {
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [category, setCategory] = useState("");
//   const [otherIssue, setOtherIssue] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otpStatus, setOtpStatus] = useState("idle");
//   const [otpError, setOtpError] = useState("");

//   useEffect(() => {
//     if (window.initSendOTP || customElements.get("h-captcha")) {
//       return;
//     }
//     const scriptUrls = [
//       "https://verify.msg91.com/otp-provider.js",
//       "https://verify.phone91.com/otp-provider.js",
//     ];
//     let index = 0;

//     const attemptLoad = () => {
//       if (index >= scriptUrls.length) return;
//       if (document.querySelector(`script[src="${scriptUrls[index]}"]`)) {
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = scriptUrls[index];
//       script.async = true;
//       script.onload = () => {};
//       script.onerror = () => {
//         index += 1;
//         attemptLoad();
//       };
//       document.head.appendChild(script);
//     };

//     attemptLoad();
//   }, []);

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

//     const configuration = {
//       widgetId: "36626a67706c333432373235",
//       tokenAuth: "493421TbeXBwrq3J698add0fP1",
//       identifier: `91${trimmed}`,
//       success: () => {
//         setOtpVerified(true);
//         setOtpStatus("verified");
//       },
//       failure: () => {
//         setOtpVerified(false);
//         setOtpStatus("error");
//         setOtpError("OTP verification failed. Please try again.");
//       },
//     };

//     window.initSendOTP(configuration);
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="raise-issue-page">
//         <section className="raise-hero" aria-labelledby="raise-issue-title">
//           <Container className="raise-hero-inner">
//             <div className="raise-hero-text">
//               <h1 id="raise-issue-title">Direct Access To Leadership</h1>
//               <p>
//                 You no longer need to wait in long queues at government offices or rely on
//                 unresponsive representatives. The Latchiya Jananayaga Party (LJK) believes in
//                 proactive governance. Whether it's a broken pipe, a dark street, admission issues,
//                 or civic neglect, use this portal to alert us directly. Every grievance submitted
//                 here is tracked, categorized, and brought to the attention of our Constituency
//                 Action Teams and our Leader, Jose Charles Martin.
//               </p>
//             </div>
//             <div className="raise-hero-media">
//               <div className="raise-hero-glow" aria-hidden="true" />
//               <img src={leaderFlag} alt="Leader holding the LJK flag" />
//             </div>
//           </Container>
//         </section>

//         <section className="raise-form-section" aria-labelledby="raise-form-title">
//           <Container>
//             <div className="raise-form-header">
//               <h2 id="raise-form-title">The Grievance Form</h2>
//               <p>Submit Your Grievance</p>
//             </div>
//             <form className="raise-form">
//               <div className="raise-group">
//                 <h3>Field 1: Personal Details</h3>
//                 <label className="raise-field">
//                   <span>Full Name</span>
//                   <input type="text" placeholder="Enter your full name" />
//                 </label>
//                 <label className="raise-field">
//                   <span>Mobile Number</span>
//                   <input
//                     type="tel"
//                     placeholder="Enter mobile number"
//                     value={mobile}
//                     onChange={(event) => setMobile(event.target.value)}
//                   />
//                   <small>Essential for OTP verification</small>
//                 </label>
                
//                 <div className="raise-otp">
//                   <button
//                     type="button"
//                     className="raise-otp-button"
//                     onClick={sendOtp}
//                     disabled={otpStatus === "sending"}
//                   >
//                     {otpStatus === "sending" ? "Sending..." : "Send OTP"}
//                   </button>
//                   <span className={`raise-otp-status ${otpVerified ? "is-verified" : ""}`}>
//                     <span className="otp-indicator" aria-hidden="true" />
//                     {otpVerified ? "OTP verified" : "OTP not verified"}
//                   </span>
//                 </div>
//                 {otpError && <p className="raise-otp-error">{otpError}</p>}
//               </div>

//               <div className="raise-group">
//                 <h3>Field 2: Location Details</h3>
//                 <label className="raise-field select compact">
//                   <span>Constituency</span>
//                   <select defaultValue="" disabled={!otpVerified}>
//                     <option value="" disabled>
//                       Select constituency
//                     </option>
//                     <option value="Mannadipet">Mannadipet</option>
//                     <option value="Thirubhuvanai (SC)">Thirubhuvanai (SC)</option>
//                     <option value="Ossudu (SC)">Ossudu (SC)</option>
//                     <option value="Mangalam">Mangalam</option>
//                     <option value="Villianur">Villianur</option>
//                     <option value="Ozhukarai">Ozhukarai</option>
//                     <option value="Kadirgamam">Kadirgamam</option>
//                     <option value="Indira Nagar">Indira Nagar</option>
//                     <option value="Thattanchavady">Thattanchavady</option>
//                     <option value="Kamaraj Nagar">Kamaraj Nagar</option>
//                     <option value="Lawspet">Lawspet</option>
//                     <option value="Kalapet">Kalapet</option>
//                     <option value="Muthialpet">Muthialpet</option>
//                     <option value="Raj Bhavan">Raj Bhavan</option>
//                     <option value="Oupalam">Oupalam</option>
//                     <option value="Orleampeth">Orleampeth</option>
//                     <option value="Nellithope">Nellithope</option>
//                     <option value="Mudaliarpet">Mudaliarpet</option>
//                     <option value="Ariankuppam">Ariankuppam</option>
//                     <option value="Manavely">Manavely</option>
//                     <option value="Embalam (SC)">Embalam (SC)</option>
//                     <option value="Nettapakkam (SC)">Nettapakkam (SC)</option>
//                     <option value="Bahour">Bahour</option>
//                     <option value="Nedungadu (SC)">Nedungadu (SC)</option>
//                     <option value="Thirunallar">Thirunallar</option>
//                     <option value="Karaikal North">Karaikal North</option>
//                     <option value="Karaikal South">Karaikal South</option>
//                     <option value="Neravy T.R.Pattinam">Neravy T.R.Pattinam</option>
//                     <option value="Mahe">Mahe</option>
//                     <option value="Yanam">Yanam</option>
//                   </select>
//                 </label>
//                 <label className="raise-field">
//                   <span>Area / Ward Name</span>
//                   <input
//                     type="text"
//                     placeholder="Enter area or ward name"
//                     disabled={!otpVerified}
//                   />
//                 </label>
//                 <label className="raise-field">
//                   <span>Street / Landmark</span>
//                   <input
//                     type="text"
//                     placeholder="Enter street or landmark"
//                     disabled={!otpVerified}
//                   />
//                 </label>
//               </div>

//               <div className="raise-group">
//                 <h3>Field 3: The Issue</h3>
//                 <label className="raise-field select">
//                   <span>Describe the issue</span>
//                    <input
//                     type="text"
//                     placeholder="Enter the issue category (e.g. Water Supply, Street Lights, etc.)"
//                     disabled={!otpVerified}
//                   />
//                 </label>
//                 {category === "Other" && (
//                   <label className="raise-field">
//                     <span>Describe Other Issue</span>
//                     <input
//                       type="text"
//                       placeholder="Share the issue details"
//                       value={otherIssue}
//                       onChange={(event) => setOtherIssue(event.target.value)}
//                       disabled={!otpVerified}
//                     />
//                   </label>
//                 )}
//                 <label className="raise-field">
//                   <span>Description</span>
//                   <textarea
//                     placeholder="Please describe the issue in detail. How long has it been happening?"
//                     rows={4}
//                     disabled={!otpVerified}
//                   />
//                 </label>
//                 <label className="raise-field">
//                   <span>Evidence Upload</span>
//                   <input type="file" disabled={!otpVerified} />
//                   <small>Upload Photo/Video (Max 10MB)</small>
//                   <em>A picture is worth a thousand words. Show us the problem.</em>
//                 </label>
//               </div>

//               <button className="raise-submit" type="submit" disabled={!otpVerified}>
//                 Submit Grievance
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
import leaderFlag from "../assets/leader-with-flag.png";
import { submitGrievanceAPI } from "../pages/Api";

export const RaiseIssuePage = () => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [category, setCategory] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpStatus, setOtpStatus] = useState("idle");
  const [otpError, setOtpError] = useState("");

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError("File size must be less than 10MB");
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
    if (!otpVerified) {
      setSubmitError("Please verify your mobile number with OTP first.");
      return;
    }

    if (!fullName || !mobile || !constituency || !area || !street || !category || !description) {
      setSubmitError("Please fill in all required fields.");
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
      formData.append("otp", "true"); // OTP already verified

      // Append file if exists
      if (evidenceFile) {
        formData.append("files", evidenceFile);
      }

      // Submit to backend
      const response = await submitGrievanceAPI(formData);

      // Success!
      setSubmitSuccess(true);
      setTrackingId(response.trackingId);
      
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
      setOtpVerified(false);
      setOtpStatus("idle");

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

    } catch (error) {
      setSubmitError(error.message || "Failed to submit grievance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const newLocal = <h1 id="raise-issue-title">Direct Access To Leadership</h1>;
  return (
    <>
      <Navbar />
      <main className="raise-issue-page">
        <section className="raise-hero" aria-labelledby="raise-issue-title">
          <Container className="raise-hero-inner">
            <div className="raise-hero-text">
              {newLocal}
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

            {/* Success Message */}
            {submitSuccess && (
              <div className="raise-success-message">
                <h3>✓ Grievance Submitted Successfully!</h3>
                <p>Your tracking ID: <strong>{trackingId}</strong></p>
                <p>Please save this ID to track your grievance status.</p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="raise-error-message">
                <p>⚠ {submitError}</p>
              </div>
            )}

            <form className="raise-form" onSubmit={handleSubmit}>
              <div className="raise-group">
                <h3>Field 1: Personal Details</h3>
                <label className="raise-field">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>Mobile Number *</span>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                  />
                  <small>Essential for OTP verification</small>
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
              </div>

              <div className="raise-group">
                <h3>Field 2: Location Details</h3>
                <label className="raise-field select compact">
                  <span>Constituency *</span>
                  <select
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    disabled={!otpVerified}
                    required
                  >
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
                  <span>Area / Ward Name *</span>
                  <input
                    type="text"
                    placeholder="Enter area or ward name"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    disabled={!otpVerified}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>Street / Landmark *</span>
                  <input
                    type="text"
                    placeholder="Enter street or landmark"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    disabled={!otpVerified}
                    required
                  />
                </label>
              </div>

              <div className="raise-group">
                <h3>Field 3: The Issue</h3>
                <label className="raise-field select">
                  <span>Issue Category *</span>
                  <input
                    type="text"
                    placeholder="Enter the issue category (e.g. Water Supply, Street Lights, etc.)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={!otpVerified}
                    required
                  />
                </label>
                {category === "Other" && (
                  <label className="raise-field">
                    <span>Describe Other Issue *</span>
                    <input
                      type="text"
                      placeholder="Share the issue details"
                      value={otherIssue}
                      onChange={(event) => setOtherIssue(event.target.value)}
                      disabled={!otpVerified}
                      required
                    />
                  </label>
                )}
                <label className="raise-field">
                  <span>Description *</span>
                  <textarea
                    placeholder="Please describe the issue in detail. How long has it been happening?"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={!otpVerified}
                    required
                  />
                </label>
                <label className="raise-field">
                  <span>Evidence Upload</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={!otpVerified}
                    accept="image/*,video/*"
                  />
                  <small>Upload Photo/Video (Max 10MB)</small>
                  <em>A picture is worth a thousand words. Show us the problem.</em>
                </label>
              </div>

              <button
                className="raise-submit"
                type="submit"
                disabled={!otpVerified || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Grievance"}
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