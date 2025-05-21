"use client";

import React, { useRef, useState, useEffect } from "react";
import "../css/iframe.css";

export default function IframePractice() {
  const [msgEl3, setMsgEl3] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // HTML del iframe como string, SIN label/mensaje para elemento3 dentro del iframe
  const iframeContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f0fdf4; margin: 0; padding: 2rem; }
          .iframe-list { margin-bottom: 2rem; }
          .iframe-list li { margin-bottom: 0.5rem; color: #22c55e; font-weight: bold; }
          .iframe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
          .iframe-grid-item { background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; color: #2563eb; font-weight: bold; }
          .iframe-btn { padding: 0.5rem 1rem; background: #22c55e; color: #fff; border: none; border-radius: 0.4rem; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; }
          .iframe-btn:hover { background: #16a34a; }
          .iframe-msg { display: none; margin-top: 12rem; color: #16a34a; background: #f0fdf4; border: 1.5px solid #22c55e; border-radius: 0.5rem; padding: 0.5rem 1rem; font-weight: 500; }
        </style>
        <script>
          function toggleMsg(id) {
            if(id === 'el3') {
              window.parent.postMessage('toggle-el3', '*');
              // Oculta los mensajes internos
              document.querySelectorAll('.iframe-msg').forEach(el => el.style.display = 'none');
            } else {
              var msg = document.getElementById('msg-' + id);
              if (msg.style.display === 'block') {
                msg.style.display = 'none';
              } else {
                // Oculta todos los mensajes antes de mostrar el nuevo
                document.querySelectorAll('.iframe-msg').forEach(el => el.style.display = 'none');
                msg.style.display = 'block';
              }
              window.parent.postMessage('hide-el3', '*');
            }
          }
        </script>
      </head>
      <body>
        <ul class="iframe-list">
          <li>
            <button class="iframe-btn" onclick="toggleMsg('el1')">elemento1</button>
          </li>
        </ul>
        <div class="iframe-grid">
          <div></div>
          <div class="iframe-grid-item">
            <button class="iframe-btn" onclick="toggleMsg('el2')">elemento2</button>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <button id="iframe-btn-el3" class="iframe-btn" onclick="toggleMsg('el3')">
            elemento3
          </button>
        </div>
        <div id="msg-el1" class="iframe-msg">Has presionado el botón de elemento 1</div>
        <div id="msg-el2" class="iframe-msg">Has presionado el botón de elemento 2</div>
      </body>
    </html>
  `;

  // Escuchar mensajes del iframe para mostrar/ocultar el label de elemento3 fuera del iframe
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data === "toggle-el3") setMsgEl3((prev) => !prev); // Toggle: muestra/oculta
      if (e.data === "hide-el3") setMsgEl3(false); // Oculta siempre
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="iframe-practice-container">
      <h1 className="iframe-title">Práctica de automatización con iframe</h1>
      <p className="iframe-instruction">
        Dentro del iframe de abajo debes encontrar tres botones:<br />
        <strong>elemento1</strong> está dentro de una lista.<br />
        <strong>elemento2</strong> está dentro de una grilla.<br />
        <strong>elemento3</strong> está solo como botón.<br />
       Cuando presiones los botones de elemento1, elemento2 o elemento3, se mostrará un mensaje que deberás buscar haciendo scroll.
      </p>
      <div className="iframe-wrapper">
        <iframe
          ref={iframeRef}
          title="iframe-practice"
          srcDoc={iframeContent}
          style={{
            width: "100%",
            minHeight: 350,
            border: "2px solid #22c55e",
            borderRadius: "0.75rem",
            background: "#fff",
          }}
        />
      </div>
      {/* Espacio grande para forzar scroll en la página */}
      <div style={{ height: "600px" }} />
      {msgEl3 && (
        <div className="iframe-label-result" style={{ marginTop: "4rem" }}>
          Has presionado el botón de elemento 3
        </div>
      )}
    </div>
  );
}