"use client"; // Mark this file as a client component

import React, { useState } from "react";

export default function DropdownPractice() {
    const [profession, setProfession] = useState("");
    const [company, setCompany] = useState("");
    const [experience, setExperience] = useState("");

    const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProfession(e.target.value);
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompany(e.target.value);
    };

    const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExperience(e.target.value);
    };

    const isMatch =
        profession === "automation" &&
        company === "it" &&
        experience === "5";

    return (
        <div className="container">
            <h1 className="title">Who I&apos;m?</h1>
            {/* Instructional label */}
            <p className="instruction">
                Select &quot;Automation&quot;, &quot;IT&quot;, and &quot;+5 years&quot; to display the result below.
            </p>
            <div className="dropdown-section">
                <label htmlFor="profession">Profession:</label>
                <select
                    id="profession"
                    className="dropdown"
                    value={profession}
                    onChange={handleProfessionChange}
                >
                    <option value="">Select your profession</option>
                    <option value="qa">QA Engineer</option>
                    <option value="automation">Automation</option>
                    <option value="developer">Developer</option>
                    <option value="devops">DevOps</option>
                    <option value="product">Product</option>
                </select>
            </div>

            <div className="dropdown-section">
                <label htmlFor="company">Company Business:</label>
                <select
                    id="company"
                    className="dropdown"
                    value={company}
                    onChange={handleCompanyChange}
                >
                    <option value="">Select your company business</option>
                    <option value="it">IT</option>
                    <option value="media">Media</option>
                    <option value="advertising">Advertising</option>
                    <option value="telecom">Telecommunications</option>
                </select>
            </div>

            <div className="dropdown-section">
                <label htmlFor="experience">Work Experience:</label>
                <select
                    id="experience"
                    className="dropdown"
                    value={experience}
                    onChange={handleExperienceChange}
                >
                    <option value="">Select your work experience</option>
                    <option value="2">+2 years</option>
                    <option value="5">+5 years</option>
                    <option value="8">+8 years</option>
                </select>
            </div>

            {isMatch && (
                <div className="result">
                    I&apos;m an Automation Engineer working in an IT company with +5 years of work experience.
                </div>
            )}
        </div>
    );
}