import React, { useState } from "react";
import axios from "axios";

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
    alert("🚀 Form submit triggered"); // 👈 Place it here
    console.log("Submitting form:", form);

    try {
      console.log("Sending POST request...");
      const res = await axios.post("'/api/participants', form", form);
      console.log("✅ Response:", res.data);
      onRegister(); // refresh list
      setForm({ fullName: "", email: "", age: "" });
    } catch (err) {
      console.error(
        "❌ Error registering participant:",
        err.response?.data || err.message
      );
      alert("❌ Error occurred! Check the console.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New Participant</h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
