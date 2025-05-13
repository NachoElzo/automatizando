"use client";

import React, { useState } from "react";

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
    phone: "",
    age: "",
  });

  const [gridData, setGridData] = useState([
    {
      name: "John",
      lastName: "Doe",
      age: "30",
      email: "john.doe@example.com",
      phone: "1234567890",
      country: "USA",
      city: "New York",
    },
    {
      name: "Jane",
      lastName: "Smith",
      age: "25",
      email: "jane.smith@example.com",
      phone: "9876543210",
      country: "Canada",
      city: "Toronto",
    },
    {
      name: "Alice",
      lastName: "Johnson",
      age: "28",
      email: "alice.johnson@example.com",
      phone: "1231231234",
      country: "UK",
      city: "London",
    },
    {
      name: "Bob",
      lastName: "Brown",
      age: "35",
      email: "bob.brown@example.com",
      phone: "4564564567",
      country: "Australia",
      city: "Sydney",
    },
    {
      name: "Emily",
      lastName: "Wilson",
      age: "22",
      email: "emily.wilson@example.com",
      phone: "1112223333",
      country: "France",
      city: "Paris",
    },
    {
      name: "Grace",
      lastName: "Lee",
      age: "32",
      email: "grace.lee@example.com",
      phone: "7778889999",
      country: "Japan",
      city: "Tokyo",
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validar errores en tiempo real
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone must have at least 10 numbers.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "",
        }));
      }
    }

    if (name === "age") {
      const ageValue = parseInt(value, 10);
      if (ageValue < 1 || ageValue > 150) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "Age must be between 1 and 150.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "",
        }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar errores antes de enviar
    if (errors.phone || errors.age) {
      return;
    }

    setGridData((prevData) => [formData, ...prevData]);
    setFormData({
      name: "",
      lastName: "",
      age: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    });

    alert("Data successfully added to the grid!");
  };

  return (
    <div className="inputs-page bg-gray-100 p-8 min-h-screen">
      <h1 className="title text-4xl font-bold text-gray-800 mb-6">Inputs Practice</h1>
      <p className="subtitle text-gray-600 mb-8">
        Fill out the form below and click &quot;Send&quot; to add the data to the grid.
      </p>

      <div className="form-container bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          </div>

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
          </div>

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
            {errors.age && <p className="error-message">{errors.age}</p>}
          </div>

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
          </div>

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
              maxLength={10}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

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
          </div>

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
          </div>

          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>

      <div className="grid-container bg-white p-6 rounded-lg shadow-md mt-8">
        <table className="data-grid">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {gridData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.lastName}</td>
                <td>{data.age}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.country}</td>
                <td>{data.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}