// src/pages/PatientProfile.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PatientProfile = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    profile_picture: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch("https://landing.docapp.co.in/api/auth/get-user-data", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const user = data.userData;
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      }));
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProfile();
  }, [isLoggedIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://3.108.233.123:5000/api/auth/profile/complete/general_user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Profile updated successfully!");
    } catch (err: any) {
      alert("Error updating profile: " + err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4 text-center text-[#007E85]">Patient Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-[#007E85] text-white py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PatientProfile;
