import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Container } from "./Container";
import langIcon from "../assets/language.svg";
import "../styles.css";
import { LanguageContext } from "../context/LanguageContext";
import en from "../locales/en";
import ta from "../locales/ta";

const translations = {
  English: en,
  Tamil: ta,
};

/* ---------------- COMPONENT ---------------- */
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language] || translations.English;
  const navText = t.navbar || {};

  const navRef = useRef(null);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(false);

  /* -------- LANGUAGE TOGGLE -------- */
  const toggleLanguage = () => {
    changeLanguage(language === "English" ? "Tamil" : "English");
  };

  /* -------- CLOSE MENU EVENTS -------- */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = event => {
      if (event.key === "Escape") setOpen(false);
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
      <Container
        className="nav-inner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100%",
          paddingLeft: "0px",
          paddingRight: "0px"
        }}
      >
        {/* LEFT – LOGO */}
        <NavLink
          to="/"
          className="nav-logo"
          aria-label="LJK Home"
          onClick={handleClose}
        >
          <img src={logo} alt="LJK logo" />
        </NavLink>

        {/* RIGHT – NAV ITEMS */}
        <nav
          className={`nav-menu ${open ? "is-open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem"
          }}
        >
          <NavLink to="/" onClick={handleClose}>{navText.home}</NavLink>
          <NavLink to="/ideology" onClick={handleClose}>{navText.ideology}</NavLink>
          <NavLink to="/grievance" onClick={handleClose}>{navText.grievance}</NavLink>
          <NavLink to="/membership" onClick={handleClose}>{navText.membership}</NavLink>
          <NavLink to="/services" onClick={handleClose}>{navText.services}</NavLink>

          <div
            className="nav-sty"
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            {/* MOBILE MENU BUTTON */}
            <button
              className="nav-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={handleToggle}
            >
              <span className="nav-toggle-bar" />
            </button>

            {/* LANGUAGE SWITCH */}
            <button
              type="button"
              className="nav-language"
              onClick={toggleLanguage}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none"
              }}
            >
              <img src={langIcon} alt="language" className="lang-icon" />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>
                {language === "English" ? "EN" : "TA"}
              </span>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
};
