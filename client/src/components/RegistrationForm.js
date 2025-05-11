import React, { useState } from "react";
import axios from "axios";

const isValidFullName = (name) => {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
};

const RegistrationForm = ({ onRegister }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidFullName(form.fullName) ||
      !form.email.includes("@") ||
      form.age <= 0
    ) {
      alert(
        "Please enter a valid full name (at least two words), a valid email, and age > 0."
      );
      return;
    }

    try {
      await axios.post("/api/participants", form);
      onRegister();
      setForm({ fullName: "", email: "", age: "" });
    } catch (err) {
      console.error("Error registering participant:", err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div
      className="card shadow-lg mx-auto mb-5"
      style={{ maxWidth: "500px", borderRadius: "16px" }}
    >
      <div className="card-body">
        <h4 className="text-center mb-4 fw-bold">Register Participant</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegistrationForm;
