"use client"; // Mark this file as a client component

import React, { useState } from "react";
import Link from "next/link";

// Define sections and topics
const sections = [
    {
        title: "Automation Topics",
        topics: [
            { name: "Inputs fields", link: "/inputs-fields" },
            { name: "Dropdowns", link: "/dropdowns" },
            { name: "Drag and drop", link: "/drag-and-drop" },
            { name: "Calendars", link: "/calendars" },
            { name: "Mobile view", link: "/mobile-view" },
            { name: "iframe", link: "/iframe" },
        ],
    },
];

export default function Home() {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };

    const handleLoginSubmit = () => {
        if (username === "admin" && password === "admin") {
            setShowLoginPopup(false);
            setShowWelcomePopup(true);
            setError(""); // Limpia el mensaje de error
        } else {
            setError("User is not active");
        }
    };

    const handleClosePopup = () => {
        setShowLoginPopup(false);
        setShowWelcomePopup(false);
        setUsername("");
        setPassword("");
        setError("");
    };

    return (
        <div className="landing-page">
            <button className="login-button" onClick={handleLoginClick}>
                Login
            </button>
            <header className="header">
                <h1 className="title">Automation Practice Hub</h1>
                <p className="subtitle">Explore different automation tools and techniques</p>
            </header>

            <main className="grid-container">
                {sections.map((section) =>
                    section.topics.map((topic, index) => (
                        <Link href={topic.link} key={index}>
                            <div className="card">
                                <h3 className="card-title">{topic.name}</h3>
                                <p className="card-description">
                                    Learn more about {topic.name}.
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </main>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="popup-title">Login</h2>
                        <p className="popup-info">
                            To get access to the app: username is <strong>&apos;admin&apos;</strong> and the password is <strong>&apos;admin&apos;</strong>.
                        </p>
                        <label className="popup-label">Username:</label>
                        <input
                            type="text"
                            className="popup-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="popup-label">Password:</label>
                        <input
                            type="password"
                            className="popup-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="popup-error">{error}</p>}
                        <button className="popup-button" onClick={handleLoginSubmit}>
                            Submit
                        </button>
                        <button className="popup-button" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Welcome Popup */}
            {showWelcomePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2 className="popup-title">Welcome</h2>
                        <p className="popup-message">Welcome, user: Admin</p>
                        <button className="popup-button" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
