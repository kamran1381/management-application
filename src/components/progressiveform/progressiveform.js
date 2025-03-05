"use client";
import { useState } from "react";

export default function SimpleForm() {
  const [formData, setFormData] = useState({ name: "", email: "", gender: "" });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProgress = () => {
    let filledFields = Object.values(formData).filter(value => value.trim() !== "").length;
    setProgress((filledFields / 3) * 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    updateProgress();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Submission failed");
      console.log("Form submitted successfully");
      setFormData({ name: "", email: "", gender: "" });
      setProgress(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0e0c]">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2 mt-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label className="block text-gray-700 mt-4">Email:</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2 mt-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <label className="block text-gray-700 mt-4">Gender:</label>
          <select
            name="gender"
            className="w-full border rounded p-2 mt-2"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
