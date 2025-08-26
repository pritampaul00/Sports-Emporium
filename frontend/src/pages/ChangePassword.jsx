import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../redux/authSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { currentPassword, newPassword, confirmPassword } = formData;

  if (newPassword !== confirmPassword) {
    setError("New passwords do not match");
    return;
  }

  try {
    const res = await dispatch(changeUserPassword({ currentPassword, newPassword }));

    if (res.type === "auth/changePassword/fulfilled") {
      setMessage("Password changed successfully!");
      setError("");
    } else {
      setError(res.payload || "Failed to change password");
      setMessage("");
    }
  } catch (err) {
    setError("Something went wrong");
    setMessage("");
  }
};


  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("New passwords do not match");
    }

    try {
      const msg = await dispatch(changeUserPassword(formData));
      setMessage(msg);
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err);
    }
  };
  */

  /*
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await dispatch(
      changeUserPassword({ currentPassword, newPassword })
    );

    if (res.type === "auth/changePassword/fulfilled") {
      alert("Password changed successfully!");
    } else {
      alert(res.payload || "Failed to change password");
    }
  } catch (err) {
    alert("Something went wrong");
  }
};
*/

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      {message && <div className="text-green-600 mb-2">{message}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
