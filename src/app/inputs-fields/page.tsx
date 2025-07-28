"use client";

import React, { useState } from "react";
import "../css/inputs-fields.css";

function TooltipCell({ value, isHeader = false }: { value: string; isHeader?: boolean }) {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag title={value}>{value}</CellTag>;
}

export default function InputsFields() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  const [gridData, setGridData] = useState([
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      age: "30",
      email: "john.doe@example.com",
      phone: "1234567890",
      country: "USA",
      city: "New York",
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      age: "25",
      email: "jane.smith@example.com",
      phone: "9876543210",
      country: "Canada",
      city: "Toronto",
    },
    {
      id: 3,
      name: "Alice",
      lastName: "Johnson",
      age: "28",
      email: "alice.johnson@example.com",
      phone: "1231231234",
      country: "UK",
      city: "London",
    },
  ]);

  const [deleteError, setDeleteError] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("");

  // Validations for each field
  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]*$/.test(value)) errorMsg = "Name must contain only letters.";
        else if (value.length > 20) errorMsg = "Name must be at most 20 characters.";
        break;
      case "lastName":
        if (!/^[A-Za-z\s]*$/.test(value)) errorMsg = "Last Name must contain only letters.";
        else if (value.length > 20) errorMsg = "Last Name must be at most 20 characters.";
        break;
      case "email":
        // simple email regex
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) errorMsg = "Invalid email address.";
        break;
      case "phone":
        if (!/^\d*$/.test(value)) errorMsg = "Phone must contain only numbers.";
        else if (value.length > 0 && (value.length < 9 || value.length > 12))
          errorMsg = "Phone must be between 9 and 12 digits.";
        break;
      case "country":
        if (!/^[A-Za-z\s]*$/.test(value)) errorMsg = "Country must contain only letters.";
        else if (value.length > 15) errorMsg = "Country must be at most 15 characters.";
        break;
      case "city":
        if (!/^[A-Za-z\s]*$/.test(value)) errorMsg = "City must contain only letters.";
        else if (value.length > 15) errorMsg = "City must be at most 15 characters.";
        break;
      case "age":
        // Assuming age validation as before
        const ageValue = parseInt(value, 10);
        if (value && (ageValue < 1 || ageValue > 150)) errorMsg = "Age must be between 1 and 150.";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMsg = validateField(name, value);

    // Si el campo es email y está vacío, borra el error
    if (name === "email" && value.trim() === "") {
      errorMsg = "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // isFormValid: all fields must be filled and no error messages exist
  const isFormValid =
    Object.values(formData).every((v) => v.trim() !== "") &&
    Object.values(errors).every((err) => err === "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) return;

    if (gridData.length >= 20) {
      setError("You can only add up to 20 people. Please delete a row before adding another.");
      return;
    }

    const maxId = gridData.length > 0 ? Math.max(...gridData.map((row) => row.id)) : 0;
    setGridData((prevData) => [{ id: maxId + 1, ...formData }, ...prevData]);
    setFormData({
      name: "",
      lastName: "",
      age: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    });
  };

  const handleDeleteById = (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");
    const idNum = Number(deleteId);
    if (!idNum || !gridData.some((row) => row.id === idNum)) {
      setDeleteError("ID does not exist.");
      return;
    }
    setGridData((prevData) => prevData.filter((row) => row.id !== idNum));
    setDeleteId("");
  };

  return (
    <div className="inputs-page bg-gray-100 p-8 min-h-screen">
      <h1 className="title text-4xl font-bold text-gray-800 mb-6">Inputs Practice</h1>
      <p className="subtitle text-gray-600 mb-8">
        Fill out the form below and click &quot;Send&quot; to add the data to the grid.
        <br />
        <b>All fields must be completed to send the form.</b>
      </p>

      <div className="form-container bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-message text-red-500 mt-1">{errors.name}</p>}
          </div>
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="error-message text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your age"
            />
            {errors.age && <p className="error-message text-red-500 mt-1">{errors.age}</p>}
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message text-red-500 mt-1">{errors.email}</p>}
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your phone number"
              maxLength={12}
            />
            {errors.phone && <p className="error-message text-red-500 mt-1">{errors.phone}</p>}
          </div>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your country"
            />
            {errors.country && <p className="error-message text-red-500 mt-1">{errors.country}</p>}
          </div>
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your city"
            />
            {errors.city && <p className="error-message text-red-500 mt-1">{errors.city}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={!isFormValid}>
            Send
          </button>
        </form>
        {error && (
          <div style={{ color: "#dc2626", fontWeight: 500, marginTop: "1rem" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleDeleteById} className="delete-id-form mt-4">
          <label htmlFor="deleteId" className="label">
            Delete by ID:
          </label>
          <input
            id="deleteId"
            name="deleteId"
            className="delete-id-input"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button type="submit" className="submit-button" disabled={!/^\d+$/.test(deleteId) || Number(deleteId) <= 0}>
            Delete
          </button>
        </form>
        {deleteError && (
          <div style={{ color: "#dc2626", fontWeight: 500, marginTop: 0 }}>
            {deleteError}
          </div>
        )}
      </div>

      <div className="grid-container bg-white p-6 rounded-lg shadow-md mt-8">
        <table className="data-grid">
          <thead>
            <tr>
              <TooltipCell value="ID" isHeader />
              <TooltipCell value="Name" isHeader />
              <TooltipCell value="Last Name" isHeader />
              <TooltipCell value="Age" isHeader />
              <TooltipCell value="Email" isHeader />
              <TooltipCell value="Phone" isHeader />
              <TooltipCell value="Country" isHeader />
              <TooltipCell value="City" isHeader />
            </tr>
          </thead>
          <tbody>
            {gridData.map((row) => (
              <tr key={row.id}>
                <TooltipCell value={row.id.toString()} />
                <TooltipCell value={row.name} />
                <TooltipCell value={row.lastName} />
                <TooltipCell value={row.age} />
                <TooltipCell value={row.email} />
                <TooltipCell value={row.phone} />
                <TooltipCell value={row.country} />
                <TooltipCell value={row.city} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}