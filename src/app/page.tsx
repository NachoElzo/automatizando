"use client";

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
            { name: "Sliders", link: "/sliders" },
            { name: "Tabs", link: "/tabs" },
            { name: "Download & upload", link: "/download-upload" },
            { name: "Alerts", link: "/alerts" },
            { name: "Apis", link: "/apis-page" },
        ],
    },
];

export default function Home() {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };

    const handleLoginSubmit = () => {
        if (username === "admin" && password === "admin") {
            // Open a new window with 30% of the screen width and height
            const width = Math.floor(window.screen.width * 0.3);
            const height = Math.floor(window.screen.height * 0.6);
            const left = Math.floor((window.screen.width - width) / 2);
            const top = Math.floor((window.screen.height - height) / 2);
            const win = window.open(
                "",
                "_blank",
                `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
            );
            if (win) {
                win.document.write(`
                    <html>
                    <head>
                        <title>Welcome Admin</title>
                        <style>
                            body {
                                background: #f0fdf4;
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                                margin: 0;
                            }
                            .robot {
                                margin: 2rem 0;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            }
                            .robot-face {
                                width: 90px;
                                height: 90px;
                                background: #22c55e;
                                border-radius: 50%;
                                position: relative;
                                box-shadow: 0 4px 16px #0002;
                            }
                            .robot-eye {
                                position: absolute;
                                top: 35px;
                                width: 15px;
                                height: 15px;
                                background: #fff;
                                border-radius: 50%;
                                border: 2px solid #2563eb;
                            }
                            .robot-eye.left { left: 22px; }
                            .robot-eye.right { right: 22px; }
                            .robot-pupil {
                                width: 7px;
                                height: 7px;
                                background: #2563eb;
                                border-radius: 50%;
                                margin: 4px auto;
                                transition: height 0.2s;
                            }
                            .robot-antenna {
                                position: absolute;
                                top: -18px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 6px;
                                height: 20px;
                                background: #2563eb;
                                border-radius: 3px;
                            }
                            .robot-antenna-ball {
                                position: absolute;
                                top: -25px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 14px;
                                height: 14px;
                                background: #fff;
                                border: 2px solid #2563eb;
                                border-radius: 50%;
                            }
                            .robot-mouth {
                                position: absolute;
                                bottom: 18px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 30px;
                                height: 8px;
                                border-radius: 0 0 20px 20px;
                                background: #fff;
                                border: 2px solid #2563eb;
                                border-top: none;
                            }
                            .welcome-title {
                                color: #2563eb;
                                margin-bottom: 1.5rem;
                                text-align: center;
                                font-size: 2rem;
                            }
                            .welcome-msg {
                                color: #15803d;
                                font-size: 1.15rem;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="robot">
                            <div class="robot-face">
                                <div class="robot-eye left"><div class="robot-pupil"></div></div>
                                <div class="robot-eye right"><div class="robot-pupil"></div></div>
                                <div class="robot-antenna"></div>
                                <div class="robot-antenna-ball"></div>
                                <div class="robot-mouth"></div>
                            </div>
                            <div style="font-size:2.5rem;margin-top:1rem;">🤖</div>
                        </div>
                        <h2 class="welcome-title">Welcome user <span style="color:#22c55e;">admin</span>!</h2>
                        <p class="welcome-msg">
                            You have successfully logged in as an automation admin.<br>
                            Enjoy your automation playground!
                        </p>
                        <script>
                            // Simple eye blink animation
                            setInterval(() => {
                                document.querySelectorAll('.robot-pupil').forEach(p => {
                                    p.style.height = p.style.height === '2px' ? '7px' : '2px';
                                });
                            }, 700);
                        </script>
                    </body>
                    </html>
                `);
                win.document.close();
            }
            setShowLoginPopup(false);
            setError("");
        } else {
            setError("User is not active");
        }
    };

    const handleClosePopup = () => {
        setShowLoginPopup(false);
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
        </div>
    );
}
