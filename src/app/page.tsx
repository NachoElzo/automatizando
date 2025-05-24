"use client";

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
            { name: "API's", link: "/apis-page" },
            { name: "Media", link: "/media" },
            { name: "Scrapy", link: "/scrapy" },
            { name: "Radio buttons", link: "/radio-buttons" },
        ],
    },
];

export default function Home() {
    return (
        <div className="landing-page">
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
