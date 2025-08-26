import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Sports Emporium respects your privacy. This policy outlines how we collect,
        use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Name, email, phone number (during registration)</li>
        <li>Delivery address and payment details (for orders)</li>
        <li>Login activity (for analytics and security)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To process your orders and deliver products</li>
        <li>To personalize your shopping experience</li>
        <li>To send transactional or promotional emails</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We use third-party services such as Google and Facebook for social login.
        These services may collect certain data in accordance with their privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">
        Your data is stored securely and never sold or shared without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have questions about this policy, email us at
        <span className="text-blue-600"> support@sportsemporium.com</span>.
      </p>
    </div>
  );
}
