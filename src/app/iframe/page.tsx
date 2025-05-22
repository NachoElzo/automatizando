"use client";

import React, { useRef, useState, useEffect } from "react";
import "../css/iframe.css";

export default function IframePractice() {
  const [msgEl3, setMsgEl3] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // HTML for the iframe as a string, NO label/message for element3 inside the iframe
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
              // Hide internal messages
              document.querySelectorAll('.iframe-msg').forEach(el => el.style.display = 'none');
            } else {
              var msg = document.getElementById('msg-' + id);
              if (msg.style.display === 'block') {
                msg.style.display = 'none';
              } else {
                // Hide all messages before showing the new one
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
            <button class="iframe-btn" onclick="toggleMsg('el1')">element 1</button>
          </li>
        </ul>
        <div class="iframe-grid">
          <div></div>
          <div class="iframe-grid-item">
            <button class="iframe-btn" onclick="toggleMsg('el2')">element 2</button>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <button id="iframe-btn-el3" class="iframe-btn" onclick="toggleMsg('el3')">
            element 3
          </button>
        </div>
        <div id="msg-el1" class="iframe-msg">You pressed the button for element 1</div>
        <div id="msg-el2" class="iframe-msg">You pressed the button for element 2</div>
      </body>
    </html>
  `;

  // Listen for messages from the iframe to show/hide the label for element3 outside the iframe
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data === "toggle-el3") setMsgEl3((prev) => !prev); // Toggle: show/hide
      if (e.data === "hide-el3") setMsgEl3(false); // Always hide
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="iframe-practice-container">
      <h1 className="iframe-title">Iframe Automation Practice</h1>
      <p className="iframe-instruction">
        Inside the iframe below you must find three buttons:<br />
        <strong>element 1</strong> is inside a list.<br />
        <strong>element 2</strong> is inside a grid.<br />
        <strong>element 3</strong> is just a button.<br />
        When you press the buttons for element 1, element 2, or element 3, a message will appear that you must find by scrolling.
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
      {/* Large space to force scrolling on the page */}
      <div style={{ height: "600px" }} />
      {msgEl3 && (
        <div className="iframe-label-result" style={{ marginTop: "4rem" }}>
          You pressed the button for element 3
        </div>
      )}
    </div>
  );
}