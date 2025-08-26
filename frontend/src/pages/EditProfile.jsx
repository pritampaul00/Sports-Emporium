/*
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/authSlice";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting updated profile", formData);
    // TODO: dispatch updateProfile thunk here
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">My Identity</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        // First & Last Name 

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        // Date of Birth 

        <div>
          <label className="block text-sm font-medium">Date of Birth (optional)</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        //Gender 

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        // Phone 

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        // Email (read-only) 

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        // Decathlon Card Info 

        <div>
          <h3 className="font-semibold mt-6">My Decathlon Card</h3>
          <p className="text-sm text-gray-600 mt-1 mb-2">
            Your card number is an information specific to your account. It can be used
            to authenticate in store and used in your communications with the customer service.
          </p>
          <input
            type="text"
            value={user?.cardNumber || "1234-5678-ABCD"} // Example fallback
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
*/

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/authSlice";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    dob: user?.dob?.substring(0, 10) || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">My Identity</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth (optional)</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Decathlon Card Info */}
        <div>
          <h3 className="font-semibold mt-6">My Sports Emporium Card</h3>
          <p className="text-sm text-gray-600 mt-1 mb-2">
            Your card number is specific to your account. It can be used to authenticate in store and used in your communications with customer service.
          </p>
          <input
            type="text"
            value={user?.cardNumber || "1234-5678-ABCD"}
            readOnly
            className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
