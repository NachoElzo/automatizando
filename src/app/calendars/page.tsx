"use client";

import React, { useState, useEffect } from "react";
import "../css/calendars.css";

// Helper to validate date string
function isValidDate(dateStr: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    dateStr === date.toISOString().slice(0, 10)
  );
}

// --- Clock Component ---
function Clock({ mockDate, onMockChange }: { mockDate: Date | null; onMockChange: (d: Date | null) => void }) {
  const [now, setNow] = useState<Date>(mockDate ?? new Date());

  useEffect(() => {
    if (mockDate === null) {
      // Real time: update every second
      const interval = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(interval);
    } else {
      // Mocked: show the mock date
      setNow(mockDate);
    }
  }, [mockDate]);

  // Handlers for mocking
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // Format: YYYY-MM-DDTHH:mm:ss
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      onMockChange(date);
    }
  }

  function handleReset() {
    onMockChange(null);
  }

  // Format date and time
  const dateStr = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="calendar-section" style={{ marginTop: "2rem" }}>
      <h2 className="title">Live Clock (Mockable)</h2>
      <div className="calendar-label" style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
        Current date and time:
      </div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          background: "#f0fdf4",
          border: "1.5px solid #22c55e",
          borderRadius: "0.5rem",
          padding: "0.5rem 1.5rem",
          display: "inline-block",
          marginBottom: "1rem",
        }}
        data-testid="live-clock"
      >
        {dateStr} — {timeStr}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="mock-clock" className="calendar-label" style={{ marginRight: "0.5rem" }}>
          Mock date and time:
        </label>
        <input
          id="mock-clock"
          type="datetime-local"
          onChange={handleInputChange}
          style={{ marginRight: "1rem" }}
        />
        <button onClick={handleReset} style={{ padding: "0.3rem 1rem", borderRadius: "0.3rem" }}>
          Reset to real time
        </button>
      </div>
    </div>
  );
}

export default function CalendarsPage() {
  const [textDate, setTextDate] = useState("");
  const [pickerDate, setPickerDate] = useState("");
  const [english, setEnglish] = useState(false);

  // --- Clock state ---
  const [mockDate, setMockDate] = useState<Date | null>(null);

  const textDateValid = isValidDate(textDate);

  // All texts in English
  const texts = english
    ? {
        titleText: "Text Editable Calendar",
        labelText: "Type a date (YYYY-MM-DD):",
        placeholder: "Eg: 2024-12-31",
        validMsg1: (date: string) =>
          `🎉 Date accepted! ${date} will be legendary, so get your superhero cape ready.`,
        validMsg2: (date: string) =>
          `🥳 Ready to make history on ${date}? Don't forget to invite the aliens!`,
        selectTitle: "Picker Only Calendar",
        selectLabel: "Choose your time destination:",
        selectMsg1: (date: string) =>
          `🌞 ${date} will be so epic even your alarm clock will want to wake up early!`,
        selectMsg2: (date: string) =>
          `🗓️ Set an alarm for ${date} and get ready for the adventure!`,
        button: "Switch to Spanish",
      }
    : {
        titleText: "Calendario Editable por Texto",
        labelText: "Escribe una fecha (AAAA-MM-DD):",
        placeholder: "Ej: 2024-12-31",
        validMsg1: (date: string) =>
          `🎉 ¡Fecha aceptada! ${date} será legendaria, así que prepárate con tu capa de superhéroe.`,
        validMsg2: (date: string) =>
          `🥳 ¿Listo para hacer historia el ${date}? ¡No olvides invitar a los extraterrestres!`,
        selectTitle: "Calendario Solo con Selector",
        selectLabel: "Elige tu destino temporal:",
        selectMsg1: (date: string) =>
          `🌞 ${date} será tan épico que ¡incluso tu despertador querrá levantarse temprano!`,
        selectMsg2: (date: string) =>
          `🗓️ Pon una alarma para ${date} y prepárate para la aventura.`,
        button: "Cambiar a Inglés",
      };

  return (
    <div className="container">
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
        onClick={() => setEnglish((e) => !e)}
      >
        {texts.button}
      </button>

      {/* Text editable calendar */}
      <h2 className="title">{texts.titleText}</h2>
      <div className="calendar-section">
        <label className="calendar-label" htmlFor="text-calendar">
          {texts.labelText}
        </label>
        <input
          id="text-calendar"
          className={`calendar-input${
            textDate.length === 10
              ? textDateValid
                ? " valid"
                : " invalid"
              : textDate.length > 0
              ? " invalid"
              : ""
          }`}
          type="text"
          placeholder={texts.placeholder}
          value={textDate}
          onChange={(e) => setTextDate(e.target.value)}
        />
        {/* Only show the label if the date is valid and complete */}
        {textDate.length === 10 && textDateValid && (
          <div className="calendar-result calendar-label-result valid">
            {texts.validMsg1(textDate)}
            <br />
            {texts.validMsg2(textDate)}
          </div>
        )}
      </div>

      {/* Picker only calendar */}
      <h2 className="title">{texts.selectTitle}</h2>
      <div className="calendar-section">
        <label className="calendar-label" htmlFor="picker-calendar">
          {texts.selectLabel}
        </label>
        <input
          id="picker-calendar"
          className="calendar-input"
          type="date"
          value={pickerDate}
          onChange={(e) => setPickerDate(e.target.value)}
        />
        {pickerDate && (
          <div className="calendar-result calendar-label-result valid">
            {texts.selectMsg1(pickerDate)}
            <br />
            {texts.selectMsg2(pickerDate)}
          </div>
        )}
      </div>

      {/* --- Live Clock Section --- */}
      <Clock mockDate={mockDate} onMockChange={setMockDate} />

      {/* --- Explanation --- */}
      <div style={{ marginTop: "2.5rem", background: "#f0fdf4", borderRadius: "0.5rem", padding: "1rem 1.5rem", border: "1.5px solid #22c55e" }}>
        <h3>What can you do with the clock?</h3>
        <ul>
          <li>
            <b>See the current date and time</b> (updates every second).
          </li>
          <li>
            <b>Mock the clock</b> by entering any date and time you want. This is useful for automation or testing time-based features.
          </li>
          <li>
            <b>Reset</b> to real time with one click.
          </li>
        </ul>
        <p>
          <b>Tip:</b> You can automate or mock the clock to test how your app behaves at any date or time!
        </p>
      </div>
    </div>
  );
}