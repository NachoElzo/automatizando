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

// Solo busca por las dos primeras letras
function getFilteredOptions(input: string) {
  const lower = input.toLowerCase();
  if (!input) return alertOptions;
  if (lower.startsWith("al")) return alertOptions.filter(o => o.type === "alert");
  if (lower.startsWith("po")) return alertOptions.filter(o => o.type === "popup");
  if (lower.startsWith("mo")) return alertOptions.filter(o => o.value === "modal");
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
  const [bubble, setBubble] = useState<{ type: string; msg: string } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const filteredOptions = getFilteredOptions(input);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    setShowDropdown(val.length >= 2 && getFilteredOptions(val).length > 0);
    setShowAlert(null);
  }

  function handleSelect(option: typeof alertOptions[0]) {
    setShowDropdown(false);
    setInput("");
    // Alertas tipo burbuja emergente
    if (option.value === "alert1") {
      setBubble({ type: "info", msg: "Alert Type 1: This is a simple info alert. ℹ️" });
      setTimeout(() => setBubble(null), 2200);
      return;
    }
    if (option.value === "alert2") {
      setBubble({ type: "warning", msg: "Alert Type 2: Warning! Something needs your attention. ⚠️" });
      setTimeout(() => setBubble(null), 2200);
      return;
    }
    // Alert 3: nativa sin estilos
    if (option.value === "alert3") {
      window.alert("Alert Type 3: Success! Everything went well. ✅");
      return;
    }
    // Popup animado que desaparece solo
    if (option.value === "popup") {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }
    // Modal
    if (option.value === "modal") {
      setShowAlert("modal");
      return;
    }
  }

  function handleBlur() {
    setTimeout(() => setShowDropdown(false), 150);
  }

  function renderAlert() {
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
        For example, type <b>al</b> to see all alerts, <b>po</b> for popups, <b>mo</b> for modal, or <b>1</b>, <b>2</b>, <b>3</b> for specific alert types.<br />
        Select an option to display the alert or popup. All in English!
      </p>
      <div className="alerts-input-wrapper">
        <input
          type="text"
          className="alerts-input"
          placeholder="Type al, po... for autocomplete"
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
      {/* Bubble alert */}
      {bubble && (
        <div className={`bubble-alert bubble-${bubble.type}`}>
          {bubble.msg}
        </div>
      )}
      {/* Popup animado */}
      {showPopup && (
        <div className="popup-animated">
          <div className="popup-animated-content">
            <b>Popup:</b> This is a quick popup! 🎈
          </div>
        </div>
      )}
      {renderAlert()}
    </div>
  );
}