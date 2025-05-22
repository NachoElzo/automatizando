"use client";

import React, { useState } from "react";
import "../css/sliders.css";

const marks = [
  { value: 0, label: "Start", tip: "Ready, set... go!" },
  { value: 25, label: "Quarter", tip: "Quarter way there! 🚗" },
  { value: 50, label: "Half", tip: "Halfway! Take a selfie 📸" },
  { value: 75, label: "Almost", tip: "Almost at the finish line! 🏁" },
  { value: 100, label: "Finish", tip: "You made it! 🎉" },
];

export default function SliderPractice() {
  const [value, setValue] = useState(0);
  const currentMark = marks.find((m) => m.value === value);

  return (
    <div className="slider-container" style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem", background: "#f0fdf4", borderRadius: "1rem", border: "1.5px solid #22c55e" }}>
      <h1 className="slider-title">Sliders</h1>
      <p className="slider-description">
        Move the slider below. When you reach certain points, a fun tooltip will appear!<br />
        Each special point is marked on the slider line.<br />
        <b>Try automating or testing the slider and see the tooltips!</b>
      </p>
      <div className="slider-track-wrapper" style={{ position: "relative", margin: "3rem 0 2rem 0" }}>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="slider"
          style={{ width: "100%" }}
          aria-label="fun-slider"
        />
        {/* Marks */}
        {marks.map(mark => (
          <React.Fragment key={mark.value}>
            {/* Mark label */}
            <div
              className="slider-mark"
              style={{
                position: "absolute",
                left: `calc(${mark.value}% - 10px)`,
                top: 30,
                width: 20,
                textAlign: "center",
                fontSize: "0.9rem",
                color: "#2563eb",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              {mark.label}
            </div>
            {/* Small transversal line */}
            <div
              className="slider-mark-line"
              style={{
                position: "absolute",
                left: `calc(${mark.value}% - 1px)`,
                top: 18,
                width: 2,
                height: 14,
                background: "#2563eb",
                borderRadius: 1,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </React.Fragment>
        ))}
        {/* Tooltip */}
        {currentMark && (
          <div
            className="slider-tooltip"
            style={{
              position: "absolute",
              left: `calc(${currentMark.value}% - 60px)`,
              top: -35,
              background: "#22c55e",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              minWidth: 120,
              textAlign: "center",
              transition: "opacity 0.2s",
              boxShadow: "0 2px 8px #0002",
              zIndex: 2,
            }}
          >
            {currentMark.tip}
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", fontSize: "1.1rem", color: "#2563eb" }}>
        Value: <b>{value}</b>
      </div>
    </div>
  );
}