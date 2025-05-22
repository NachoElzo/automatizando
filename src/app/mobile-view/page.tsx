"use client";

import React, { useState } from "react";
import "../css/mobile-view.css";

const navLinks = [
  { name: "Calendars", href: "/calendars" },
  { name: "Dropdowns", href: "/dropdowns" },
  { name: "Inputs", href: "/inputs-fields" },
  { name: "Drag & Drop", href: "/drag-and-drop" },
  { name: "Surprise!", href: "#" },
];

export default function MobileViewPractice() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-container">
      <nav className="navbar green-navbar">
        <div className="navbar-logo">
          <span role="img" aria-label="robot">🤖</span> Mobile Playground
        </div>
        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${open ? "show" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="mobile-main">
        <h1 className="mobile-title">Welcome to the mobile view practice!</h1>
        <p className="mobile-instruction">
          Try the burger menu, resize the screen, and automate clicks.<br />
          <span role="img" aria-label="burger">🍔</span> Click the menu to see the magic!
        </p>
      </main>
    </div>
  );
}