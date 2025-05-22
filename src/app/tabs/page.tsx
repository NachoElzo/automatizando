"use client";

import React, { useState } from "react";
import "../css/tabs.css";

const tabs = [
  { label: "Home", content: "Welcome to the Home tab! 🏠 Here you can start your tab adventure." },
  { label: "Profile", content: "This is your Profile tab. Edit your info, or just admire yourself! 😎" },
  { label: "Settings", content: "Settings tab: Tweak, tune, and toggle to your heart's content. ⚙️" },
  { label: "Surprise", content: "🎉 Surprise! You found the secret tab. Enjoy your day!" },
];

export default function TabsPractice() {
  const [active, setActive] = useState(0);

  return (
    <div className="tabs-container" style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem", background: "#f0fdf4", borderRadius: "1rem", border: "1.5px solid #22c55e" }}>
      <h1 className="tabs-title">Tabs Practice Playground</h1>
      <p className="tabs-description">
        Click the tabs below to switch between different sections.<br />
        Each tab shows a different message.<br />
        <b>Try automating tab clicks and reading the content!</b>
      </p>
      <div className="tabs-bar" style={{ display: "flex", borderBottom: "2px solid #22c55e", marginBottom: "2rem" }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`tab-btn${active === idx ? " active" : ""}`}
            style={{
              flex: 1,
              padding: "0.8rem 0",
              background: active === idx ? "#22c55e" : "transparent",
              color: active === idx ? "#fff" : "#2563eb",
              border: "none",
              borderBottom: active === idx ? "3px solid #2563eb" : "3px solid transparent",
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              borderRadius: active === idx ? "0.5rem 0.5rem 0 0" : "0.5rem 0.5rem 0 0",
              outline: "none",
            }}
            onClick={() => setActive(idx)}
            tabIndex={0}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="tab-panel"
        id={`tab-panel-${active}`}
        style={{
          minHeight: "80px",
          background: "#fff",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          color: "#2563eb",
          fontSize: "1.15rem",
          fontWeight: 500,
          border: "1.5px solid #22c55e",
          boxShadow: "0 2px 8px #0001",
        }}
      >
        {tabs[active].content}
      </div>
    </div>
  );
}