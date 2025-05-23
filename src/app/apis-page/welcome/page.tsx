"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import "../../css/welcome.css";

// --- API MOCK LOCAL (solo para demo, no persistente) ---
async function mockUsernameApi(newName: string): Promise<string> {
  return new Promise(resolve => setTimeout(() => resolve(newName), 400));
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WelcomeContent />
    </Suspense>
  );
}

function WelcomeContent() {
  const params = useSearchParams();
  const initialUsername = params.get("username") || "User";
  const [username, setUsername] = useState(initialUsername);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("Have a happy testing");
  const [customGreeting, setCustomGreeting] = useState("");

  const handleMockName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    setLoading(true);
    const updated = await mockUsernameApi(newName);
    setUsername(updated);
    setNewName("");
    setLoading(false);
  };

  const handleGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGreeting) return;
    setGreeting(customGreeting);
    setCustomGreeting("");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-title">Welcome, {username}!</div>
      <AutomationRobot />
      <div className="welcome-message">
        {greeting} <span role="img" aria-label="cheers">🍻🍻</span>
      </div>
      <form onSubmit={handleMockName} style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Mock new username"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          maxLength={30}
          className="api-input"
        />
        <button
          type="submit"
          className="api-btn post"
          style={{ marginLeft: 8 }}
          disabled={loading || !newName}
        >
          {loading ? "Updating..." : "Mock Username"}
        </button>
      </form>
      <form onSubmit={handleGreeting} style={{ marginTop: 16 }}>
        <input
          type="text"
          placeholder="Enter your greeting"
          value={customGreeting}
          onChange={e => setCustomGreeting(e.target.value)}
          maxLength={30}
          className="api-input"
        />
        <button
          type="submit"
          className="api-btn"
          style={{ marginLeft: 8 }}
          disabled={!customGreeting}
        >
          Set Greeting
        </button>
      </form>
    </div>
  );
}

// Animación de robot de automatización
function AutomationRobot() {
  return (
    <div className="automation-robot">
      <div className="robot-head">
        <div className="robot-eyes">
          <div className="robot-eye" />
          <div className="robot-eye" />
        </div>
        <div className="robot-mouth" />
        <div className="robot-antenna">
          <div className="robot-antenna-ball" />
        </div>
      </div>
      <div className="robot-body" />
      <div className="robot-arms">
        <div className="robot-arm left" />
        <div className="robot-arm right" />
      </div>
      <div className="robot-legs">
        <div className="robot-leg left" />
        <div className="robot-leg right" />
      </div>
    </div>
  );
}