import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCart } from "@/context/CartContext";

const Membership = () => {
  const [membership, setMembership] = useState(null);
  const [level, setLevel] = useState("Plus");
  const [duration, setDuration] = useState(3);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { addToCart } = useCart();

  const pricing = {
    Plus: {
      3: 299,
      6: 449,
      9: 799,
      12: 999,
    },
    Pro: {
      3: 499,
      6: 849,
      9: 1399,
      12: 1799,
    },
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const res = await axios.get("/api/membership/status", {
        withCredentials: true,
      });
      setMembership(res.data.membership);
    } catch (err) {
      console.error("Failed to fetch membership:", err);
    }
  };

  const handleAddToCart = () => {
    const price = pricing[level]?.[duration];
    if (!price) {
      alert("Please select a valid membership duration.");
      return;
    }

    addToCart({
      _id: `membership-${level}-${duration}`, // ensure uniqueness
      name: `${level} Membership - ${duration} Month${duration > 1 ? "s" : ""}`,
      price,
      quantity: 1,
      images: ["/membership.png"], // fallback image
      isMembership: true,
      level,
      duration,
    });

    alert("Membership plan added to cart!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Membership Program</h1>

      {membership && membership.isActive ? (
        <div className="bg-green-100 p-4 rounded mb-6">
          <p className="font-medium">
            🎉 You're a <strong>{membership.level}</strong> member!
          </p>
          <p>Valid until: {new Date(membership.endDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p className="mb-4">You're not a member yet. Choose a plan below 👇</p>
      )}

      <div className="border rounded p-4 space-y-4 bg-gray-50">
        <div>
          <label className="block mb-1 font-medium">Choose Membership Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Plus">Plus</option>
            <option value="Pro">Pro</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="border px-3 py-2 rounded w-full"
          >
            {[3, 6, 9, 12].map((month) => (
              <option key={month} value={month}>
                {month} month{month > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-indigo-100 p-3 rounded text-sm">
          <p>
            💡 <strong>{level}</strong> Membership ({duration} months) costs{" "}
            <strong>₹{pricing[level]?.[duration]}</strong>
          </p>
          <ul className="mt-2 list-disc ml-5 text-gray-700">
            <li>Exclusive discounts on select products</li>
            <li>Priority customer support</li>
            <li>Free shipping on all orders</li>
            {level === "Pro" && <li>Early access to flash sales</li>}
          </ul>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white px-6 py-2 rounded w-full"
        >
          Pay ₹{pricing[level]?.[duration] || "N/A"}
        </button>
      </div>
    </div>
  );
};

export default Membership;
