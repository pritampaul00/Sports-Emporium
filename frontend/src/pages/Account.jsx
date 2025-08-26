import { Link } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user } = useSelector((state) => state.auth);
  const [membership, setMembership] = useState(null);
  const navigate = useNavigate();

  const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI;

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const { data } = await axios.get("/api/membership/status", {
          withCredentials: true,
        });
        setMembership(data.membership);
      } catch (err) {
        console.error("Failed to fetch membership:", err);
      }
    };

    fetchMembership();
  }, []);

  const handleStravaConnect = () => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all,profile:read_all`;
    window.location.href = authUrl;
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "PP";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold mr-4">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.name || "Guest"}</h2>
          <p className="text-sm text-gray-600">
            Manage all your data in one place to fully enjoy all Sports Emporium services
          </p>
        </div>
      </div>

      {/* Membership Section */}
      <div className="bg-indigo-100 p-4 rounded-lg mb-6">
        <div>
          <h3 className="text-lg font-semibold">Membership Program</h3>
          <p className="text-sm text-gray-700">
            {membership?.isActive
              ? `You are a ${membership.level} member — valid until ${new Date(
                  membership.endDate
                ).toLocaleDateString()}`
              : "Enjoy many free rewards, upgrades and benefits by becoming a member."}
          </p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-2 lg:mt-0"
          onClick={() => navigate("/account/membership")}
        >
          {membership?.isActive ? "View Membership" : "Join Now"}
        </button>
      </div>

<div className="bg-indigo-100 p-4 rounded-lg mb-6">
  <div className="flex justify-between items-center flex-wrap gap-4">
    <div>
      <h3 className="text-lg font-semibold">
        Synchronize your sports activities!
      </h3>
      <p className="text-sm text-gray-700">
        Use several sports trackers? Connect your Strava account to gather all your activities in one place.
      </p>
    </div>

    {user?.stravaConnected ? (
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-medium">
          ✅ Connected to Strava
        </span>
      </div>
    ) : (
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
        onClick={() => {
          const redirectUri = "http://localhost:5173/strava/callback";
          const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
          const scope = "read,activity:read_all";

          const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
          window.location.href = authUrl;
        }}
      >
        Connect to Strava
      </button>
    )}
  </div>
</div>


      {/* Shortcuts Section */}
      <h3 className="text-lg font-semibold mb-4">Your shortcuts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/account/change-password">
          <div className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <h4 className="font-semibold">Change my password</h4>
            <p className="text-sm text-gray-600">
              A strong password will increase the security of your account
            </p>
          </div>
        </Link>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold">Communication preferences</h4>
          <p className="text-sm text-gray-600">
            Choose your communication preferences, and the way you want to be contacted.
          </p>
        </div>

        <Link to="/account/edit-profile">
          <div className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <h4 className="font-semibold">Edit my personal profile</h4>
            <p className="text-sm text-gray-600">To keep it updated!</p>
          </div>
        </Link>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold">Manage my favorite sports</h4>
          <p className="text-sm text-gray-600">
            Tell us more about your sports profile
          </p>
        </div>
      </div>
    </div>
  );
}
