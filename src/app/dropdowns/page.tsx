"use client"; // Mark this file as a client component

import React, { useState } from "react";
import "../css/dropdowns.css";

export default function DropdownPractice() {
    const [profession, setProfession] = useState("");
    const [company, setCompany] = useState("");
    const [experience, setExperience] = useState("");

    const [cuisine, setCuisine] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [cookingTime, setCookingTime] = useState("");

    const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProfession(e.target.value);
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompany(e.target.value);
    };

    const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExperience(e.target.value);
    };

    const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCuisine(e.target.value);
    };

    const handleSkillLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSkillLevel(e.target.value);
    };

    const handleCookingTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCookingTime(e.target.value);
    };

    const isMatchProfession =
        profession === "automation" &&
        company === "it" &&
        experience === "5";

    const isMatchCooking =
        cuisine === "italian" &&
        skillLevel === "advanced" &&
        cookingTime === "30";

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

            {isMatchProfession && (
                <div className="result">
                    I&apos;m an Automation Engineer working in an IT company with +5 years of work experience.
                </div>
            )}

            <h1 className="title">Cooking Preferences</h1>
            {/* Instructional label */}
            <p className="instruction">
                Select &quot;Italian&quot;, &quot;Advanced&quot;, and &quot;30 minutes&quot; to display the result below.
            </p>
            <div className="dropdown-section">
                <label htmlFor="cuisine">Cuisine:</label>
                <select
                    id="cuisine"
                    className="dropdown"
                    value={cuisine}
                    onChange={handleCuisineChange}
                >
                    <option value="">Select your cuisine</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="japanese">Japanese</option>
                    <option value="indian">Indian</option>
                    <option value="french">French</option>
                </select>
            </div>

            <div className="dropdown-section">
                <label htmlFor="skillLevel">Skill Level:</label>
                <select
                    id="skillLevel"
                    className="dropdown"
                    value={skillLevel}
                    onChange={handleSkillLevelChange}
                >
                    <option value="">Select your skill level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div className="dropdown-section">
                <label htmlFor="cookingTime">Cooking Time:</label>
                <select
                    id="cookingTime"
                    className="dropdown"
                    value={cookingTime}
                    onChange={handleCookingTimeChange}
                >
                    <option value="">Select cooking time</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                </select>
            </div>

            {isMatchCooking && (
                <div className="result">
                    You love cooking Italian cuisine at an advanced level in just 30 minutes!
                </div>
            )}
        </div>
    );
}