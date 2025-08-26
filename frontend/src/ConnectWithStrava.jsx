import React from "react";

const ConnectWithStrava = () => {
  const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/strava/callback"; // same as you set in Strava

  const handleConnect = () => {
    const url = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=auto&scope=read,activity:read`;
    window.location.href = url;
  };

  return (
    <div className="p-6 bg-blue-100 rounded">
      <h2 className="text-lg font-bold mb-2">Connect your Strava account</h2>
      <p className="mb-4 text-sm">Sync your workouts from Strava automatically.</p>
      <button
        onClick={handleConnect}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Connect with Strava
      </button>
    </div>
  );
};

export default ConnectWithStrava;
