"use client";

import React, { useState } from "react";
import "../css/calendars.css";

function isValidDate(dateStr: string) {
  // Valida formato YYYY-MM-DD y que sea una fecha real
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    dateStr === date.toISOString().slice(0, 10)
  );
}

export default function CalendarsPage() {
  const [textDate, setTextDate] = useState("");
  const [pickerDate, setPickerDate] = useState("");
  const [english, setEnglish] = useState(false);

  const textDateValid = isValidDate(textDate);

  // Textos en ambos idiomas
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
        titleText: "Calendario editable por texto",
        labelText: "Escribe una fecha (YYYY-MM-DD):",
        placeholder: "Ej: 2024-12-31",
        validMsg1: (date: string) =>
          `🎉 ¡Fecha aceptada! El ${date} será legendario, así que ve preparando tu capa de superhéroe.`,
        validMsg2: (date: string) =>
          `🥳 ¿Listo para hacer historia el ${date}? ¡No olvides invitar a los aliens!`,
        selectTitle: "Calendario solo seleccionable",
        selectLabel: "Elige tu destino temporal:",
        selectMsg1: (date: string) =>
          `🌞 ¡El ${date} será tan épico que hasta tu despertador querrá levantarse temprano!`,
        selectMsg2: (date: string) =>
          `🗓️ ¡Ponle una alarma al ${date} y prepárate para la aventura!`,
        button: "Cambiar a inglés",
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

      {/* Calendario editable por texto */}
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
        {/* Solo muestra el label si la fecha es válida y completa */}
        {textDate.length === 10 && textDateValid && (
          <div className="calendar-result calendar-label-result valid">
            {texts.validMsg1(textDate)}
            <br />
            {texts.validMsg2(textDate)}
          </div>
        )}
      </div>

      {/* Calendario solo seleccionable */}
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
    </div>
  );
}