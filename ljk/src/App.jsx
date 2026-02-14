import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { IdeologyPage } from "./pages/Ideology";
import { GrievancePage } from "./pages/Grievance";
import { RaiseIssuePage } from "./pages/RaiseIssue";
import { TrackIssuePage } from "./pages/TrackIssue";
import { MembershipPage } from "./pages/Membership";
import { ServicesPage } from "./pages/Services";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideology" element={<IdeologyPage />} />
          <Route path="/grievance" element={<GrievancePage />} />
          <Route path="/grievance/raise-issue" element={<RaiseIssuePage />} />
          <Route path="/grievance/track-issue" element={<TrackIssuePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/news" element={<Navigate to="/services" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

