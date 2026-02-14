import React, { useContext, useEffect, useRef, useState } from "react";
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
  const statusRef = useRef(null);
  const currentIndex = 1;
  const lineProgress = (currentIndex / (statuses.length - 1)) * 80;
  const issuePattern = /^issue-\d{6}$/i;

  useEffect(() => {
    if (!showStatus || !statusRef.current) return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;
    statusRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showStatus]);

  const handleTrack = () => {
    const trimmed = grievanceId.trim();
    if (!issuePattern.test(trimmed)) {
      setShowStatus(false);
      setTrackError(track.errorInvalidId);
      return;
    }
    setTrackError("");
    setShowStatus(true);
  };

  return (
    <>
      <Navbar />
      <main className="track-issue-page">
        {showStatus && (
          <section className="track-status-section" aria-live="polite" ref={statusRef}>
            <Container>
              <div className="track-status-card">
                <div className="track-status-header">
                  <p className="track-status-title">{track.trackingIdLabel}</p>
                  <p className="track-status-id">{grievanceId || track.fieldPlaceholder}</p>
                  <p className="track-status-current">
                    {track.currentStatusLabel} <strong>{statuses[currentIndex]}</strong>
                  </p>
                </div>
                <div
                  className="track-status-timeline"
                  role="list"
                  style={{
                    "--progress": `${lineProgress}%`,
                  }}
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
                        <span className="track-status-dot" aria-hidden="true" />
                        <span className="track-status-label">{status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        )}
        <section className="track-hero" aria-labelledby="track-issue-title">
          <Container className="track-hero-inner">
            <div className="track-hero-copy">
              <p className="track-eyebrow">{track.heroEyebrow}</p>
              <h1 id="track-issue-title">{track.heroTitle}</h1>
              <p className="track-hero-subtitle">{track.heroSubtitle}</p>
            </div>
            <aside className="track-widget" aria-label="Track your issue">
              <span className="track-widget-label">{track.widgetLabel}</span>
              <h3 className="track-widget-title">{track.widgetTitle}</h3>
              <label className="track-field">
                <span>{track.fieldLabel}</span>
                <input
                  className="track-input"
                  type="text"
                  placeholder={track.fieldPlaceholder}
                  inputMode="text"
                  value={grievanceId}
                  onChange={(event) => {
                    setGrievanceId(event.target.value);
                    setShowStatus(false);
                    setTrackError("");
                  }}
                />
              </label>
              {trackError && <p className="track-error">{trackError}</p>}
              <button className="track-button" type="button" onClick={handleTrack}>
                {track.trackButton}
              </button>
            </aside>
          </Container>
        </section>

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
