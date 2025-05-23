"use client";

import React, { useState } from "react";
import "../css/alerts.css";

const alertOptions = [
  { value: "alert1", label: "Alert Type 1", type: "alert" },
  { value: "alert2", label: "Alert Type 2", type: "alert" },
  { value: "alert3", label: "Alert Type 3", type: "alert" },
  { value: "popup", label: "Popup", type: "popup" },
  { value: "modal", label: "Modal Popup", type: "popup" },
];

function getFilteredOptions(input: string) {
  const lower = input.toLowerCase();
  if (!input) return alertOptions; // Show all options if input is empty
  if (lower === "alert") return alertOptions.filter(o => o.type === "alert");
  if (lower === "popup" || lower === "pop") return alertOptions.filter(o => o.type === "popup");
  if (lower === "modal") return alertOptions.filter(o => o.value === "modal");
  if (lower === "1") return alertOptions.filter(o => o.value === "alert1");
  if (lower === "2") return alertOptions.filter(o => o.value === "alert2");
  if (lower === "3") return alertOptions.filter(o => o.value === "alert3");
  if (lower === "p") return alertOptions.filter(o => o.value === "popup");
  return alertOptions.filter(o =>
    o.label.toLowerCase().includes(lower) || o.value.includes(lower)
  );
}

export default function AlertsPractice() {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState<string | null>(null);

  const filteredOptions = getFilteredOptions(input);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    // Only show dropdown if input has at least 2 characters and there are options
    setShowDropdown(val.length >= 2 && getFilteredOptions(val).length > 0);
    setShowAlert(null);
  }

  function handleSelect(option: typeof alertOptions[0]) {
    setShowDropdown(false);
    setInput(""); // Clear input after selection
    setShowAlert(option.value);
  }

  function handleBlur() {
    setTimeout(() => setShowDropdown(false), 150);
  }

  function renderAlert() {
    if (!showAlert) return null;
    if (showAlert === "alert1")
      return (
        <div className="popup">
          <div className="popup-content">
            <b>Alert Type 1:</b> This is a simple alert. 🚨
            <br />
            <button className="popup-close" onClick={() => setShowAlert(null)}>Close</button>
          </div>
        </div>
      );
    if (showAlert === "alert2")
      return (
        <div className="popup">
          <div className="popup-content">
            <b>Alert Type 2:</b> Warning! Something needs your attention. ⚠️
            <br />
            <button className="popup-close" onClick={() => setShowAlert(null)}>Close</button>
          </div>
        </div>
      );
    if (showAlert === "alert3")
      return (
        <div className="popup">
          <div className="popup-content">
            <b>Alert Type 3:</b> Success! Everything went well. ✅
            <br />
            <button className="popup-close" onClick={() => setShowAlert(null)}>Close</button>
          </div>
        </div>
      );
    if (showAlert === "popup")
      return (
        <div className="popup">
          <div className="popup-content">
            <b>Popup:</b> This is a popup message. Click outside to close.<br />
            <button className="popup-close" onClick={() => setShowAlert(null)}>Close</button>
          </div>
        </div>
      );
    if (showAlert === "modal")
      return (
        <div className="modal-overlay" onClick={() => setShowAlert(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <b>Modal Popup:</b>
            <p>This is a modal popup. Click outside or the button to close.</p>
            <button className="modal-close" onClick={() => setShowAlert(null)}>Close</button>
          </div>
        </div>
      );
    return null;
  }

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">Alerts & Popups Practice</h1>
      <p className="alerts-description">
        This input has autocomplete functionality.<br />
        Start typing at least <b>2 characters</b> to see suggestions for alert and popup types.<br />
        For example, type <b>alert</b> to see all alerts, <b>popup</b> or <b>p</b> for popups, or <b>1</b>, <b>2</b>, <b>3</b> for specific alert types.<br />
        Select an option to display the alert or popup. All in English!
      </p>
      <div className="alerts-input-wrapper">
        <input
          type="text"
          className="alerts-input"
          placeholder="Type alert, popup, 1, 2, 3, modal..."
          value={input}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {showDropdown && (
          <ul className="alerts-dropdown">
            {filteredOptions.map(option => (
              <li
                key={option.value}
                className="alerts-dropdown-item"
                onMouseDown={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Render alert or popup as overlay, outside the input/dropdown area */}
      {renderAlert()}
    </div>
  );
}