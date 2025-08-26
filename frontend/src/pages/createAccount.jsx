import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF} from "react-icons/fa";

export default function CreateAccount() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
   
    // 🪵 Log the form data before sending it
  console.log("📤 Sending registration data:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Account created successfully!");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
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

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <CardContent>
            <h2 className="text-2xl font-semibold mr-15 mb-6 text-center w-full">Create Account</h2>

            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="mb-3"
                required
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-3"
                required
              />
              <div className="relative mb-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="pr-10"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-sm cursor-pointer text-gray-600 select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

              <Button
                type="submit"
                className="w-full bg-[#2a2f98] hover:bg-[#1e247d] text-white mb-4"
              >
                Create Account
              </Button>
            </form>

            {/* Social login (future hookup) */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button variant="outline" size="icon">
                <FcGoogle className="text-xl" />
              </Button>
              <Button variant="outline" size="icon">
                <FaFacebookF className="text-blue-600 text-xl" />
              </Button>
            </div>

            <p className="text-sm text-center mb-2">
              Already have an account?{' '}
              <a href="/login" className="text-blue-700 font-medium">
                Login
              </a>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}