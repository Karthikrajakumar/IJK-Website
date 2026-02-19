import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

export const TrackIssuePage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const track = t.trackIssuePage || {};

  const statuses = track.statuses || [];

  const [showStatus, setShowStatus] = useState(false);
  const [grievanceId, setGrievanceId] = useState("");
  const [trackError, setTrackError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [grievanceData, setGrievanceData] = useState(null);

  const statusRef = useRef(null);

  const issuePattern = /^issue-\d{6}$/i;

  const lineProgress =
    statuses.length > 1
      ? (currentIndex / (statuses.length - 1)) * 80
      : 0;

  useEffect(() => {
    if (!showStatus || !statusRef.current) return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;
    statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showStatus]);

  const handleTrack = async () => {
    const trimmed = grievanceId.trim();

    if (!issuePattern.test(trimmed)) {
      setShowStatus(false);
      setTrackError(track.errorInvalidId || "Invalid Tracking ID");
      return;
    }

    try {
      setLoading(true);
      setTrackError("");
      setShowStatus(false);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/grievances/track/${trimmed}`
      );

      if (response.data.success) {
        const grievance = response.data.grievance;

        setGrievanceData(grievance);

        // Dynamic Status Update
        const statusIndex = statuses.indexOf(grievance.status);
        if (statusIndex !== -1) {
          setCurrentIndex(statusIndex);
        } else {
          setCurrentIndex(0);
        }

        setShowStatus(true);
      }
    } catch (error) {
      console.error("Track Error:", error);

      if (error.response?.status === 404) {
        setTrackError("Grievance not found");
      } else {
        setTrackError("Something went wrong. Please try again.");
      }

      setShowStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="track-issue-page">

        {/* STATUS SECTION */}
        {showStatus && grievanceData && (
          <section
            className="track-status-section"
            aria-live="polite"
            ref={statusRef}
          >
            <Container>
              <div className="track-status-card">
                <div className="track-status-header">
                  <p className="track-status-title">
                    {track.trackingIdLabel || "Tracking ID"}
                  </p>
                  <p className="track-status-id">
                    {grievanceData.trackingId}
                  </p>
                  <p className="track-status-current">
                    {track.currentStatusLabel || "Current Status:"}{" "}
                    <strong>{grievanceData.status}</strong>
                  </p>
                </div>

                <div
                  className="track-status-timeline"
                  role="list"
                  style={{ "--progress": `${lineProgress}%` }}
                >
                  {statuses.map((status, index) => {
                    const isComplete = index < currentIndex;
                    const isActive = index === currentIndex;

                    return (
                      <div
                        key={status}
                        className={`track-status-step ${
                          isComplete ? "is-complete" : ""
                        } ${isActive ? "is-active" : ""}`}
                        role="listitem"
                      >
                        <span className="track-status-dot" />
                        <span className="track-status-label">
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Details */}
                <div className="track-extra-details">
                  <p><strong>Description:</strong> {grievanceData.description}</p>
                  <p><strong>Created At:</strong> {grievanceData.createdAt}</p>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* HERO SECTION */}
        <section className="track-hero" aria-labelledby="track-issue-title">
          <Container className="track-hero-inner">
            <div className="track-hero-copy">
              <p className="track-eyebrow">{track.heroEyebrow}</p>
              <h1 id="track-issue-title">{track.heroTitle}</h1>
              <p className="track-hero-subtitle">{track.heroSubtitle}</p>
            </div>

            <aside className="track-widget">
              <span className="track-widget-label">
                {track.widgetLabel}
              </span>
              <h3 className="track-widget-title">
                {track.widgetTitle}
              </h3>

              <label className="track-field">
                <span>{track.fieldLabel || "Enter Tracking ID"}</span>
                <input
                  className="track-input"
                  type="text"
                  placeholder="issue-123456"
                  value={grievanceId}
                  onChange={(e) => {
                    setGrievanceId(e.target.value);
                    setShowStatus(false);
                    setTrackError("");
                  }}
                />
              </label>

              {trackError && (
                <p className="track-error">{trackError}</p>
              )}

              <button
                className="track-button"
                type="button"
                onClick={handleTrack}
                disabled={loading}
              >
                {loading ? "Tracking..." : track.trackButton || "Track Issue"}
              </button>
            </aside>
          </Container>
        </section>

        {/* QUOTE SECTION */}
        <section className="track-quote">
          <Container>
            <blockquote>{track.quote}</blockquote>
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
