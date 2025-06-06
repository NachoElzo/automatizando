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
function Clock({
  mockDate,
  onMockChange,
  mockInput,
  setMockInput,
  english,
}: {
  mockDate: Date | null;
  onMockChange: (d: Date | null) => void;
  mockInput: string;
  setMockInput: (v: string) => void;
  english: boolean;
}) {
  const [now, setNow] = useState<Date>(mockDate ?? new Date());

  useEffect(() => {
    if (mockDate === null) {
      const interval = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(interval);
    } else {
      setNow(mockDate);
    }
  }, [mockDate]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setMockInput(value);
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      onMockChange(date);
    }
  }

  function handleReset() {
    setMockInput("");
    onMockChange(null);
  }

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
    <div className="calendar-section">
      <h2 className="title">
        {english ? "Live Clock (Mockable)" : "Reloj en Vivo (Mockeable)"}
      </h2>
      <div className="calendar-label">
        {english ? "Current date and time:" : "Fecha y hora actual:"}
      </div>
      <div
        data-testid="live-clock"
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
      >
        {dateStr} — {timeStr}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label
          htmlFor="mock-clock"
          className="calendar-label"
          style={{ marginRight: "0.5rem" }}
        >
          {english ? "Mock date and time:" : "Simular fecha y hora:"}
        </label>
        <input
          id="mock-clock"
          type="datetime-local"
          value={mockInput}
          onChange={handleInputChange}
          className="calendar-input"
          style={{ marginRight: "1rem" }}
        />
        <button
          className="reset-btn"
          onClick={handleReset}
        >
          {english ? "Reset to real time" : "Volver a tiempo real"}
        </button>
      </div>
    </div>
  );
}

export default function CalendarsPage() {
  const [textDate, setTextDate] = useState("");
  const [pickerDate, setPickerDate] = useState("");
  const [english, setEnglish] = useState(true);

  // --- Clock state ---
  const [mockDate, setMockDate] = useState<Date | null>(null);
  const [mockInput, setMockInput] = useState("");

  const textDateValid = isValidDate(textDate);

  // All texts in English or Spanish
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
        clockTitle: "Live Clock (Mockable)",
        clockLabel: "Current date and time:",
        clockMock: "Mock date and time:",
        clockReset: "Reset to real time",
        explanationTitle: "What can you do with the clock?",
        explanation1: "See the current date and time (updates every second).",
        explanation2: "Mock the clock by entering any date and time you want. This is useful for automation or testing time-based features.",
        explanation3: "Reset to real time with one click.",
        tip: "Tip: You can automate or mock the clock to test how your app behaves at any date or time!",
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
        clockTitle: "Reloj en Vivo (Mockeable)",
        clockLabel: "Fecha y hora actual:",
        clockMock: "Simular fecha y hora:",
        clockReset: "Volver a tiempo real",
        explanationTitle: "¿Qué puedes hacer con el reloj?",
        explanation1: "Ver la fecha y hora actual (se actualiza cada segundo).",
        explanation2: "Simula el reloj ingresando cualquier fecha y hora que desees. Útil para automatización o pruebas.",
        explanation3: "Vuelve al tiempo real con un solo clic.",
        tip: "Consejo: ¡Puedes automatizar o simular el reloj para probar cómo se comporta tu app en cualquier fecha u hora!",
      };

  return (
    <div className="container">
      <button
        className="lang-switch-btn"
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
      <Clock
        mockDate={mockDate}
        onMockChange={setMockDate}
        mockInput={mockInput}
        setMockInput={setMockInput}
        english={english}
      />

      {/* --- Explanation --- */}
      <div className="calendar-result" style={{ marginTop: "2.5rem" }}>
        <h3 className="title" style={{ fontSize: "1.2rem" }}>
          {texts.explanationTitle}
        </h3>
        <ul>
          <li>
            <b>{texts.explanation1}</b>
          </li>
          <li>
            <b>{texts.explanation2}</b>
          </li>
          <li>
            <b>{texts.explanation3}</b>
          </li>
        </ul>
        <p>
          <b>{texts.tip}</b>
        </p>
      </div>
    </div>
  );
}