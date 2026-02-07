import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Container } from "./Container";

// Sticky navigation with mobile toggle
export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  return (
    <header className="navbar">
      <Container className="nav-inner">
        <NavLink to="/" className="nav-logo" aria-label="LJK Home" onClick={handleClose}>
          <img src={logo} alt="LJK logo" />
        </NavLink>

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
            to="/news"
            className={({ isActive }) => (isActive ? "is-active" : "")}
            onClick={handleClose}
          >
            Service
          </NavLink>
        </nav>
      </Container>
    </header>
  );
};
