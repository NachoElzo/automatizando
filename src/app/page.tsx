"use client"; // Mark this file as a client component

import React from "react";
import Link from "next/link";

// Define sections and topics
const sections = [
    {
        title: "Automation Topics",
        topics: [
            { name: "Inputs fields", link: "/inputs-fields" },
            { name: "Dropdowns", link: "/dropdowns" },
            { name: "Drag and drop", link: "/drag-and-drop" },
            { name: "in progress", link: "/checkboxes" },
            { name: "in progress", link: "/radio-buttons" },
            { name: "in progress", link: "/custom-automation" },
        ],
    },
];

export default function Home() {
    return (
        <div className="landing-page">
            <button className="login-button">Login</button>
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
        </div>
    );
}
