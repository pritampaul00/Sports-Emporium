import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF} from "react-icons/fa";
import { loginUser } from "@/redux/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/firebase";
import axios from "axios"; // for sending token to backend

export default function Login() {
  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    console.log("User in useEffect:", user);
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const payload = tab === "email" ? { email, password } : { phone, password };
      await dispatch(loginUser(payload));
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleSocialLogin = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await axios.post("/api/auth/social-login", { token });

    // ✅ Save token to localStorage
    localStorage.setItem("token", response.data.token);

    // ✅ Dispatch user manually using our new reducer
    dispatch({ type: "auth/loginSuccess", payload: { ...response.data.user, token: response.data.token } });

    // ✅ Navigate to home or account
    navigate("/");
  } catch (error) {
    console.error("Social login error:", error);
    setError("Login failed. Try again.");
  }
};



  return (
    <div className="h-screen flex">
      {/* Left image */}
      <div className="w-1/2 h-full">
        <img
          src="/login-image.jpg"
          alt="Bike with kids"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <CardContent>
            <h2 className="text-2xl font-semibold mr-15 mb-6 text-center w-full">Login</h2>

            <Tabs value={tab} onValueChange={setTab} className="mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="email" className="w-1/2">E-mail</TabsTrigger>
                <TabsTrigger value="phone" className="w-1/2">Phone number</TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {tab === "email" ? (
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mb-3"
                  required
                />
              ) : (
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="mb-3"
                  required
                />
              )}

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mb-4"
                required
              />

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#2a2f98] hover:bg-[#1e247d] text-white mb-4"
              >
                LOGIN
              </Button>
            </form>

            {/* Social login */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button variant="outline" size="icon" onClick={() => handleSocialLogin(googleProvider)}>
              <FcGoogle className="text-xl" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleSocialLogin(facebookProvider)}>
              <FaFacebookF className="text-blue-600 text-xl" />
              </Button>
            </div>

         <p className="text-sm text-center mb-2">
            No account?{" "}
            <Link to="/register" className="text-blue-700 font-medium">
            Create your Sports Emporium account
            </Link>
          </p>


            <ul className="text-sm text-gray-700 mt-4 space-y-2">
              <li>✔️ Exclusive Deals and Sporty Rewards</li>
              <li>✔️ Personalised Experiences</li>
              <li>✔️ Faster Checkout</li>
              <li>✔️ Easy Returns/Exchange</li>
            </ul>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>Having trouble logging in?</p>
              <p className="mt-1">Privacy • 🇮🇳 English</p>
              <p className="mt-2">This site is protected by reCAPTCHA.</p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}







