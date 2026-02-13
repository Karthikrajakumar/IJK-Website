import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Container } from "./Container";

// Sticky navigation with mobile toggle
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const navRef = useRef(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className="navbar" ref={navRef}>
      <Container className="nav-inner">
        <NavLink to="/" className="nav-logo" aria-label="LJK Home" onClick={handleClose}>
          <img src={logo} alt="LJK logo" />
        </NavLink>
    
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "2rem", marginLeft: "auto" }}>
          <nav className={`nav-menu ${open ? "is-open" : ""}`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={handleClose}
            >
              Home
            </NavLink>
            <NavLink
              to="/ideology"
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={handleClose}
            >
              Our Ideology
            </NavLink>
            <NavLink
              to="/grievance"
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={handleClose}
            >
              Grievance
            </NavLink>
            <NavLink
              to="/membership"
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={handleClose}
            >
              Membership Portal
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "is-active" : "")}
              onClick={handleClose}
            >
              Services
            </NavLink>
          </nav>
          <div className="nav-sty" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="nav-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={handleToggle}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
            <div className="nav-language">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
              >
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
          </div>
        </div>

      </Container>
    </header>
  );
};

