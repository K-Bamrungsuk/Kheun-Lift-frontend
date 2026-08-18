import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuthStore } from "../stores/auth.store";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hdlChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hdlLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(form.email, form.password);

      setAuth(data.token, data.user);

      const previousPath = location.state?.from;
      navigate(previousPath || "/home", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email or password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-widest text-white">
              KHEUN <span className="text-yellow-500">LIFT</span>
            </h1>
            <p className="text-zinc-500 mt-2">
              Build your strength. Prove your rank.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Login to continue your journey
              </p>
            </div>

            <form onSubmit={hdlLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={hdlChange}
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-zinc-500 hover:text-yellow-500 transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={hdlChange}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-300
                       text-gray-900 font-bold py-3 rounded-lg
                       transition duration-200
                       shadow-lg shadow-red-950/30"
              >
                {isLoading ? "LOGGING IN" : "LOGIN"}
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-sm text-zinc-400 mt-6">
              Don't have an account?
              <Link
                to="/register"
                className="text-yellow-500 hover:text-yellow-200 font-semibold"
              >
                &nbsp; Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
