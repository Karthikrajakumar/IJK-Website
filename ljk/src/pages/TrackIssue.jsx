import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container } from "../components/Container";
import { Box } from "../components/Box";

export const TrackIssuePage = () => {
  const statuses = [
    "Received",
    "Under Review",
    "Assigned to Booth Agent",
 
    "Resolved",
  ];
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
      setTrackError("Please enter the correct issue id");
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
                  <p className="track-status-title">Tracking ID</p>
                  <p className="track-status-id">{grievanceId || "issue-222222"}</p>
                  <p className="track-status-current">
                    Current Status: <strong>{statuses[currentIndex]}</strong>
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
              <p className="track-eyebrow">Grievance Portal</p>
              <h1 id="track-issue-title">Track Your Issue</h1>
              <p className="track-hero-subtitle">
                Use your grievance ID to see the exact stage of action. Every submission is
                monitored by our booth teams and leadership until it is resolved.
              </p>
            </div>
            <aside className="track-widget" aria-label="Track your issue">
              <span className="track-widget-label">Track Your Issue</span>
              <h3 className="track-widget-title">Check Status</h3>
              <label className="track-field">
                <span>Enter Your Grievance ID</span>
                <input
                  className="track-input"
                  type="text"
                  placeholder="issue-222222"
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
                Track
              </button>
            </aside>
          </Container>
        </section>

        <section className="track-quote">
          <Container>
            <blockquote>
              "I am not here to rule; I am here to serve. Report your issue today, and let us build
              a better Puducherry together." - Jose Charles Martin
            </blockquote>
          </Container>
        </section>
      </main>
      <Box />
      <Footer />
    </>
  );
};
