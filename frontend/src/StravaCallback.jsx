import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function StravaCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      toast.error("Missing Strava code");
      return navigate("/account");
    }

    const exchangeCode = async () => {
      try {
        const { data } = await axios.post(
          "/api/strava/exchange-token",
          { code },
          { withCredentials: true }
        );
        toast.success("✅ Connected to Strava!");
        navigate("/account");
      } catch (err) {
        console.error("❌ Strava connection failed", err);
        toast.error("Failed to connect Strava. Try again.");
        navigate("/account");
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Connecting to Strava...</h2>
        <p className="text-gray-600 text-sm">Please wait while we sync your account.</p>
      </div>
    </div>
  );
}
