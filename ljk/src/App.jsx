import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { IdeologyPage } from "./pages/Ideology";
import { GrievancePage } from "./pages/Grievance";
import { RaiseIssuePage } from "./pages/RaiseIssue";
import { MembershipPage } from "./pages/Membership";
import { NewsPage } from "./pages/News";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideology" element={<IdeologyPage />} />
          <Route path="/grievance" element={<GrievancePage />} />
          <Route path="/grievance/raise-issue" element={<RaiseIssuePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
