import React from "react";

export default function DataDeletion() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Data Deletion Policy</h1>

      <p className="mb-4">
        If you would like to delete your account and personal data from Sports Emporium,
        please follow the steps below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to Request Deletion</h2>
      <p className="mb-4">
        You can request data deletion by sending an email to
        <span className="text-blue-600"> support@sportsemporium.com</span>
        with the subject line “Delete My Account”.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What Will Be Deleted</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Your profile data (name, email, phone)</li>
        <li>Address and order history</li>
        <li>Login credentials and preferences</li>
      </ul>

      <p className="mb-4">
        Please allow up to 7 days for us to process your request. Once deleted,
        your data cannot be recovered.
      </p>
    </div>
  );
}